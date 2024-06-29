/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Image from "next/image";
import tritments from "../../../assets/images/treatment.png";
import { Button } from "@/Components/Global/Button/Button";

interface TreatmentProps { }

const Treatment: React.FC<TreatmentProps> = () => {
  return (
    <section className="container mx-auto my-6 px-4">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
        <div className="relative rounded-lg shadow-2xl lg:w-2/6 w-full">
          <Image
            src={tritments}
            alt="Doctor Portal"
            className="rounded-lg"
            layout="responsive"
            objectFit="cover"
            width={400}
            height={400}
          />
        </div>

        <div className="lg:w-3/5 w-full">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Exceptional Dental <br /> Care, on Your Terms
          </h1>
          <p className="py-6 text-lg lg:text-xl">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The
            point of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop
            publishing packages and web page editors now use Lorem Ipsum as their
            default model text.
          </p>
          <Button
            title={"Get Started"}
            link="/appointment"
            className={"text-white w-fit px-8 py-3"}
          />
        </div>
      </div>
    </section>
  );
};

export default Treatment;
