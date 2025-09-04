import * as sdk from "node-appwrite";

export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

const client = new sdk.Client();

// Only initialize if environment variables are available
if (ENDPOINT && PROJECT_ID && API_KEY) {
  client.setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);
} else {
  console.warn(
    "Appwrite environment variables are not set. Please configure your .env.local file."
  );
}

export const database = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
export const account = new sdk.Account(client);
