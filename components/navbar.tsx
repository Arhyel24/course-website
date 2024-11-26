"use client";

import { Avatar, DarkThemeToggle, Dropdown, Navbar } from "flowbite-react";
import Image from "next/image";
import { Button, Label, Modal, TextInput, FileInput } from "flowbite-react";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { isTeacher } from "@/lib/teacher";
import toast from "react-hot-toast";

export function NavBar() {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const { data: session } = useSession();

  const isAdmin = isTeacher(session?.user?.email);

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
    setNewPassword("");
    setRepeatPassword("");
    setError(""); // Clear error message on close
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    setError("");

    if (newPassword !== repeatPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("/api/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: session?.user.email,
          password: newPassword,
        }),
      });

      if (!response.ok) {
        toast.error("Failed to update details");
      }

      onCloseModal();

      toast.success("Password updated successfully!");
    } catch (error) {
      setError("An error occurred while updating the password.");
    }
  };

  return (
    <Navbar
      fluid
      rounded
      className="bg-white dark:bg-gray-800 fixed w-full z-1000"
    >
      <Navbar.Brand href="/">
        <Image
          width={30}
          height={30}
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          className="mr-3 h-6 sm:h-9"
          alt="miam affiliate"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          MIAM Affiliate
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 gap-2">
        <DarkThemeToggle />
        {!session ? (
          <Button href="/login">Login</Button>
        ) : (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User  settings"
                img={
                  session?.user?.image ||
                  "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                }
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm dark:text-gray-200">
                {session?.user?.name}
              </span>
              <span className="block truncate text-sm font-medium dark:text-gray-400">
                {session?.user?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item href="/">Dashboard</Dropdown.Item>
            {isAdmin && (
              <>
                <Dropdown.Item href="/view/admin">View users</Dropdown.Item>
                <Dropdown.Item href="/view/courses">View Courses</Dropdown.Item>
              </>
            )}
            <Dropdown.Item
              href="/user/profile"
              onClick={() => setOpenModal(true)}
            >
              Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
          </Dropdown>
        )}
      </div>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex w-full items-center justify-center">
              <Label
                htmlFor="dropzone-file"
                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <FileInput id="dropzone-file" className="hidden" />
              </Label>
            </div>
            <form className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="username" value="Username" />
                </div>
                <TextInput
                  id="username"
                  type="text"
                  value={session?.user.name || "null"}
                  placeholder="Username"
                  required
                  shadow
                  className="dark:bg-gray-700 dark:text-gray-200"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="New Password" />
                </div>

                <TextInput
                  id="password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  shadow
                  className="dark:bg-gray-700 dark:text-gray-200"
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="repeat-password" value="Repeat Password" />
                </div>
                <TextInput
                  id="repeat-password"
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  required
                  shadow
                  className="dark:bg-gray-700 dark:text-gray-200"
                />
              </div>

              <Button type="submit">Update details</Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
}
