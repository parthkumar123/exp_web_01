"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function useAdminAuth() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin/login") {
      return;
    }

    // Check if user is authenticated
    const token = localStorage.getItem("adminAuth");

    if (!token) {
      router.push("/admin/login");
    }
  }, [pathname, router]);

  const logout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  return { logout };
}
