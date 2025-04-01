import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import AppSidebar from "./app-sidebar";
import AppHeader from "./app-header";
import withAuth from "@/hooks/with-auth";

function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="relative">
        <AppHeader />
        <div className="p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default withAuth(AppLayout);
