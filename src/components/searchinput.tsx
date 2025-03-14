/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import * as React from "react";
import { useEffect, useId, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  LoaderCircle,
  Search,
  Eye,
  MessageSquare,
  Heart,
  Instagram,
  Twitter,
  Film,
  Youtube,
  Clock,
  MapPin,
  Box,
  Lock,
} from "lucide-react";
import { ChartPieIcon } from "./ui/chart-pie";
import { SettingsIcon } from "./ui/settings";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { youtubeSearch } from "@/lib/youtube-api";
import { VideoItem } from "@/lib/youtube-api";

export interface LocalVideoItem {
  kind: string;
  duration: number;
  views: string;
  comments: string;
  likes: string;
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
  channelTitle: string;
}

interface Filters {
  platforms?: string[];
  uploadDate?: string;
  type?: string;
  features?: string[];
  sortBy?: string;
  cardNumber?: string;
}

const FILTER_OPTIONS = {
  platforms: {
    type: "multiple" as const,
    options: ["تردز", "اینستاگرام", "X (توییتر)", "تیک تاک", "یوتوب"] as const,
  },
  uploadDate: {
    type: "single" as const,
    options: [
      "یک ساعت گذشته",
      "امروز",
      "این هفته",
      "این ماه",
      "امسال",
    ] as const,
  },
  type: {
    type: "single" as const,
    options: ["کانال", "کوتاه", "بلند"] as const,
  },
  features: {
    type: "multiple" as const,
    options: [
      "زنده",
      "۴K",
      "HD",
      "زیرنویس/متن",
      "کپی‌رایت آزاد",
      "۳۶۰ درجه",
    ] as const,
  },
  sortBy: {
    type: "single" as const,
    options: ["تعداد بازدید", "تعداد نظرات", "تعداد لایک‌ها"] as const,
  },
  cardNumber: {
    type: "single" as const,
    options: ["10", "20", "30"] as const,
  },
};

type FilterOptionKeys = keyof typeof FILTER_OPTIONS;

const FILTER_LABELS: Record<FilterOptionKeys, string> = {
  platforms: "پلتفرم‌ها",
  uploadDate: "تاریخ آپلود",
  type: "نوع",
  features: "ویژگی‌ها",
  sortBy: "مرتب‌سازی بر اساس",
  cardNumber: "تعداد کارت‌ها",
};

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  تردز: MessageSquare,
  اینستاگرام: Instagram,
  "X (توییتر)": Twitter,
  "تیک تاک": Film,
  یوتوب: Youtube,
};

const PLATFORM_COLORS: Record<string, string> = {
  تردز: "#1DA1F2",
  اینستاگرام: "#E1306C",
  "X (توییتر)": "#1DA1F2",
  "تیک تاک": "#69C9D0",
  یوتوب: "#FF0000",
};

const SORT_ICONS: Record<string, React.ElementType> = {
  "تعداد بازدید": Eye,
  "تعداد نظرات": MessageSquare,
  "تعداد لایک‌ها": Heart,
};

type SortableKeys = "views" | "comments" | "likes";
const SORT_KEYS: Record<string, SortableKeys> = {
  "تعداد بازدید": "views",
  "تعداد نظرات": "comments",
  "تعداد لایک‌ها": "likes",
};

const FEATURE_ICONS: Record<string, React.ElementType> = {
  زنده: Clock,
  "۴K": Box,
  HD: Box,
  "زیرنویس/متن": MessageSquare,
  "کپی‌رایت آزاد": Lock,
  "۳۶۰ درجه": MapPin,
};

const TYPE_ICONS: Record<string, React.ElementType> = {
  کانال: Box,
  کوتاه: Film,
  بلند: Film,
};

const CustomToggleGroup = ToggleGroup as React.FC<{
  type: "single" | "multiple";
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  variant: "outline";
  className: string;
  children: React.ReactNode;
}>;

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQueryList.addEventListener("change", listener);
    setMatches(mediaQueryList.matches);
    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [query]);
  return matches;
}

