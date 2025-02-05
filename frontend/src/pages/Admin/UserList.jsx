import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../../components/Loader.jsx";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import Message from "../../components/Message.jsx";

const UserList = () => {
  const { data: users, refetch, error, isLoading } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        const result = await deleteUser(id);
        toast.success(result.message || "User deleted successfully!");
        refetch();
      } catch (error) {
        toast.error(error.data.message || error.message);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });

      setEditableUserId(null);
      refetch();
    } catch (error) {
      toast.error(error.data.message || error.message);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Users</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"error"}>
          {error?.data.message || error.message}
        </Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-2 sm:px-4 py-2 text-xs sm:text-base text-left">
                  ID
                </th>
                <th className="px-2 sm:px-4 py-2 text-xs sm:text-base text-left">
                  NAME
                </th>
                <th className="px-2 sm:px-4 py-2 text-xs sm:text-base text-left">
                  EMAIL
                </th>
                <th className="px-2 sm:px-4 py-2 text-xs sm:text-base text-left">
                  ADMIN
                </th>
                <th className="px-2 sm:px-4 py-2 text-xs sm:text-base text-left"></th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-2 sm:px-4 text-xs sm:text-base py-2">
                    {user._id}
                  </td>
                  <td className="px-2 sm:px-4 text-xs sm:text-base py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableUserName}
                          onChange={(e) => setEditableUserName(e.target.value)}
                          className="w-full p-2 border rounded-lg"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-blue-500 cursor-pointer text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.username}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                          className="ml-2"
                        >
                          <FaEdit className="cursor-pointer" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-2 sm:px-4 text-xs sm:text-base py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editableUserEmail}
                          onChange={(e) => setEditableUserEmail(e.target.value)}
                          className="w-full border rounded-lg p-2"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <p>{user.email}</p>
                        <button
                          className="ml-2"
                          onClick={() =>
                            toggleEdit(user._id, user.username, user.email)
                          }
                        >
                          <FaEdit className="cursor-pointer" />
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="px-2 sm:px-4 text-xs sm:text-base py-2">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>

                  <td className="px-2 sm:px-4 text-xs sm:text-base py-2">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="bg-red-500 cursor-pointer hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default UserList;
