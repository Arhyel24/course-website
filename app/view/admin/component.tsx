"use client";

import { Card, Button, Label, Modal, TextInput, Spinner } from "flowbite-react";
import { UserCard } from "@/components/admin/user-card";
import { NavBar } from "@/components/navbar";
import { UsersTable } from "@/components/admin/user-table";
import { Suspense, useState } from "react";
import { MyFooter } from "@/components/footer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AdminComponent({ users }) {
  const [tab, setTab] = useState("table");
  const [enrolUser, setEnrolUser] = useState(false);
  const [email, setEmail] = useState("");
  const [registering, setRegistering] = useState(false);

  const router = useRouter();

  function onCloseUserModal() {
    setEnrolUser(false);
    setEmail("");
  }

  async function signUp() {
    setRegistering(true);
    const randomSuffix = Math.floor(Math.random() * 10000);
    const username = `user${randomSuffix}`;
    const password = "12345678"; // Fixed password
    const image =
      "https://flowbite.com/docs/images/people/profile-picture-2.jpg";

    try {
      // Check if the user already exists
      const userExistResponse = await fetch("/api/userexist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // Check if the response is OK
      if (!userExistResponse.ok) {
        console.error("Failed to check user existence");
        return;
      }

      const userExistData = await userExistResponse.json();

      // Assuming the API returns a boolean or an object indicating existence
      if (userExistData.exists) {
        toast.error("User  already exists");
        return;
      }

      // Proceed to sign up the user
      const signUpResponse = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          image,
        }),
      });

      if (!signUpResponse.ok) {
        toast.error("Failed to sign up user");
        return;
      }

      // Proceed to sign up the user
      const emailResponse = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (!emailResponse.ok) {
        toast.error("Failed to send email");
        return;
      }

      toast.success("User  enrolled successfully!");
      setRegistering(false);
      setEnrolUser(false);
      router.refresh();
    } catch (error) {
      console.error("Error during sign-up:", error);
      toast.error("Failed to enroll user");
    }
  }

  const tableView = () => setTab("table");
  const listView = () => setTab("card");

  return (
    <>
      <Suspense>
        <NavBar />
        <div className="px-8 py-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={tableView}
                color={tab === "table" ? "blue" : "light"}
              >
                Table view
              </Button>
              <Button
                onClick={listView}
                color={tab === "card" ? "blue" : "light"}
              >
                Card View
              </Button>
            </div>
            <Button onClick={() => setEnrolUser(true)} color="success">
              + Add user
            </Button>
          </div>
          <div className="p-4">Registered users: {users.length}</div>
          {tab === "table" ? (
            <UsersTable users={users} />
          ) : users.length > 0 ? (
            <div className="flex flex-wrap gap-6 pt-6 pb-6">
              {users.map((user) => (
                <UserCard key={user.username} user={user} />
              ))}
            </div>
          ) : (
            <Card className="w-full mt-2 bg-white dark:bg-gray-800">
              <div className="flex justify-center items-center p-4 text-gray-900 dark:text-gray-200">
                No users found!!
              </div>
            </Card>
          )}
        </div>
        <MyFooter />
        <Modal show={enrolUser} size="md" onClose={onCloseUserModal} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Enrol user
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Enter user email" />
                </div>
                <TextInput
                  id="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="w-full">
                {registering ? (
                  <Button disabled>
                    <Spinner color="info" aria-label="registering user" />
                    Enrolling...
                  </Button>
                ) : (
                  <Button onClick={signUp}>Enrol</Button>
                )}
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Suspense>
    </>
  );
}
