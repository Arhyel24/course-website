"use client";

import { IUser } from "@/app/models/userModel";
import { Table, Button, Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function UsersTable({ users }) {
  const [openModal, setOpenModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState<IUser | null>(null);

  const router = useRouter();

  const deleteUserHandler = async () => {
    if (!deleteUser) return;

    try {
      const response = await fetch("/api/deleteUser ", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: deleteUser.email }),
      });

      if (!response.ok) {
        console.error("Failed to delete user");
      }

      const data = await response.json();
      toast.success(data.message);
      setOpenModal(false);
      router.refresh();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="overflow-x-auto pt-8">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>User name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Date registered</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.length > 0 ? (
            users.map((user) => (
              <Table.Row
                key={user.username}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {user.username}
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>21-01-2024</Table.Cell>
                <Table.Cell>
                  <Button
                    className="font-medium text-white hover:underline"
                    color="failure"
                    onClick={() => {
                      setDeleteUser(user);
                      setOpenModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row className="bg-white dark:border-gray-700 text-center w-full dark:bg-gray-800">
              <Table.Cell>No users enrolled yet!</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this user? {deleteUser?.email}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteUserHandler}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