function FilterMenu({
  onApplyFilters,
}: {
  onApplyFilters: (filters: Filters) => void;
}) {
  const [uploadDate, setUploadDate] = useState<string>("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "یوتوب",
  ]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("10");

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const applyFilters = () => {
    let newFilters: Filters;
    if (selectedType === "کانال") {
      // When 'کانال' is selected, ignore all other filters.
      newFilters = { type: "کانال", cardNumber };
    } else {
      newFilters = {
        platforms: selectedPlatforms,
        uploadDate,
        type: selectedType,
        features: selectedFeatures,
        sortBy,
        cardNumber,
      };
    }
    const cleanedFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([_, v]) =>
        Array.isArray(v) ? v.length > 0 : Boolean(v),
      ),
    ) as Filters;
    onApplyFilters(cleanedFilters);
  };

  const renderFilterGroup = (
    key: FilterOptionKeys,
    label: string,
    items: readonly string[],
    value: string | string[],
    onChange: (value: string | string[]) => void,
    type: "single" | "multiple",
  ) => {
    return (
      <div className="space-y-2 px-1 flex flex-col justify-center items-start text-right">
        <h4 className="text-sm font-medium">{label}</h4>
        <CustomToggleGroup
          type={type}
          value={value}
          onValueChange={onChange}
          variant="outline"
          className="flex flex-wrap justify-end items-start text-right gap-1"
        >
          {items.map((item) => {
            let IconComponent: React.ElementType | null = null;
            let iconColor = "currentColor";

            if (key === "platforms") {
              IconComponent = PLATFORM_ICONS[item];
              iconColor = PLATFORM_COLORS[item];
            } else if (key === "sortBy") {
              IconComponent = SORT_ICONS[item];
            } else if (key === "features") {
              IconComponent = FEATURE_ICONS[item];
            } else if (key === "type") {
              IconComponent = TYPE_ICONS[item];
            }

            return (
              <ToggleGroupItem
                key={item}
                value={item}
                aria-label={`Select ${item}`}
                className="h-8 px-2 text-xs data-[state=on]:bg-primary data-[state=on]:text-primary-foreground flex items-center gap-1"
              >
                {IconComponent && (
                  <IconComponent
                    size={16}
                    color={iconColor}
                    className="inline-block"
                  />
                )}
                {item}
              </ToggleGroupItem>
            );
          })}
        </CustomToggleGroup>
      </div>
    );
  };

  const FilterContent = () => (
    <div dir="rtl" className="grid gap-4 max-h-[80vh] overflow-y-auto">
      {(Object.keys(FILTER_OPTIONS) as FilterOptionKeys[]).map((key) => {
        const config = FILTER_OPTIONS[key];
        return (
          <React.Fragment key={key}>
            {renderFilterGroup(
              key,
              FILTER_LABELS[key],
              config.options,
              key === "uploadDate"
                ? uploadDate
                : key === "sortBy"
                  ? sortBy
                  : key === "platforms"
                    ? selectedPlatforms
                    : key === "type"
                      ? selectedType
                      : key === "features"
                        ? selectedFeatures
                        : key === "cardNumber"
                          ? cardNumber
                          : "",
              (value: string | string[]) => {
                if (config.type === "single") {
                  const handler =
                    key === "uploadDate"
                      ? setUploadDate
                      : key === "sortBy"
                        ? setSortBy
                        : key === "type"
                          ? setSelectedType
                          : key === "cardNumber"
                            ? setCardNumber
                            : () => {};
                  if (typeof value === "string") {
                    handler(value);
                  }
                } else {
                  const handler =
                    key === "platforms"
                      ? setSelectedPlatforms
                      : key === "features"
                        ? setSelectedFeatures
                        : () => {};
                  if (Array.isArray(value)) {
                    handler(value);
                  }
                }
              },
              config.type,
            )}
          </React.Fragment>
        );
      })}
      <div className="sticky bottom-0 bg-background p-4 border-t">
        <Button className="w-full" onClick={applyFilters}>
          اعمال فیلترها
        </Button>
      </div>
    </div>
  );

  return isDesktop ? (
    <Popover>
      <PopoverTrigger asChild>
        <button className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center">
          <SettingsIcon size={20} />
        </button>
      </PopoverTrigger>
      <PopoverContent dir="rtl" className="w-[80vw] max-w-3xl" align="end">
        <FilterContent />
      </PopoverContent>
    </Popover>
  ) : (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center">
          <SettingsIcon size={20} />
        </button>
      </DrawerTrigger>
      <DrawerContent dir="rtl" className="max-h-[90vh]">
        <FilterContent />
      </DrawerContent>
    </Drawer>
  );
}

export default function SearchInput({
  onSearch,
}: {
  onSearch: (results: VideoItem[]) => void;
}) {
  const id = useId();
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [filters, setFilters] = useState<Filters>({});

  const performSearch = async () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    try {
      const maxResults = parseInt(filters.cardNumber || "10", 10);
      const results = await youtubeSearch(inputValue, maxResults, filters);

      const filteredResults: VideoItem[] = results.filter((item) => {
        if (filters.type === "کانال") return item.kind === "youtube#channel";
        if (filters.type === "کوتاه") return item.duration <= 60;
        if (filters.type === "بلند") return item.duration > 300;
        return true;
      });

      if (filters.sortBy) {
        const sortKey = SORT_KEYS[filters.sortBy];
        if (sortKey) {
          filteredResults.sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];
            if (typeof aValue === "string" && typeof bValue === "string") {
              return (
                parseFormattedNumber(bValue) - parseFormattedNumber(aValue)
              );
            }
            return 0;
          });
        }
      }
      const mappedResults: LocalVideoItem[] = filteredResults.map((item) => ({
        ...item,
        id: item.id || "",
        title: item.title || "",
        description: item.description || "",
        publishedAt: item.publishedAt || "",
        thumbnail: item.thumbnail || "",
        url: item.url || "",
        channelTitle: item.channelTitle || "",
      }));

      onSearch(mappedResults);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delaySearch = setTimeout(performSearch, 500);
    return () => clearTimeout(delaySearch);
  }, [inputValue, filters]);

  return (
    <div
      className={`space-y-2 flex flex-col relative ${
        isFocused ? "backdrop-blur-sm" : ""
      }`}
      dir="rtl"
    >
      <Label
        htmlFor={id}
        className={`transition-all duration-300 ${
          isFocused
            ? "opacity-0 translate-y-[-12px]"
            : "opacity-100 translate-y-0"
        }`}
      >
        {filters.type === "کانال" ? "جستجوی کانال" : "جستجوی پیشرفته"}
      </Label>
      <div className="flex flex-row">
        <div className="relative w-full ml-1">
          <Input
            id={id}
            className="peer pe-9 ps-9"
            placeholder={
              filters.type === "کانال"
                ? "نام کانال را جستجو کنید..."
                : "جستجو کنید..."
            }
            type="search"
            value={inputValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            {isLoading ? (
              <LoaderCircle className="animate-spin" size={16} />
            ) : (
              <Search size={16} />
            )}
          </div>
          <FilterMenu onApplyFilters={setFilters} />
        </div>
        <Button className="h-9" variant="outline" size="icon">
          <ChartPieIcon />
        </Button>
      </div>
    </div>
  );
}

// Helper function to parse formatted numbers (e.g., "1,234" -> 1234)
function parseFormattedNumber(value: string): number {
  return Number(value.replace(/,/g, "")) || 0;
}
