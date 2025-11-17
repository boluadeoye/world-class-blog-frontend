// src/lib/apiClient.js
// Minimal client helpers for admin auth using plain fetch (no react-query)

import { useState, useCallback } from "react";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://project-blog-backend-beta.vercel.app/api").replace(/\/$/, "");

async function apiFetch(path, { method = "GET", headers = {}, body, ...rest } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });

  let data = null;
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    data = await res.json();
  } else {
    const txt = await res.text();
    try {
      data = txt ? JSON.parse(txt) : null;
    } catch {
      data = txt;
    }
  }

  if (!res.ok) {
    const err = new Error(data?.error || data?.message || res.statusText || "Request failed");
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

// Hook signature mimics react-query's mutate API for compatibility
export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setErrorFlag] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (payload, options = {}) => {
    setLoading(true);
    setErrorFlag(false);
    setError(null);
    try {
      // Backend only requires password; we pass both to stay compatible with your UI
      await apiFetch("/auth/login", { method: "POST", body: payload });
      options.onSuccess?.();
    } catch (e) {
      setErrorFlag(true);
      setError(e);
      options.onError?.(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { mutate, isLoading, isError: isError, error };
}

export function useLogout() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setErrorFlag] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (_ = null, options = {}) => {
    setLoading(true);
    setErrorFlag(false);
    setError(null);
    try {
      await apiFetch("/auth/logout", { method: "POST" });
      options.onSuccess?.();
    } catch (e) {
      setErrorFlag(true);
      setError(e);
      options.onError?.(e);
    } finally {
      setLoading(false);
    }
  }, []);

  return { mutate, isLoading, isError: isError, error };
}