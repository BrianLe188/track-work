import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import CommunicationSidebar from "./communication-sidebar";
import withAuth from "@/hooks/with-auth";

function CommunicationLayout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <CommunicationSidebar />
      <SidebarInset>
        <div className="flex h-screen w-full overflow-hidden bg-background">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default withAuth(CommunicationLayout);
