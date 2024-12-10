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
        </div>
      </div>
    </div>
  );
}
