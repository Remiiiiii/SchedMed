import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import React from "react";

const Register = async ({ params }: { params: { userId: string } }) => {
  const { userId } = await params;
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="container remove-scrollbar">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <div className="flex items-center mb-10">
            <Image
              src="/assets/icons/logo-sm.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="h-[50px] w-[50px]"
            />
            <p className="text-32-bold">SchedMed</p>
          </div>
          <RegisterForm user={user} />
          <p className="py-12 copyright">© 2025 SchedMed</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="Register image"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
