import {
  Shield, User, LayoutDashboard, Brain, Users, Video, CreditCard,
  LogOut, LogIn,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { motion } from "framer-motion";

const services = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Auth Service", url: "/auth", icon: Shield },
  { title: "User Service", url: "/user", icon: User },
  { title: "Quiz Service", url: "/quiz", icon: Brain, protected: true },
  { title: "Community", url: "/community", icon: Users, protected: true },
  { title: "Video Analysis", url: "/video-analysis", icon: Video, protected: true },
  { title: "Payment", url: "/payment", icon: CreditCard },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-jua text-xs tracking-wider uppercase text-magic-green-glow">
            {!collapsed && "Microservices"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {services.map((item) => {
                const locked = item.protected && !isLoggedIn;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <NavLink
                        to={item.url}
                        end={item.url === "/"}
                        className={`transition-colors ${locked ? "opacity-50" : "hover:bg-sidebar-accent"}`}
                        activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold"
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && (
                          <span className="flex items-center gap-2">
                            {item.title}
                            {locked && (
                              <span className="text-[10px] bg-destructive/20 text-destructive px-1.5 py-0.5 rounded-full">
                                🔒
                              </span>
                            )}
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        {isLoggedIn ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="flex items-center gap-2 w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>{user?.username} · Logout</span>}
          </motion.button>
        ) : (
          <NavLink
            to="/auth"
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <LogIn className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Sign In</span>}
          </NavLink>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
