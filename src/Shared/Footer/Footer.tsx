/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import { MainLogo } from "@/assets";

const Footer = () => {
  return (
    <footer className="footerSection bg-cover bg-center bg-no-repeat bg-fixed py-10 px-4 sm:px-6 lg:px-8 text-gray-700">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
        {/* Logo and Branding */}
        <div className="mb-8 md:mb-0 flex-shrink-0">
          <Link href="/" aria-label="Back to homepage">
              <Image src={MainLogo} alt="Doctor Portal Logo" width={100} height={100} className="w-20 h-20" />
          </Link>
          <p className="mt-2">
            Doctor Portal
            <br className="hidden md:block" />
            Providing reliable health care services for you and your family
          </p>
        </div>

        {/* Services */}
        <div className="mb-8 md:mb-0">
          <span className="footer-title font-bold block mb-2">SERVICES</span>
          <ul className="space-y-2">
            <li>
              <Link href="/">Emergency Checkup</Link>
            </li>
            <li>
              <Link href="/">Monthly Checkup</Link>
            </li>
            <li>
              <Link href="/">Weekly Checkup</Link>
            </li>
            <li>
              <Link href="/">Deep Checkup</Link>
            </li>
          </ul>
        </div>

        {/* Oral Health */}
        <div className="mb-8 md:mb-0">
          <span className="footer-title font-bold block mb-2">ORAL HEALTH</span>
          <ul className="space-y-2">
            <li>
              <Link href="/">Fluoride Treatment</Link>
            </li>
            <li>
              <Link href="/">Cavity Filling</Link>
            </li>
            <li>
              <Link href="/">Teeth Whitening</Link>
            </li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <span className="footer-title font-bold block mb-2">OUR ADDRESS</span>
          <Link href="/" className="link link-hover flex items-center gap-2">
            <FaMapMarkerAlt />
            <span>New York - 101010 Hudson</span>
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8">
        <p>© Copyright 2024 All Rights Reserved by Doctor Portal</p>
      </div>
    </footer>
  );
};

export default Footer;
