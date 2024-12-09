import { useState, useEffect, useRef } from "react";
import {
  useFetchAllUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} from "../../redux/features/UsersManagement/getUsersSlice";
import { EllipsisVertical, Search } from "lucide-react";
import Table from "../../component/Table";
import Pagination from "../../component/Pagination";

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [limit] = useState(10); // Number of users per page (can be dynamic if needed)

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [updateUserStatus, { isLoading: statusLoading }] =
    useUpdateUserStatusMutation();
  const [updateUserRole, { isLoading: roleLoading }] =
    useUpdateUserRoleMutation();
  const roleDropdownRefs = useRef([]);
  const statusDropdownRefs = useRef([]);

  const {
    data: users,
    error,
    isLoading,
  } = useFetchAllUsersQuery({
    page: currentPage,
    limit,
    search,
  });

  useEffect(() => {
    if (users) {
      setData(
        users?.users.map((user) => ({
          ...user,
          isRoleDropdownOpen: false,
          isStatusDropdownOpen: false,
        }))
      );
    }
  }, [users]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !roleDropdownRefs.current.some((ref) => ref?.contains(event.target)) &&
        !statusDropdownRefs.current.some((ref) => ref?.contains(event.target))
      ) {
        setData((prevData) =>
          prevData.map((user) => ({
            ...user,
            isRoleDropdownOpen: false,
            isStatusDropdownOpen: false,
          }))
        );
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    setCurrentPage(1);
    setSearch(e.target.value);
  };

  // const filteredData = data.filter((user) =>
  //   user.email.toLowerCase().includes(search.toLowerCase())
  // );

  const handleToggleStatus = async (userId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Canceled" : "Active";

    try {
      await updateUserStatus({ userId, status: newStatus }).unwrap();
      setData((prevData) =>
        prevData.map((user) =>
          user._id === userId
            ? { ...user, status: newStatus, isStatusDropdownOpen: false }
            : user
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleToggleRole = async (userId, currentRole) => {
    const newRole = currentRole === "User" ? "Admin" : "User";

    try {
      await updateUserRole({ userId, role: newRole }).unwrap();
      setData((prevData) =>
        prevData.map((user) =>
          user._id === userId
            ? { ...user, role: newRole, isRoleDropdownOpen: false }
            : user
        )
      );
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const toggleRoleDropdown = (id) => {
    setData((prevData) =>
      prevData.map((user) =>
        user._id === id
          ? {
              ...user,
              isRoleDropdownOpen: !user.isRoleDropdownOpen,
              isStatusDropdownOpen: false,
            }
          : { ...user, isRoleDropdownOpen: false }
      )
    );
  };

  const toggleStatusDropdown = (id) => {
    setData((prevData) =>
      prevData.map((user) =>
        user._id === id
          ? {
              ...user,
              isStatusDropdownOpen: !user.isStatusDropdownOpen,
              isRoleDropdownOpen: false,
            }
          : { ...user, isStatusDropdownOpen: false }
      )
    );
  };

  // const handlePageClick = (page) => {
  //   setCurrentPage(page); // Update the current page
  // };

  const tableData = data.map((user, index) => ({
    Image: (
      <img
        src={user.image || "https://via.placeholder.com/40"}
        alt="User"
        className="w-10 h-10 rounded-full object-cover"
      />
    ),
    Name: `${user.firstName} ${user.lastName}`,
    Email: user.email,
    Role: (
      <div
        className="relative inline-block dropdown"
        ref={(el) => (roleDropdownRefs.current[index] = el)}
      >
        <button
          className="flex items-center"
          onClick={() => toggleRoleDropdown(user._id)}
        >
          <EllipsisVertical size={20} />
          <span
            className={`${
              user.role === "Admin" ? "text-green-500" : "text-red-500"
            }`}
          >
            {roleLoading && user.isRoleDropdownOpen ? "Updating..." : user.role}
          </span>
        </button>
        {user.isRoleDropdownOpen && !roleLoading && (
          <div className="absolute bg-white shadow-lg rounded-lg p-2 mt-1 w-32 left-0 z-10 dropdown">
            <button
              onClick={async () => await handleToggleRole(user._id, user.role)}
              className="text-gray-700 hover:text-gray-900 block w-full text-center px-2 py-1"
            >
              {user.role === "Admin" ? "Make User" : "Make Admin"}
            </button>
          </div>
        )}
      </div>
    ),
    Status: (
      <div
        className="relative inline-block dropdown"
        ref={(el) => (statusDropdownRefs.current[index] = el)}
      >
        <button
          className="flex items-center "
          onClick={() => toggleStatusDropdown(user._id)}
        >
          <EllipsisVertical size={20} />
          <span
            className={`${
              user.status === "Active" ? "text-green-500" : "text-red-500"
            }`}
          >
            {statusLoading && user.isStatusDropdownOpen
              ? "Updating..."
              : user.status}
          </span>
        </button>
        {user.isStatusDropdownOpen && !statusLoading && (
          <div className="absolute bg-white shadow-lg rounded-lg p-2 mt-1 w-32 left-0 z-10 dropdown">
            <button
              onClick={async () =>
                await handleToggleStatus(user._id, user.status)
              }
              className="text-gray-700 hover:text-gray-900 block w-full text-center px-2 py-1"
            >
              {user.status === "Active" ? "Canceled" : "Activate"}
            </button>
          </div>
        )}
      </div>
    ),
  }));

  if (error) {
    return <div>Error to loading users</div>;
  }

  return (
    <div>
      <div className="container mx-auto  px-4 sm:px-8 py-8">
        <h1 className="text-3xl font-semibold mb-4">User Management</h1>

        <div className="transition w-full flex gap-3 px-3 items-center h-12 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
            className="focus:outline-none w-full"
          />
        </div>

        <Table
          columns={["Image", "Name", "Email", "Role", "Status"]}
          data={tableData}
          isLoading={isLoading}
        />

        <div className="w-full mx-auto max-w-screen-md flex justify-center -mt-24">
          <Pagination
            totalCount={users?.totalUsers}
            limit={10}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
