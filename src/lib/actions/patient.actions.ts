"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  tablesDB,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
  try {
    if (!users) {
      throw new Error(
        "Appwrite client not initialized. Please check your environment variables."
      );
    }

    const newUser = await users.create({
      userId: ID.unique(),
      email: user.email,
      phone: user.phone,
      password: undefined,
      name: user.name,
    });
    console.log("New User", newUser);
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get({ userId });
    return parseStringify(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const getPatient = async (userId: string) => {
  try {
    if (!DATABASE_ID || !PATIENT_COLLECTION_ID) {
      throw new Error(
        "Database configuration is missing. Please check your environment variables."
      );
    }

    const patients = await tablesDB.listRows({
      databaseId: DATABASE_ID,
      tableId: PATIENT_COLLECTION_ID,
      queries: [Query.equal("userId", userId)],
    });

    if (patients.rows.length === 0) {
      return null;
    }

    return parseStringify(patients.rows[0]);
  } catch (error) {
    console.error("Error fetching patient:", error);
    return null;
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;

    if (identificationDocument) {
      const inputFile =
        identificationDocument &&
        InputFile.fromBuffer(
          identificationDocument?.get("blobFile") as Blob,
          identificationDocument?.get("fileName") as string
        );
      file = await storage.createFile({
        bucketId: BUCKET_ID!,
        fileId: ID.unique(),
        file: inputFile,
      });
    }
    const newPatient = await tablesDB.createRow({
      databaseId: DATABASE_ID!,
      tableId: PATIENT_COLLECTION_ID!,
      rowId: ID.unique(),
      data: {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
        ...patient,
      },
    });

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};
