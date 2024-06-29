import { Button } from "@/Components/Global/Button/Button";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <header>
      <div className="min-h-[75vh] z-10 md:relative overflow-hidden flex w-full items-baseline bg-gray-50">
        {/* /* ---------------------------------- Image --------------------------------- */}
        <div className="transform -skew-x-[10deg] overflow-hidden w-1/2 -right-12 rounded-bl-[12px] absolute top-0 h-full hidden md:block">
          <div className="transform skew-x-[10deg] absolute top-20 -right-2 h-full z-1 w-full bg-cover bg-no-repeat scale-[1.3] bg-center bg-hero-section"></div>
        </div>
        {/* Image end */}

        {/* /* ------------------------------ Left section ------------------------------  */}
        <div className="md:z-1 md:w-1/2 flex justify-center mt-20 ">
          <div className="flex flex-wrap mx-3 justify-center">
            <div className="w-full pl-10 flex gap-5 flex-col md:w-8/12">
              <h1 className="md:relative md:z-10 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 text-5xl font-bold">
                Feel Better About
              </h1>
              <h1 className="text-gray-700 text-5xl font-bold ">
                Finding Healthcare
              </h1>
              <p className="text-gray-500 font-normal text-xl">
                The time is now for it be okay to be great. People in this world
                shun people for being nice.
              </p>
              <div className="flex items-center gap-5 pt-4">
                <Button
                  title={"Get Started"}
                  link="/appointment"
                  className={"text-white px-8 py-3"}
                />
                <Link
                  href="/appointment"
                  className="text-gray-900 text-base text-[1.2rem] hover:scale-105 duration-300 transition-all ease-linear"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* left section end */}
      </div>
    </header>
  );
};

export default Hero;
