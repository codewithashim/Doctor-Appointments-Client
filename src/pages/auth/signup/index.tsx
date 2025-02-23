'use client';
/* eslint-disable @next/next/no-img-element */
import { useAppDispatch } from "@/Store";
import { openNotificationWithIcon } from "@/Components/Global/Message/Message";
import { SIGNUP_URL } from "@/Utils/Urls/Authurl/Authurl";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/Components/Global/Button/Button";
import Preloader from "@/Components/Global/Preloader/Preloader";
import dynamic from "next/dynamic";

const DynamicRootLayout = dynamic(() => import('@/Layouts/RootLayout'), {
  ssr: false,
  loading: () => <div>
      <Preloader />
  </div>,
});

interface FormData {
  email: string;
  name: string;
  phone: string;
  password: string;
  confirmPassword: string;
  profile?: File;
}

const Signup: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("role", "Patient");
      
      if (data.profile) {
        formData.append("profile", data.profile);
      }

      const response = await axios.post(SIGNUP_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response?.status === 200) {
        openNotificationWithIcon(
          "success",
          "Signup Successful",
          "User has been successfully submitted."
        );
        router.push("/auth/login");
      } else {
        openNotificationWithIcon(
          "error",
          "Signup Failed",
          "There was an error submitting the user information. Please try again."
        );
      }
    } catch (err) {
      openNotificationWithIcon("error", "Signup Failed", `${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageUrl(null);
    // Clear file input if needed
    // document.getElementById('fileInput').value = ''; 
  };

  return (
    <DynamicRootLayout>
      <div className="container py-4">
        <div className="bg-[#ffffff92] mx-auto rounded-xl p-6 sm:p-8 md:p-10 w-full xl:max-w-[70%]">
          <div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-between">
              <div>
                <h1 className="text-[1.2rem] md:text-[1.5rem]">
                  Welcome to{" "}
                  <span className="text-[#B29F6B] font-extrabold">
                    Doctor Portal
                  </span>
                </h1>
                <h1 className="text-[2rem] md:text-[2.3rem] font-bold">
                  Sign Up
                </h1>
              </div>

              <div className="flex flex-col items-start md:items-end">
                <p className="text-[1.2rem] md:text-[1.3rem] text-[#1C7064]">
                  Have an Account ?
                </p>
                <Link
                  href="/auth/login"
                  className="text-[1.3rem] md:text-[1.3rem] text-[#1C7064]"
                >
                  Sign In
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-4 gap-4">
              <div>
                <label className="text-[1.2rem] md:text-[1.3rem]">
                  Full Name
                </label>
                <input
                  {...register("name", { required: true })}
                  placeholder="Full Name"
                  className="w-full p-3 md:p-4 rounded my-2 md:my-3 outline outline-[#1C7064]"
                />
                {errors.name && (
                  <p className="text-red-500">Name is required.</p>
                )}
              </div>
              <div>
                <label className="text-[1.2rem] md:text-[1.3rem]">
                  Enter email address
                </label>
                <input
                  {...register("email", { required: true })}
                  placeholder="User Email"
                  className="w-full p-3 md:p-4 rounded my-2 md:my-3 outline outline-[#1C7064]"
                />
                {errors.email && (
                  <p className="text-red-500">Email is required.</p>
                )}
              </div>
              <div>
                <label className="text-[1.2rem] md:text-[1.3rem]">
                  Contact Number
                </label>
                <input
                  {...register("phone", { required: true })}
                  placeholder="Contact Number"
                  className="w-full p-3 md:p-4 rounded my-2 md:my-3 outline outline-[#1C7064]"
                />
                {errors.phone && (
                  <p className="text-red-500">Contact Number is required.</p>
                )}
              </div>

              <div>
                <label className="text-[1.2rem] md:text-[1.3rem]">
                  Enter your Password
                </label>
                <input
                  {...register("password", { required: true })}
                  placeholder="Enter your Password"
                  type="password"
                  className="w-full p-3 md:p-4 rounded my-2 md:my-3 outline outline-[#1C7064]"
                />
                {errors.password && (
                  <p className="text-red-500">Password is required.</p>
                )}
              </div>
              <div>
                <label className="text-[1.2rem] md:text-[1.3rem]">
                  Enter your Confirm Password
                </label>
                <input
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  placeholder="Enter your Confirm Password"
                  type="password"
                  className="w-full p-3 md:p-4 rounded my-2 md:my-3 border outline outline-[#1C7064]"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    Confirm Password is required.
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4">
                <label className="text-[1.2rem] md:text-[1.3rem]">
                  Profile Picture
                </label>
                {imageUrl && (
                  <div className="flex items-center">
                    <img src={imageUrl} alt="Profile Preview" className="w-20 h-20 object-cover rounded-full" />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="ml-2 text-sm text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {!imageUrl && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="my-2 md:my-3"
                  />
                )}
              </div>
              <div className="flex justify-end my-4">
                <Button
                  title={loading ? 'Submiting...' : 'Sign Up'}
                  className={`text-white px-8 md:px-10 py-2 md:py-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </DynamicRootLayout>
  );
};

export default Signup;
