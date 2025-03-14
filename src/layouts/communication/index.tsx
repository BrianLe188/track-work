import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import CommunicationHeader from "./communication-header";
import CommunicationSidebar from "./communication-sidebar";

export default function CommunicationLayout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <CommunicationSidebar />
      <SidebarInset className="relative">
        <CommunicationHeader />
        <div className="p-4 mt-10">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
