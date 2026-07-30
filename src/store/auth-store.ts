"use client";

import { create } from "zustand";

type AuthStore = {
  isAuthenticated: boolean;
  selectedRole: string | null;
  login: () => void;
  logout: () => void;
  setSelectedRole: (role: string | null) => void;
};

// Initial state reading from localStorage if available
const getInitialAuth = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("ascend_isAuthenticated") === "true";
  }
  return false;
};

const getInitialRole = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("ascend_selectedRole");
  }
  return null;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: getInitialAuth(),
  selectedRole: getInitialRole(),
  login: () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ascend_isAuthenticated", "true");
    }
    set({ isAuthenticated: true });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("ascend_isAuthenticated");
      localStorage.removeItem("ascend_selectedRole");
    }
    set({ isAuthenticated: false, selectedRole: null });
  },
  setSelectedRole: (role) => {
    if (typeof window !== "undefined") {
      if (role) {
        localStorage.setItem("ascend_selectedRole", role);
      } else {
        localStorage.removeItem("ascend_selectedRole");
      }
    }
    set({ selectedRole: role });
  },
}));
