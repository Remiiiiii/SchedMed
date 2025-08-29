import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className="flex flex-col gap-12 items-center sm:items-start">
          <h1 className="text-5xl font-bold leading-tight text-center sm:text-left">
            Welcome to <br />
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
              SchedMed
            </span>
          </h1>
          <p className="text-lg text-gray-700 text-center sm:text-left max-w-md">
            Your ultimate solution for managing medical schedules and
            appointments.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </a>
            <a
              href="#"
              className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </main>

      <footer className="flex gap-4 row-start-3 items-center flex-wrap justify-center">
        <p className="text-sm text-gray-500">Built with ❤️ by Your Team</p>
      </footer>
    </div>
  );
}
