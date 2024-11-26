import { getServerSession } from "next-auth";
import AdminComponent from "./component";
import authOptions from "@/lib/AuthOptions";
import { redirect } from "next/navigation";
import { isTeacher } from "@/lib/teacher";
import { NavBar } from "@/components/navbar";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const isAdmin = isTeacher(session?.user?.email);

  if (!isAdmin) redirect("/");

  const apiUrl = `${process.env.NEXTAUTH_URL}/api/getallusers`;
  const usersResponse = await fetch(apiUrl, { method: "GET" });

  // Check if the response is OK
  if (!usersResponse.ok) {
    console.error("Failed to get users");
  }

  const users = await usersResponse.json();

  if (!users) {
    console.error("Failed to load users");
  }
  // const users = await getUsers();

  return (
    <>
      <NavBar />
      <AdminComponent users={users.users} />
    </>
  );
}
