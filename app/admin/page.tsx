import AdminComponent from "./component";

export default async function Admin() {
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

  return <AdminComponent users={users.users} />;
}
