"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function useStoreUser() {
  const { isAuthenticated, isLoading: convexLoading } = useConvexAuth();
  const { user, isLoaded } = useUser();

  const storeUser = useMutation(api.users.store);
  const [userId, setUserId] = useState(null); // ✅ FIXED

  useEffect(() => {
    if (!isLoaded || !isAuthenticated) return;

    async function createUser() {
      const id = await storeUser();
      setUserId(id);
    }

    createUser();
  }, [isLoaded, isAuthenticated, storeUser, user?.id]);

  return {
    isLoading: convexLoading || (isAuthenticated && userId === null),
    isAuthenticated: isAuthenticated && userId !== null,
    userId,
  };
}
