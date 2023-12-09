import React, { useState, useEffect } from "react";
import {
  blockUser,
  searchUser,
  updateUserRole,
} from "../../services/admin.services";
import { toast } from "react-toastify";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await searchUser(
          searchTerm,
          (currentPage - 1) * usersPerPage,
          usersPerPage
        );
        setUsers(fetchedUsers);
      } catch (error) {
        toast.error("Error fetching users: " + error.message);
      }
    };

    fetchData();
  }, [currentPage, usersPerPage, searchTerm]);

  const handleBlockUser = async (uid, blockStatus) => {
    try {
      await blockUser(uid, !blockStatus);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.uid === uid ? { ...user, isBlocked: !blockStatus } : user
        )
      );
      toast.success("User status updated successfully");
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  const handleChangeRole = async (uid, newRole) => {
    try {
      await updateUserRole(uid, newRole);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.uid === uid ? { ...user, role: newRole } : user
        )
      );
      toast.success("Role updated successfully");
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {users && (
        <div className="p-4 m-2 md:m-10 border shadow-md rounded bg-gradient-to-br from-amber-200 to-teal-200 font-bold">
          <div className="card-body">
            <input
              type="text"
              className="input__dark input input-bordered text-black w-full max-w-xs placeholder-teal-300"
              placeholder="Search for user"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <div className="overflow-x-auto mt-4">
              <table className="table w-full">
                <thead>
                  <tr className="text__card text-2xl text-black">
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Block/Unblock</th>
                  </tr>
                </thead>
                <tbody className="text__card">
                  {users.map((user) => (
                    <tr key={user.username}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <select
                          className="role__selected"
                          value={user.role}
                          onChange={(e) =>
                            handleChangeRole(user.uid, e.target.value)
                          }
                        >
                          <option value="teacher">Teacher</option>
                          <option value="student">Student</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className={`btn ${
                            user.isBlocked ? "btn-success" : "btn-error"
                          }`}
                          onClick={() =>
                            handleBlockUser(user.uid, user.isBlocked)
                          }
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="card-actions justify-end p-20">
                <button
                  className="btn btn-ghost text-white bg-violet-600 font-bold border-none"
                  disabled={currentPage <= 1}
                  onClick={() => paginate(currentPage - 1)}
                >
                  Previous
                </button>
                <span className="text__card">Page {currentPage}</span>
                <button
                  className="btn btn-ghost text-white bg-violet-600 font-bold border-none"
                  onClick={() => paginate(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
