"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { isAdminSessionValid, clearAdminSession, getRemainingMs } from "@/lib/adminAuth";

export function useAdminAuth() {
  const router = useRouter();

  useEffect(() => {
    // If no valid session flag in this tab, force login
    if (!isAdminSessionValid()) {
      clearAdminSession();
      supabase.auth.signOut();
      router.replace("/admin/login");
      return;
    }

    // Auto-logout when the 5-minute window expires
    const remaining = getRemainingMs();
    const timer = setTimeout(async () => {
      clearAdminSession();
      await supabase.auth.signOut();
      router.replace("/admin/login");
    }, remaining);

    return () => clearTimeout(timer);
  }, [router]);
}
