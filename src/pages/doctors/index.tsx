'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import Preloader from "@/Components/Global/Preloader/Preloader";
const DynamicDoctors = dynamic(() => import('@/Components/Doctors/Doctors'), {
    ssr: false
});
const DynamicRootLayout = dynamic(() => import('@/Layouts/RootLayout'), {
    ssr: false,
    loading: () => <div>
        <Preloader />
    </div>,
});


const DoctorPage = () => {
    return (
        <DynamicRootLayout>
            <DynamicDoctors />
        </DynamicRootLayout>
    );
};

export default DoctorPage;