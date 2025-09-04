/* eslint-disable @typescript-eslint/no-explicit-any */

import { ID, Query } from "node-appwrite";
import { users, account } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    if (!users) {
      throw new Error(
        "Appwrite client not initialized. Please check your environment variables."
      );
    }

    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      user.name
    );
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      return documents.users[0];
    }
    console.error("Error creating user:", error);
    throw error;
  }
};
