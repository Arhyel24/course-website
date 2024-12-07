"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";

interface CourseProgressButtonProps {
  courseId: string;
  nextChapterId?: string | null;
}

export const CourseProgressButton = ({
  courseId,
  nextChapterId,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      router.push(`/courses/${courseId}/chapters/${nextChapterId}`);

      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = CheckCircle;

  return (
    <Button
      onClick={onClick}
      disabled={isLoading || !nextChapterId}
      type="button"
      variant="outline"
      className="w-full md:w-auto"
    >
      {!nextChapterId ? "Completed" : "Next chapter"}
      <Icon className="ml-2 h-4 w-4" />
    </Button>
  );
};
