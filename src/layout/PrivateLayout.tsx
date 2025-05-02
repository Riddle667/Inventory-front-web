import { PrimarySearchAppBar } from "./Navbar";
import { AppSidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const PrivateLayout = () => {
    
    return (
        <div style={{ display: "flex", height: "100vh", direction: "ltr" }}>
        <AppSidebar />
        <main
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <PrimarySearchAppBar />
          
            <Outlet />
        </main>
        </div>
    );
    }