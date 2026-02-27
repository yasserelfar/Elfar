import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, type User } from "../context/AuthContext";

const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(() => ({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    password: user?.password || "",
    isActive: user?.isActive ?? true,
  }));

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <p className="text-center">Please login to edit your profile.</p>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.checked } as any));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: User = {
      ...user!,
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      // preserve isAdmin/isActive/createdAt from existing user
      isAdmin: user?.isAdmin || false,
      isActive: user?.isActive ?? true,
      createdAt: user?.createdAt || Date.now(),
    };

    updateProfile(updated);
    navigate("/account");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-md mx-auto bg-gray-800 p-6 rounded">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-700"
            />
          </div>

          {user?.isAdmin && (
            <div className="flex items-center gap-2">
              <input
                disabled
                type="checkbox"
                name="isActive"
                checked={!!form.isActive}
                onChange={handleCheckbox}
                id="isActive"
              />
              <label htmlFor="isActive" className="text-sm">
                Active
              </label>
            </div>
          )}

          <div>
            <label className="block text-sm">Member since</label>
            <input
              readOnly
              value={new Date(user.createdAt).toLocaleString()}
              className="w-full mt-1 p-2 rounded bg-gray-700 text-gray-300"
            />
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 bg-blue-600 rounded">Save</button>
            <button
              type="button"
              onClick={() => navigate("/account")}
              className="px-4 py-2 bg-gray-600 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
