import toast from "react-hot-toast";
import AdminComponent from "./component";
import { getUsers } from "@/actions/get-users";

export default async function Admin() {
  const apiUrl = `${process.env.NEXTAUTH_URL}/api/getallusers`;
  const usersResponse = await fetch(apiUrl, { method: "GET" });

  // Check if the response is OK
  if (!usersResponse.ok) {
    toast.error("Failed to get users");
  }

  const users = await usersResponse.json();

  if (!users) {
    toast.error("Failed to load users");
  }
  // const users = await getUsers();

  return <AdminComponent users={users.users} />;
}
