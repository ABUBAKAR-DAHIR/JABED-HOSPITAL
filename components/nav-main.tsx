'use client'

import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    icon?: LucideIcon
    isActive?: boolean
    onClick: () => void
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuButton
            key={item.title}
            tooltip={item.title}
            onClick={item.onClick}
            className="flex items-center justify-between"
          >
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight
              className={`ml-auto transition-transform duration-200 ${
                item.isActive ? "rotate-90" : ""
              }`}
            />
          </SidebarMenuButton>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
