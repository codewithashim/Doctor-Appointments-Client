/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import { Button } from "@/Components/Global/Button/Button";
import { Doctor } from "@/assets";

const MakeAppointment = () => {
  return (
    <section className="makeAppointment my-24  bg-fixed  container ">
      <div className="flex flex-col md:flex-row items-center rounded-lg overflow-hidden ">
        <div className="relative md:w-1/3 w-full h-full ">
          <Image
            src={Doctor}
            alt="Doctor"
            layout="responsive"
            width={500}
            height={400}
            className="-mt-[3rem] hidden md:block rounded-lg"
          />
        </div>
        <div className="md:w-2/3 w-full p-8">
          <h2 className="text-secondary font-bold text-2xl mb-2">Appointment</h2>
          <h1 className="text-4xl font-bold text-white mb-4">
            Make an appointment Today
          </h1>
          <p className="text-white mb-6">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The
            point of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop
            publishing packages and web page editors now use Lorem Ipsum as their
            default model text.
          </p>
          <Button
            title="Get Started"
            link="/appointment"
            className="text-white w-fit px-8 py-3"
          />
        </div>
      </div>
    </section>
  );
};

export default MakeAppointment;
