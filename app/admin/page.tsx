"use client";

import { Button, Label, Modal, TextInput } from "flowbite-react";
import { UserCard } from "@/components/admin/user-card";
import { NavBar } from "@/components/navbar";
import { UsersTable } from "@/components/admin/user-table";
import { useEffect, useState } from "react";
import { MyFooter } from "@/components/footer";
import toast from "react-hot-toast";
import axios from "axios";
import User, { IUser } from "../models/userModel";

export default function Admin() {
  const [tab, setTab] = useState("table");
  const [enrolUser, setEnrolUser] = useState(false);
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);

  function onCloseUserModal() {
    setEnrolUser(false);
    setEmail("");
  }

  async function getUsers() {
    try {
      const response = await User.find();
      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  async function signUp() {
    const randomSuffix = Math.floor(Math.random() * 10000);
    const username = `user${randomSuffix}`;

    const password = "12345678"; // Fixed password

    try {
      const res = await axios.post("/api/userexist", { email });

      if (!res) {
        toast.error("User already exist");
        return;
      }

      await axios.post("/api/signup", {
        username,
        email,
        password,
      });

      toast.success("User Enrolled successfully!");
      setEnrolUser(false);
      getUsers();
      // console.log('Sign-up successful:', response.data);
    } catch (error) {
      console.error("Error during sign-up:", error);
      toast.error("Failed to enrol user");
    }
  }

  // const users = [
  //   {
  //     username: "johndoe",
  //     email: "john.doe@example.com",
  //     image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
  //   },
  //   {
  //     username: "sarahjones",
  //     email: "sarah.jones@example.com",
  //     image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
  //   },
  //   {
  //     username: "mikebrown",
  //     email: "mike.brown@example.com",
  //     image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
  //   },
  //   {
  //     username: "emilywang",
  //     email: "emily.wang@example.com",
  //     image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
  //   },
  //   {
  //     username: "alexlee",
  //     email: "alex.lee@example.com",
  //     image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
  //   },
  // ];

  const tableView = () => {
    setTab("table");
  };

  const listView = () => {
    setTab("card");
  };

  return (
    <>
      <NavBar />
      <div className="px-8 py-6">
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
        {tab === "table" ? (
          <UsersTable users={users} />
        ) : (
          <div className="flex flex-wrap gap-6 pt-6 pb-6">
            {users.map((user) => (
              <UserCard key={user.username} user={user} />
            ))}
          </div>
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
              <Button onClick={signUp}>Enrol</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
