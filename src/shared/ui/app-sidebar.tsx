import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // SidebarMenuSub,
  // SidebarMenuSubButton,
  // SidebarMenuSubItem,
  SidebarRail,
} from "@/shared/shadcn-ui/components/ui/sidebar";
import { NavLink } from "react-router-dom";

// {
//   title: "Календарь тренировок",
//   url: "/",
//   items: [
//     {
//       title: "Календарь",
//       url: "#",
//     },
//     {
//       title: "Список упражнений",
//       url: "#",
//       isActive: true,
//     },
//     {
//       title: "Статистика",
//       url: "#",
//     },
//   ],
// }
const data = {
  navMain: [
    {
      title: "Календарь",
      url: "/",
      items: [],
    },
    {
      title: "Упражнения",
      url: "/exercise",
      items: [],
    },
    {
      title: "Тренера",
      url: "/trainers",
      items: [],
    },
    {
      title: "Профиль",
      url: "/profile",
      items: [],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-lg">Грамотный спорт</span>
                  {/* <span className="">v0.0.1</span> */}
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <NavLink to={item.url}>
                    <span className="text-xl font-medium">{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
                {/* {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null} */}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
