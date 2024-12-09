import Image from "next/image";

export default function Hero() {
  return (
    <div className="flex pt-12 px-6 md:px-20 items-center justify-center bg-hero md:h-screen overflow-hidden dark:bg-gray-900">
      <div className="flex flex-col gap-6 md:flex-row items-center max-w-8xl">
        <div className="w-full md:w-1/2 lg:pr-32">
          <h2 className="text-4xl lg:text-5xl text-center md:text-left text-blue-900 dark:text-blue-300 leading-tight font-medium">
            Discover the Secrets of Generating Massive Income with Affiliate Marketing!
          </h2>
          <h3 className="mt-6 md:mt-10 text-md lg:text-xl text-center md:text-left text-gray-700 dark:text-gray-300 font-light tracking-wider leading-relaxed">
            Tired of struggling to earn a decent income from affiliate marketing? MIAM is your solution. Learn proven strategies, step-by-step guidance, and insider tips to skyrocket your affiliate earnings.
          </h3>
          <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start">
            <button className="w-full sm:w-40 px-4 py-3 rounded font-semibold text-md bg-blue-500 text-white border-2 border-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:border-blue-600 dark:hover:bg-blue-700">
              Enroll now
            </button>
            <button className="w-full mt-4 sm:mt-0 sm:ml-4 sm:w-40 px-4 py-3 rounded font-semibold text-md bg-white text-blue-500 border-2 border-gray-500 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700">
              Watch preview video
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image
            width={600}
            height={600}
            alt="image here"
            src="https://i.ibb.co/Tw6kQJ4/IMG-20241208-WA0043.jpg"
          />
        </div>
      </div>
    </div>
  );
}
