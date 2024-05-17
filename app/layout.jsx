import React from "react";
import "@/assets/styles/globals.css";
import NavBar from "@/components/NavBar";
export const metadata = {
  title: "Save Nabeel",
  description: "Join the donation drive",
  keywords: "nabeel,savenabeel,save,cancer,patient,donate",
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  );
};

export default MainLayout;
