import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserInfo: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="p-6 bg-gray-800 rounded text-white">
        <p className="text-center">You are not logged in.</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const formatDate = (ts?: number) =>
    ts ? new Date(ts).toLocaleString() : "-";

  return (
    <div className="max-w-md mx-auto bg-gray-900 text-white p-6 rounded-lg shadow">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl">
          {user.name
            ? user.name.charAt(0).toUpperCase()
            : user.email.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user.name || "User"}</h2>
          <p className="text-sm text-gray-300">{user.email}</p>
          <p className="text-sm text-gray-300">Phone: {user.phone || "-"}</p>
          <p className="mt-1 text-xs text-gray-400">
            Status: {user.isActive ? "Active" : "Inactive"}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Role: {user.isAdmin ? "Admin" : "User"}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Joined: {formatDate(user.createdAt)}
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => navigate("/account/edit")}
          className="px-3 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>

        <button
          onClick={handleLogout}
          className="px-3 py-2 bg-red-600 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
