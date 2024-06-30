import { Button } from "@/Components/Global/Button/Button";
import RootLayout from "@/Layouts/RootLayout";
import { useAppDispatch } from "@/Store";
import { openNotificationWithIcon } from "@/Components/Global/Message/Message";
import { setAuthState } from "@/Store/authSlice";
import { LOGIN_URL } from "@/Utils/Urls/Authurl/Authurl";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

const UserLoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();

  const router = useRouter()

  const onSubmit = async (data: any) => {
    try {
      const userData = {
        email: data.email,
        password: data.password,
      };
      const response = await axios.post(LOGIN_URL, userData);
      if (response?.status === 200 || response?.data) {
        openNotificationWithIcon(
          'success',
          'Login Successful',
          'Successfully login done.',
        );
        dispatch(
          setAuthState({
            authState: true,
            id: response?.data?.data?.id,
            name: response?.data?.data?.name,
            email: response?.data?.data?.email,
            phone: response?.data?.data?.phone,
            role: response?.data?.data?.role,
            profile: response?.data?.data?.profile,
            authtoken: response?.data?.data?.accessToken,
          })
        );
        router.push("/")
      } else {
        openNotificationWithIcon(
          'error',
          'Login Failed',
          'There was an error submitting the  information. Please try again.',
        );
      }
    } catch (err) {
      openNotificationWithIcon(
        'error',
        'Login Failed',
        `${err}`
      );
    }
  };

  return (
    <RootLayout>
      <div className="container py-10">
        <div className="bg-[#ffffff92] mx-auto rounded-xl p-6 sm:p-8 md:p-10 w-full xl:max-w-[50%]">
          <div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-between">
              <div>
                <h1 className="text-[1.5rem] md:text-[1.7rem]">
                  Welcome to{" "}
                  <span className="text-[#B29F6B] font-extrabold">
                    Doctor Portal
                  </span>
                </h1>
                <h1 className="text-[2rem] md:text-[2.5rem] font-bold">Sign in</h1>
              </div>

              <div className="flex flex-col items-start md:items-end">
                <p className="text-[1.4rem] md:text-[1.4rem] text-[#1C7064]">No Account?</p>
                <Link href="/auth/signup" className="text-[1.4rem] md:text-[1.3rem] text-[#1C7064]">Sign up</Link>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:gap-6">
              <div>
                <label className="text-[1.2rem] md:text-[1.3rem]">
                  Enter your username or email address
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
                <div>
                  <Link
                    href="/"
                    className="text-[#1C7064] text-[1.2rem] md:text-[1.3rem] flex justify-end"
                  >
                    Forgot Password
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-end my-4 md:my-6">
              <Button
                onClick={handleSubmit(onSubmit)}
                title="Sign In"
                className="text-white px-8 md:px-10 py-2 md:py-3"
              />
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default UserLoginPage;

