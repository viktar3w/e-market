"use client";
import { Component } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

import { API } from "@/lib/services/api-client";

export const useComponents = (ids: string[]) => {
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedIds, { toggle }] = useSet(new Set<string>(ids));
  useEffect(() => {
    setLoading(true);
    try {
      API.components
        .search("")
        .then((components) => {
          setComponents(components);
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
          console.log("[ERROR] useComponents: Something was wrong");
          setLoading(false);
        });
    } catch (e) {
      setError(e);
      console.log("[ERROR] useComponents: Something was wrong");
      setLoading(true);
    }
  }, []);
  return {
    addId: toggle,
    selectedIds,
    error,
    loading,
    components,
  };
};
