import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  PenTool, 
  Target, 
  TrendingUp, 
  FolderOpen,
  Search,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const workspaces = [
  { name: "Create", path: "/create", icon: PenTool },
  { name: "Strategy", path: "/strategy", icon: Target },
  { name: "Intelligence", path: "/intelligence", icon: TrendingUp },
  { name: "Hub", path: "/hub", icon: FolderOpen },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="flex h-full items-center justify-between px-6">
      {/* Logo */}
      <Link 
        to="/create" 
        className="flex items-center gap-2 text-lg font-semibold tracking-tight transition-colors hover:text-primary"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          K
        </div>
        <span className="hidden sm:inline">KiwiQ</span>
      </Link>

      {/* Primary Navigation */}
      <div className="flex items-center gap-1">
        {workspaces.map((workspace) => {
          const Icon = workspace.icon;
          const isActive = location.pathname.startsWith(workspace.path);
          
          return (
            <Link
              key={workspace.path}
              to={workspace.path}
              className={cn(
                "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden md:inline">{workspace.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Command Palette Trigger */}
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground"
          onClick={() => {
            // TODO: Implement command palette
            console.log("Open command palette");
          }}
        >
          <Search className="h-4 w-4" />
          <kbd className="hidden rounded bg-muted px-2 py-0.5 text-xs font-mono lg:inline-block">
            ⌘K
          </kbd>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <User className="h-4 w-4" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
