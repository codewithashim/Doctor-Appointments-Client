'use client';
import React from 'react';
import useAuth from '@/Hooks/useAuth';
import Preloader from "@/Components/Global/Preloader/Preloader";
import dynamic from 'next/dynamic';
const DynamicDashboard = dynamic(() => import('@/Components/Dashboard/Dashboard/Dashboard'), {
  ssr: false
});
const DynamicDashboardLayout = dynamic(() => import('@/Layouts/DashboardLayout'), {
    ssr: false,
    loading: () => <div>
        <Preloader />
    </div>,
});

const DashboardPage = () => {
    const { isLogin, isHydrated } = useAuth();

    if (!isHydrated) {
        return <Preloader />;
    }

    return (
        <DynamicDashboardLayout>
            <DynamicDashboard/>
        </DynamicDashboardLayout>
    );
};


export default DashboardPage;
