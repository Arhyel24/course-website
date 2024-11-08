"use client";

import { Table } from "flowbite-react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface User {
  username: string;
  email: string;
  image: string;
}

export function UsersTable({ users }) {
  const [openModal, setOpenModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState<User>({
    username: "",
    email: "",
    image: "",
  });

  const deleteusero = () => {
    toast.success("user deleted successfully");
    setOpenModal(false);
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
          {users.map((user: User) => (
            <Table.Row key={user.username} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {user.username}
              </Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>21-01-2024</Table.Cell>
              <Table.Cell>
                <Button
                  className="font-medium text-cyan-400 hover:underline dark:text-cyan-500"
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
          ))}
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
              Are you sure you want to delete this user? {deleteUser.email}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteusero}>
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
