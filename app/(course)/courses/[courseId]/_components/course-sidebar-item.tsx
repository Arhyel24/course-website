"use client";

import { PlayCircleIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type CourseSidebarItemProps = {
  id: string;
  label: string | null;
  courseId: string;
};

export default function CourseSidebarItem({
  id,
  label,
  courseId,
}: CourseSidebarItemProps) {
  const pathname = usePathname();
  const router = useRouter();

  const Icon = PlayCircleIcon;

  const isActive = pathname?.includes(id);

  const onClick = () => {
    router.push(`/courses/${courseId}/chapters/${id}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 pl-6 text-sm font-medium transition-all",
        isActive
          ? "bg-slate-300/20 text-slate-700 dark:bg-slate-600/20 dark:text-slate-200"
          : "text-slate-500 hover:bg-slate-300/20 hover:text-slate-600 dark:text-slate-400 hover:dark:bg-slate-600/20 hover:dark:text-slate-200"
      )}
    >
      <div className="flex gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("transition-colors", {
            "text-slate-700 dark:text-slate-200": isActive,
            "text-slate-500 dark:text-slate-400": !isActive,
          })}
        />
        {label}
      </div>

      <div
        className={cn(
          "ml-auto h-full border-2 transition-all",
          isActive
            ? "border-slate-700 dark:border-slate-200 opacity-100"
            : "border-transparent opacity-0"
        )}
      />
    </button>
  );
}
