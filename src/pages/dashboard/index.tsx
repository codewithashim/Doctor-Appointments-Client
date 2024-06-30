'use client';
import React from 'react';
import useAuth from '@/Hooks/useAuth';
import Preloader from "@/Components/Global/Preloader/Preloader";
import dynamic from 'next/dynamic';

const DynamicDashboardLayout = dynamic(() => import('@/Layouts/DashboardLayout'), {
    ssr: false,
    loading: () => <div>
        <Preloader />
    </div>,
});

const Dashboard = () => {
    const { isLogin, isHydrated } = useAuth();

    if (!isHydrated) {
        return <Preloader />;
    }

    return (
        <DynamicDashboardLayout>
            <h1>Dashboard</h1>
        </DynamicDashboardLayout>
    );
};

export default Dashboard;
