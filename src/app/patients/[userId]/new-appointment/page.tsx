import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import * as Sentry from "@sentry/nextjs";

const NewAppointment = async ({ params }: { params: { userId: string } }) => {
  const { userId } = await params;
  const patient = await getPatient(userId);

  Sentry.addBreadcrumb({
    message: "User viewing appointment page",
    category: "user",
    data: { userName: patient?.name },
  });

  return (
    <div className="flex h-screen max-h-screen">
      <section className="container my-auto remove-scrollbar">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <div className="flex items-center gap-2 mb-12">
            <Image
              src="/assets/icons/logo-sm.svg"
              height={1000}
              width={1000}
              alt="logo"
              className="h-[50px] w-[50px]"
            />
            <p className="text-36-bold">SchedMed</p>
          </div>

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient?.$id || ""}
          />

          <p className="py-12 mt-10 copyright">© 2025 SchedMed</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[40%] bg-bottom"
      />
    </div>
  );
};

export default NewAppointment;
