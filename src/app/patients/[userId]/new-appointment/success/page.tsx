import Link from "next/link";
import Image from "next/image";
import { getAppointments } from "@/lib/actions/appointment.actions";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as Sentry from "@sentry/nextjs";
import { getUser } from "@/lib/actions/patient.actions";

const Success = async ({ params, searchParams }: SearchParamProps) => {
  const { userId } = await params;
  const searchParamsData = await searchParams;
  const appointmentId = (searchParamsData?.appointmentId as string) || "";

  const appointment = await getAppointments(appointmentId);
  const doctor = appointment
    ? Doctors.find((doc) => doc.name === appointment.primaryPhysician)
    : null;

  const user = await getUser(userId);

  Sentry.addBreadcrumb({
    message: "User viewing appointment success page",
    category: "user",
    data: { userName: user?.name },
  });

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <div className="flex items-center gap-2 mb-12">
          <Link href="/">
            <Image
              src="/assets/icons/logo-sm.svg"
              height={1000}
              width={1000}
              alt="logo"
              className="h-[80px] w-[80px]"
            />
          </Link>
          <p className="-ml-6 text-24-bold">SchedMed</p>
        </div>
        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={100}
            width={100}
            alt="success"
          />

          <h2 className="header mb-6 max-w-[600px] text-center">
            Great! Your
            <span className="text-green-500"> appointment request</span> has
            been submitted
          </h2>
          <p>We&apos;ll contact you soon to confirm your appointment</p>
        </section>
        <div className="py-8 border-t-2 border-y-2 border-dark-400">
          <p className="mb-6 text-lg font-semibold text-center">
            Appointment Details:
          </p>
          <section className="request-details">
            <div className="flex items-center gap-3">
              <Image
                src={doctor?.image || ""}
                alt="doctor"
                height={50}
                width={50}
                className="size-15"
              />
              <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
            </div>
            <div className="flex gap-2">
              <Image
                src="/assets/icons/calendar.svg"
                height={24}
                width={24}
                alt="calendar"
              />
              <p>
                {appointment
                  ? formatDateTime(appointment.schedule).dateTime
                  : "No appointment scheduled"}
              </p>
            </div>
          </section>
        </div>
        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            Schedule Another Appointment
          </Link>
        </Button>
        <p className="copyright">© 2025 SchedMed</p>
      </div>
    </div>
  );
};

export default Success;
