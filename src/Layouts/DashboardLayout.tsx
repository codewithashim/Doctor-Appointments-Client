"use client";
import React, { ReactNode, useState, useEffect } from "react";
import { Layout, Menu, Button, Drawer } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  HomeOutlined
} from "@ant-design/icons";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from "@/Store";
import { clearAuthState } from "@/Store/authSlice";

const { Header, Sider, Content } = Layout;

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setMobileView(isMobile);
      if (!isMobile && drawerVisible) {
        setDrawerVisible(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawerVisible]);

  const toggleSidebar = () => {
    if (mobileView) {
      setDrawerVisible(!drawerVisible);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const sidebarWidth = collapsed ? 80 : 200;

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link href="/dashboard">Dashboard</Link>,
    },
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <Link href="/dashboard">Profile</Link>,
    },
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link href="/">Home</Link>,
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(`/${key}`);
    if (mobileView) {
      setDrawerVisible(false);
    }
  };

  const handleLogout = () => {
    dispatch(clearAuthState());
    router.push("/");
  };

  const SidebarContent = () => (
    <>
      <div className="m-4" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        items={menuItems}
        onClick={handleMenuClick}
      />
      <Button
        className="mt-2 ml-3"
        type="primary"
        onClick={handleLogout}
        icon={<LogoutOutlined />}
      >
        Logout
      </Button>
    </>
  );

  return (
    <Layout className="min-h-screen">
      {!mobileView && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={sidebarWidth}
          className="fixed left-0 top-0 bottom-0 h-screen z-20 bg-gray-800 transition-all duration-300 ease-in-out overflow-y-auto"
          style={{
            position: 'sticky',
            height: '100vh',
          }}
        >
          <SidebarContent />
        </Sider>
      )}
      <Layout className={mobileView ? '' : `ml-[${sidebarWidth}px]`}>
        <Header className="px-4 bg-white flex items-center justify-between sticky top-0 z-10">
          <Button
            onClick={toggleSidebar}
            className="px-4 py-2 text-xl bg-white"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
          <div className="mr-4">
            {/* Add header content here */}
          </div>
        </Header>
        <Content className="m-6 p-6 bg-white min-h-[calc(100vh-64px)]">
          {children}
        </Content>
      </Layout>
      {mobileView && (
        <Drawer
          placement="left"
          closable={false}
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          bodyStyle={{ padding: 0, backgroundColor: '#001529' }}
          width={200}
        >
          <SidebarContent />
        </Drawer>
      )}
    </Layout>
  );
};

export default DashboardLayout;
