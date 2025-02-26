import { ArrowDown, ArrowUp, Gem, Home, Key, Settings } from "lucide-react";

import { SidebarCategory } from "@/lib/types/support/event-category";
import { SortItem } from "@/lib/types/types";

export const CART_COOKIE_KEY = "cartToken" as const;
export const SIGN_OUT_KEY = "signOut";
export const CART_LOCALSTORAGE = "cart" as const;

export const DEFAULT_COMPONENT_SIZE = 10 as const;
export const DEFAULT_PRODUCT_SIZE = 10 as const;
export const DEFAULT_PRODUCT_NUMBER_PAGE = 1 as const;

export const MIN_PRICE = 0 as const;
export const MAX_PRICE = 3000 as const;
export const PRICE_STEP = 10 as const;

export const CHECKBOX_ITEMS_LIMIT = 5 as const;

export const GET_ID_KEY = "variant" as const;
export const DEFAULT_EMPTY_PRODUCT_IMAGE =
  "/products/default_product_img.png" as const;

export const DEFAULT_TYPES_LIMIT = 6 as const;

export const LOCALE_COOKIE_KEY = "mainly_local" as const;
export const DEFAULT_LOCALE = "en" as const;

export const COLOR_OPTIONS = [
  "#FF6B6B", // bg-[#FF6B6B] ring-[#FF6B6B] Bright Red
  "#4ECDC4", // bg-[#4ECDC4] ring-[#4ECDC4] Teal
  "#45B7D1", // bg-[#45B7D1] ring-[#45B7D1] Sky Blue
  "#FFA07A", // bg-[#FFA07A] ring-[#FFA07A] Light Salmon
  "#98D8C8", // bg-[#98D8C8] ring-[#98D8C8] Seafoam Green
  "#FDCB6E", // bg-[#FDCB6E] ring-[#FDCB6E] Mustard Yellow
  "#6C5CE7", // bg-[#6C5CE7] ring-[#6C5CE7] Soft Purple
  "#FF85A2", // bg-[#FF85A2] ring-[#FF85A2] Pink
  "#2ECC71", // bg-[#2ECC71] ring-[#2ECC71] Emerald Green
  "#E17055", // bg-[#E17055] ring-[#E17055] Terracotta
] as const;

export const EMOJI_OPTIONS = [
  { emoji: "💰", label: "Money (Sale)" },
  { emoji: "👤", label: "User (Sign-up)" },
  { emoji: "🎉", label: "Celebration" },
  { emoji: "📅", label: "Calendar" },
  { emoji: "🚀", label: "Launch" },
  { emoji: "📢", label: "Announcement" },
  { emoji: "🎓", label: "Graduation" },
  { emoji: "🏆", label: "Achievement" },
  { emoji: "💡", label: "Idea" },
  { emoji: "🔔", label: "Notification" },
] as const;

export const SIDEBAR_ITEMS: SidebarCategory[] = [
  {
    category: "Overview",
    items: [{ href: "/support/dashboard", icon: Home, text: "Dashboard" }],
  },
  {
    category: "Account",
    items: [{ href: "/support/dashboard/upgrade", icon: Gem, text: "Upgrade" }],
  },
  {
    category: "Settings",
    items: [
      { href: "/support/dashboard/api-key", icon: Key, text: "API Key" },
      {
        href: "/support/dashboard/account-settings",
        icon: Settings,
        text: "Account Settings",
      },
    ],
  },
] as const;

export const SUPPORT_FREE_LIMIT = {
  maxEventsPerMonth: 100,
  maxEventsCategories: 3,
} as const;

export const SUPPORT_PRO_LIMIT = {
  maxEventsPerMonth: 1000,
  maxEventsCategories: 10,
} as const;

export const BLOCK_DURATION = 3600000 as const;
export const ATTEMPT_LIMIT = 5 as const;

export const TELEGRAM_AUTH = "/auth" as const;
export const TELEGRAM_COMMANDS: Record<string, string> = {
  [TELEGRAM_AUTH]: "message: `/auth <YOUR_SUPPORT_TOKEN>`",
};
export const TIME_RANGE_LABELS = {
  today: "today",
  week: "this week",
  month: "this month",
};

export const SORT_KEY = "sort" as const;

export const SORT_TYPES: SortItem[] = [
  {
    value: "price_asc",
    label: "Price",
    icon: ArrowUp,
  },
  {
    value: "price_desc",
    label: "Price",
    icon: ArrowDown,
  },
  {
    value: "new_asc",
    label: "New",
    icon: ArrowUp,
  },
  {
    value: "new_desc",
    label: "New",
    icon: ArrowDown,
  },
];
