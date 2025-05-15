import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  Target,
  FileText,
  PenTool,
  LayoutDashboard,
  DollarSign,
  LogOut,
  Bell,
} from "lucide-react";
import { useAdminStore } from "../store/adminStore";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Missions", href: "/admin/missions", icon: Target },
  { name: "Documents", href: "/admin/documents", icon: FileText },
  { name: "Blog", href: "/admin/blog", icon: PenTool },
  { name: "Payments", href: "/admin/payments", icon: DollarSign },
  { name: "Notifications", href: "/admin/notifications", icon: Bell },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdminStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto">
          <div className="flex items-center justify-between flex-shrink-0 px-4">
            <span className="text-xl font-semibold text-primary-DEFAULT">
              Admin Panel
            </span>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-gray-500"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? "bg-primary-light text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-gray-500"
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 pb-8">
          <div className="mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
