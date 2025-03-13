import React from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";

interface MainLayoutProps {
  children: React.ReactNode;
  showToggle?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, showToggle = false }) => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header showToggle={showToggle} />
      <main>{children}</main>
      <footer className="fixed bottom-5 w-full text-center flex justify-center items-center">
        <p>
          © {new Date().getFullYear()} Shikha Learning Labs Private Limited
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
