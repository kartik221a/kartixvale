"use client";

import { useState, useEffect, useCallback } from "react";

// ============================================================
// Reading list hook — localStorage-backed save-for-later list
// Stores book titles + article slugs as a unified list.
// ============================================================

export interface ReadingListItem {
  kind: "book" | "article";
  slug: string; // book title slug or article slug
  title: string;
  href: string;
  addedAt: number; // epoch ms
}

const STORAGE_KEY = "kartixvale:reading-list";

function readFromStorage(): ReadingListItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item.kind === "string" &&
        typeof item.slug === "string" &&
        typeof item.title === "string" &&
        typeof item.href === "string"
    );
  } catch {
    return [];
  }
}

function writeToStorage(items: ReadingListItem[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    // Notify other components (same-tab + cross-tab)
    window.dispatchEvent(new CustomEvent("kartixvale:reading-list-changed"));
  } catch {
    // localStorage might be full or disabled — fail silently
  }
}

export function useReadingList() {
  const [items, setItems] = useState<ReadingListItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load on mount
  useEffect(() => {
    setItems(readFromStorage());
    setMounted(true);

    // Listen for cross-component changes (same tab)
    const onStorageChange = () => {
      setItems(readFromStorage());
    };
    window.addEventListener("kartixvale:reading-list-changed", onStorageChange);
    // Listen for cross-tab changes
    window.addEventListener("storage", onStorageChange);

    return () => {
      window.removeEventListener("kartixvale:reading-list-changed", onStorageChange);
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  const addItem = useCallback((item: Omit<ReadingListItem, "addedAt">) => {
    const current = readFromStorage();
    // Avoid duplicates
    if (current.some((i) => i.kind === item.kind && i.slug === item.slug)) {
      return false;
    }
    const newItem: ReadingListItem = { ...item, addedAt: Date.now() };
    const updated = [newItem, ...current];
    writeToStorage(updated);
    return true;
  }, []);

  const removeItem = useCallback((kind: "book" | "article", slug: string) => {
    const current = readFromStorage();
    const updated = current.filter(
      (i) => !(i.kind === kind && i.slug === slug)
    );
    writeToStorage(updated);
  }, []);

  const isSaved = useCallback(
    (kind: "book" | "article", slug: string) => {
      return items.some((i) => i.kind === kind && i.slug === slug);
    },
    [items]
  );

  const toggleItem = useCallback(
    (item: Omit<ReadingListItem, "addedAt">) => {
      if (isSaved(item.kind, item.slug)) {
        removeItem(item.kind, item.slug);
        return false; // removed
      } else {
        addItem(item);
        return true; // added
      }
    },
    [isSaved, addItem, removeItem]
  );

  const clearAll = useCallback(() => {
    writeToStorage([]);
  }, []);

  return {
    items,
    mounted,
    count: items.length,
    addItem,
    removeItem,
    isSaved,
    toggleItem,
    clearAll,
  };
}
