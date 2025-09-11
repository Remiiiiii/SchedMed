"use server";

import { ID, Query } from "node-appwrite";
import {
  APPOINTMENT_COLLECTION_ID,
  DATABASE_ID,
  messaging,
  tablesDB,
  PATIENT_COLLECTION_ID,
} from "../appwrite.config";
import { formatDateTime, parseStringify } from "../utils";

import { revalidatePath } from "next/cache";
import { Appointment } from "../../../types/appwrite.types";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await tablesDB.createRow({
      databaseId: DATABASE_ID!,
      tableId: APPOINTMENT_COLLECTION_ID!,
      rowId: ID.unique(),
      data: appointment,
    });

    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const getAppointments = async (appointmentId: string) => {
  try {
    const appointment = await tablesDB.getRow({
      databaseId: DATABASE_ID!,
      tableId: APPOINTMENT_COLLECTION_ID!,
      rowId: appointmentId,
    });

    return parseStringify(appointment);
  } catch (error) {
    console.log(error);
  }
};

export const getRecentAppointmentList = async () => {
  try {
    const appointments = await tablesDB.listRows({
      databaseId: DATABASE_ID!,
      tableId: APPOINTMENT_COLLECTION_ID!,
      queries: [Query.orderDesc("$createdAt")],
    });

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (appointments.rows as unknown as Appointment[]).reduce(
      (acc, appointment) => {
        if (appointment.status === "scheduled") {
          acc.scheduledCount += 1;
        } else if (appointment.status === "pending") {
          acc.pendingCount += 1;
        } else if (appointment.status === "cancelled") {
          acc.cancelledCount += 1;
        }
        return acc;
      },
      initialCounts
    );

    // Fetch patient details for each appointment
    const appointmentsWithPatientDetails = await Promise.all(
      (appointments.rows as unknown as Appointment[]).map(
        async (appointment: Appointment) => {
          try {
            let patientData;
            if (typeof appointment.patient === "string") {
              patientData = await tablesDB.getRow({
                databaseId: DATABASE_ID!,
                tableId: PATIENT_COLLECTION_ID!,
                rowId: appointment.patient,
              });
            } else if (appointment.patient && appointment.patient.$id) {
              patientData = await tablesDB.getRow({
                databaseId: DATABASE_ID!,
                tableId: PATIENT_COLLECTION_ID!,
                rowId: appointment.patient.$id,
              });
            } else {
              // Fallback: patient data might already be populated
              patientData = appointment.patient;
            }

            return {
              ...appointment,
              patient: patientData,
            };
          } catch (patientError) {
            console.log("Error fetching patient data:", patientError);
            // Return appointment with original patient data if fetch fails
            return appointment;
          }
        }
      )
    );

    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointmentsWithPatientDetails,
    };
    return parseStringify(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  appointment,
  userId,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await tablesDB.updateRow({
      databaseId: DATABASE_ID!,
      tableId: APPOINTMENT_COLLECTION_ID!,
      rowId: appointmentId,
      data: appointment,
    });

    if (!updatedAppointment) {
      throw new Error("Appointment not found");
    }

    const smsMessage = `Hello there! It's Remy with SchedMed.

${
  type === "schedule"
    ? `Your appointment has been successfully scheduled for ${
        formatDateTime(appointment.schedule!).dateTime
      } with Dr.${appointment.primaryPhysician}.`
    : `We're sorry to inform you that your appointment on ${
        formatDateTime(appointment.schedule!).dateTime
      } has been cancelled for the following reason: ${
        appointment.cancellationReason
      }`
}`;

    await sendSMSNotification(userId, smsMessage);
    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log(error);
  }
};

export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    const message = await messaging.createSMS({
      messageId: ID.unique(),
      content: content, // Message content
      targets: [],
      users: [userId], // Phone number in E.164 format (e.g., +1234567890)
      // Optional parameters
      // topics: [], // Topics to send to
      // users: [], // User IDs to send to
      // draft: false, // Whether to save as draft
      // scheduledAt: "2024-01-01T00:00:00.000Z", // Schedule for later
    });
    return parseStringify(message);
  } catch (error) {
    console.log("SMS notification error:", error);
    throw error;
  }
};
