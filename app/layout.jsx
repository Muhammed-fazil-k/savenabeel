import React from "react";
import "@/assets/styles/globals.css";
import "@/assets/styles/layout.css";
import NavBar from "@/components/NavBar";
import AuthContext, { AuthProvider } from "@/context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer";
export const metadata = {
  title: "Save Nabeel",
  description: "Join the donation drive",
  keywords: "nabeel,savenabeel,save,cancer,patient,donate",
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <AuthProvider>
          <main className="layout">
            <NavBar />
            {children}
            <Footer />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
};

export default MainLayout;
