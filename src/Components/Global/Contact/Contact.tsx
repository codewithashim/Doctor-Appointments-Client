import React from "react";
import { useForm } from "react-hook-form";

interface FormData {
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <section className="p-10 mb-6 h-full bg-fixed flex flex-col justify-center items-center  container rounded makeAppointment">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-center text-secondary">
          Contact Us
        </h1>
        <p className="text-4xl text-white my-2">Stay connected with us</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 justify-center items-center mx-auto md:w-[450px]">
        <input
          type="email"
          placeholder="Email Address"
          className="input input-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        <input
          type="text"
          placeholder="Subject"
          className="input input-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          {...register("subject", { required: "Subject is required" })}
        />
        {errors.subject && <span className="text-red-500">{errors.subject.message}</span>}
        <textarea
          className="textarea input-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Your message"
          {...register("message", { required: "Message is required" })}
        ></textarea>
        {errors.message && <span className="text-red-500">{errors.message.message}</span>}
        <button
          type="submit"
          className="btn bg-gradient-to-r from-primary to-secondary hover:from-pink-500 hover:to-yellow-500 text-white font-bold px-8 py-3 rounded-md focus:outline-none"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default Contact;
