"use client";
import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 9.75 12 4l9 5.75V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
    ),
  },
  {
    href: "/insights",
    label: "Insights",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5"/><path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5"/></svg>
    ),
  },
  {
    href: "/profile",
    label: "Profile",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="currentColor" strokeWidth="1.5"/></svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#181024] border-t border-gray-200 dark:border-gray-800 flex justify-around items-center h-14 z-30 shadow-sm">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        if (item.href === "/profile") {
          return (
            <div key={item.href} className="flex flex-col items-center justify-center gap-1">
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 text-xs font-medium transition text-gray-600 dark:text-gray-300 ${isActive ? "text-[#470137] dark:text-[#ff61f6]" : "hover:text-[#470137] dark:hover:text-[#ff61f6]"}`}
              >
                {item.icon}
                {item.label}
              </Link>
              {isActive && (
                <div className="mt-1">
                  <ThemeSwitcher />
                </div>
              )}
            </div>
          );
        }
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 text-xs font-medium transition text-gray-600 dark:text-gray-300 ${isActive ? "text-[#470137] dark:text-[#ff61f6]" : "hover:text-[#470137] dark:hover:text-[#ff61f6]"}`}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
