import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import NavMain from "./nav-main";
import NavProjects from "./nav-projects";
import ProjectSwitcher from "./project-switcher";
import NavUser from "@/components/layout/nav-user";
import { useAuthStore } from "@/stores/auth";
import { useAppStore } from "@/stores/app";

export default function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const data = useAppStore((state) => state.sidebar);

  const { auth } = useAuthStore();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ProjectSwitcher projects={data.projects} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      {auth && (
        <SidebarFooter>
          <NavUser user={auth} />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}
