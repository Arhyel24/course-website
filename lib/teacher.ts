export function isTeacher(email?: string | null) {
  const teacher = process.env.NEXT_PUBLIC_TEACHER_ID as string;

  return email === teacher;
}
