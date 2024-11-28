"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { FileInput, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import LoadingRing from "@/components/loading-ring";

export default function ProfileComp({ user }) {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    // Client-side validation
    if (!oldPassword || !newPassword || !repeatPassword) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    // Validate passwords
    if (newPassword !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Optional: Additional password strength validation
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          currentPassword: oldPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Password updated successfully!");

        setOldPassword("");
        setNewPassword("");
        setRepeatPassword("");

        router.refresh();
      } else {
        setError(data.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Password change error:", error);
      setError("An unexpected error occurred");
      toast.error("Unable to change password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserDetailsUpdate = async (e) => {
    e.preventDefault();
    // Here you would typically send the updated username and image to your API
    // For example:
    // const formData = new FormData();
    // formData.append("username", username);
    // if (imageFile) {
    //   formData.append("image", imageFile);
    // }
    // const response = await fetch('/api/update-user-details', { method: 'POST', body: formData });

    toast("User  details updated successfully!");
  };

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto">
      {/* User Details Section */}
      <div className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-20 w-full mb-6">
        <Image
          src={user.image}
          alt="User  Avatar"
          width={100}
          height={100}
          className="rounded-full mb-4"
        />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {user.name}
        </h2>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {user.email}
        </h2>
        <form
          className="mt-4 w-full"
          onSubmit={handleUserDetailsUpdate}
          autoComplete="off"
        >
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <FileInput
                id="dropzone-file"
                // onChange={(e) => {
                //   setImageFile(e.target.files[0]);
                //   setImage(URL.createObjectURL(e.target.files[0]));
                // }}
                className="hidden"
              />
            </Label>
          </div>
          <div className="mt-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Username
            </label>
            <TextInput
              id="username"
              placeholder={user.username}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update User Details
          </button>
        </form>
      </div>

      {/* Change Password Section */}
      <div className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Change Password
        </h3>
        <form
          className="w-full"
          onSubmit={handlePasswordChange}
          autoComplete="off"
        >
          <div className="mt-4">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Old Password
            </label>
            <input
              type="password"
              id="old-password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="repeat-password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Repeat Password
            </label>
            <input
              type="password"
              id="repeat-password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            type="submit"
            className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? (
              <>
                <LoadingRing size="sm" /> Changing password
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
