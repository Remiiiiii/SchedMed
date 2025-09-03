import { PatientForm } from "@/components/forms/PatientForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="flex  max-w-[500px]">
          <Image
            src="/assets/icons/logo-sm.svg"
            alt="patient"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />
          <h2 className="text-white text-36-bold">SchedMed</h2>
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
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
