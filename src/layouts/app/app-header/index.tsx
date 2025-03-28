import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAppStore } from "@/stores/app";
import { useMemo } from "react";
import { useLocation } from "react-router";

export default function AppHeader() {
  const { pathname } = useLocation();

  const sidebarData = useAppStore((state) => state.sidebar);

  const title = useMemo(() => {
    const navMain = sidebarData.navMain;
    const target = navMain.find((i) => i.items.some((e) => e.url === pathname));
    return {
      parentTitle: target?.title,
      parentUrl: target?.url,
      childTitle: target?.items.find((i) => i.url === pathname)?.title,
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href={title?.parentUrl}>
              {title?.parentTitle}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>{title?.childTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
