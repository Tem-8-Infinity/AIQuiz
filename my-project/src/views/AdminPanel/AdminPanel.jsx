import { useState, useEffect } from "react";
import { blockUser, searchUser } from "../../services/admin.services";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [blockedUsers, setBlockedUsers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    searchUser("").then(setUsers);
  }, [setUsers]);

  const handleBlockUser = (uid, blockStatus) => {
    const newBlockStatus = !blockStatus;

    setBlockedUsers((prevState) => ({
      ...prevState,
      [uid]: newBlockStatus,
    }));

    blockUser(uid, newBlockStatus).then(() => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.uid === uid ? { ...user, isBlocked: newBlockStatus } : user
        )
      );
    });
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {filteredUsers && (
        <div className="p-4 m-2 md:m-10 border shadow-md rounded bg-gradient-to-br from-amber-200 to-teal-200 font-bold">
          <div className="card-body">
            <input
              type="text"
              className="input input-bordered w-full max-w-xs placeholder-teal-300"
              placeholder="Search for user"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="overflow-x-auto mt-4">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Block/Unblock</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.username}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
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
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary bg-violet-600 font-bold border-none"
                  onClick={() =>
                    paginate(currentPage > 1 ? currentPage - 1 : currentPage)
                  }
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {Math.ceil(users.length / usersPerPage)}
                </span>
                <button
                  className="btn btn-primary bg-violet-600 font-bold border-none"
                  onClick={() =>
                    paginate(
                      currentPage < Math.ceil(users.length / usersPerPage)
                        ? currentPage + 1
                        : currentPage
                    )
                  }
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
