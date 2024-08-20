
import { AppSidebar, PrimarySearchAppBar } from "@/layout";
import React from "react";

export const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [hasImage, setHasImage] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  // handle on theme change event
  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  // handle on image change event
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasImage(e.target.checked);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        direction: "ltr",
      }}
    >
      <AppSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        hasImage={hasImage}
        theme={theme}
      />
      <main style={{ flexGrow: 1 }}>
        <PrimarySearchAppBar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          hasImage={hasImage}
          setHasImage={setHasImage}
          theme={theme}
          setTheme={setTheme}
          handleThemeChange={handleThemeChange}
          handleImageChange={handleImageChange}
        />
      </main>
    </div>
  );
};

