"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProfileComp({ user }) {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    // Validate passwords
    if (newPassword !== repeatPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Here you would typically send the new password to your API
    // For example:
    // const response = await fetch('/api/change-password', { ... });

    alert("Password updated successfully!"); // Mock success message
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-10 max-w-2xl mx-auto">
      <div className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full">
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
        <p className="text-gray-600 dark:text-gray-300">{user.email}</p>

        <form className="mt-6 w-full" onSubmit={handlePasswordChange}>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Change Password
          </h3>
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
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
