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
        "flex items-center gap-x-2 pl-6 text-sm font-medium text-slate-500 transition-all hover:bg-slate-300/20 hover:text-slate-600 bg-slate-200/20 text-slate-700 hover:bg-slate-200/20 hover:text-slate-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-slate-500", { "text-slate-700": isActive })}
        />
        {label}
      </div>

      <div
        className={cn(
          "ml-auto h-full border-2 border-slate-700 opacity-0 transition-all",
          {
            "opacity-100": isActive,
          }
        )}
      />
    </button>
  );
}
