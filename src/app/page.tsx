import { PatientForm } from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";
import { PasskeyModal } from "@/components/PasskeyModal";

interface SearchParamProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: SearchParamProps) {
  const params = await searchParams;
  const isAdmin = params?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
      <section className="container my-auto remove-scrollbar">
        <div className="sub-container max-w-[496px]">
          <div className="flex items-center gap-2 mb-12">
            <Image
              src="/assets/icons/logo-sm.svg"
              alt="patient"
              width={1000}
              height={1000}
              className="h-10 w-fit"
            />
            <p className="text-36-bold">SchedMed</p>
          </div>
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
