"use client";

import { useSyncExternalStore } from "react";

interface ScrollVisibilityState {
  isVisible: boolean;
  isScrolled: boolean;
  isContactOpen: boolean;
}

let scrollState: ScrollVisibilityState = {
  isVisible: true,
  isScrolled: false,
  isContactOpen: false,
};

const listeners = new Set<() => void>();
let isListening = false;
let lastScrollY = 0;
let lastDirectionChangeY = 0;
let lastScrollDirection: "up" | "down" | "none" = "none";
let ticking = false;

function notify() {
  listeners.forEach((listener) => listener());
}

/**
 * Updates the global contact popup open state so related floating
 * elements can dynamically adapt their vertical position.
 */
export function setContactPopupOpen(isOpen: boolean) {
  if (scrollState.isContactOpen !== isOpen) {
    scrollState = {
      ...scrollState,
      isContactOpen: isOpen,
    };
    notify();
  }
}

function updateScrollState() {
  if (typeof window === "undefined") return;

  const currentScrollY = Math.max(0, window.scrollY);
  const isScrolled = currentScrollY > 20;
  const delta = currentScrollY - lastScrollY;

  let isVisible = scrollState.isVisible;

  // 1. Near the top of the page (within 60px), elements are always visible
  if (currentScrollY <= 60) {
    isVisible = true;
    lastDirectionChangeY = currentScrollY;
    lastScrollDirection = "none";
  }
  // 2. Prevent jitter when reaching bottom rubber-band on iOS/macOS
  else if (
    window.innerHeight + currentScrollY >=
    document.documentElement.scrollHeight - 15
  ) {
    // Keep current visibility state
  }
  // 3. Scrolling down
  else if (delta > 0) {
    if (lastScrollDirection !== "down") {
      lastScrollDirection = "down";
      lastDirectionChangeY = lastScrollY;
    }
    // If scrolled down by at least 15px since direction change and past top margin: hide
    if (currentScrollY - lastDirectionChangeY > 15 && currentScrollY > 60) {
      isVisible = false;
    }
  }
  // 4. Scrolling up
  else if (delta < 0) {
    if (lastScrollDirection !== "up") {
      lastScrollDirection = "up";
      lastDirectionChangeY = lastScrollY;
    }
    // If scrolled up by at least 10px since direction change: show
    if (lastDirectionChangeY - currentScrollY > 10) {
      isVisible = true;
    }
  }

  lastScrollY = currentScrollY;
  ticking = false;

  if (
    isVisible !== scrollState.isVisible ||
    isScrolled !== scrollState.isScrolled
  ) {
    scrollState = { ...scrollState, isVisible, isScrolled };
    notify();
  }
}

function handleScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(updateScrollState);
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  if (!isListening && typeof window !== "undefined") {
    isListening = true;
    lastScrollY = Math.max(0, window.scrollY);
    lastDirectionChangeY = lastScrollY;
    lastScrollDirection = "none";
    scrollState = {
      ...scrollState,
      isVisible: true,
      isScrolled: lastScrollY > 20,
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  return () => {
    listeners.delete(callback);
    if (listeners.size === 0 && typeof window !== "undefined") {
      isListening = false;
      window.removeEventListener("scroll", handleScroll);
    }
  };
}

function getSnapshot(): ScrollVisibilityState {
  return scrollState;
}

function getServerSnapshot(): ScrollVisibilityState {
  return { isVisible: true, isScrolled: false, isContactOpen: false };
}

/**
 * Shared hook that provides synchronized scroll visibility, scrolled state,
 * and contact popup status.
 * Uses direction-accumulated delta thresholds with RAF throttling across all subscribers.
 */
export function useAutoScrollHide(): ScrollVisibilityState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
