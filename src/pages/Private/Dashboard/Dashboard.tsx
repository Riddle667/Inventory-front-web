
import { AppSidebar, PrimarySearchAppBar } from "@/layout";
import React from "react";

export const Dashboard: React.FC = () => {

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        direction: "ltr",
      }}
    >
      <AppSidebar
      />
      <main style={{ flexGrow: 1 }}>
        <PrimarySearchAppBar
        />
      </main>
    </div>
  );
};

