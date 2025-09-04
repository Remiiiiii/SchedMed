import { PatientForm } from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="container my-auto remove-scrollbar">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-sm.svg"
            alt="patient"
            width={1000}
            height={1000}
            className="h-10 mb-12 w-fit"
          />
          <h2 className="text-white text-36-bold">SchedMed</h2>
          <PatientForm />
          <div className="flex justify-between mt-20 text-14-regular">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 SchedMed
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/landing-dr-img.png"
        alt="patient"
        width={1000}
        height={1000}
        className="hidden object-contain h-50 w-50 md:block max-w-[50%] mt-[10%]"
      />
    </div>
  );
}
