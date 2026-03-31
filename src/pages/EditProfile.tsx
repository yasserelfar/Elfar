import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks";

interface FormState {
  name: string;
  email: string;
  phoneNumber: string;
}

const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(() => ({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProfile({
        name: form.name,
        email: form.email,
        phoneNumber: form.phoneNumber,
      });
      navigate("/account");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
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
            <label className="block text-sm">Phone</label>
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm">Member since</label>
            <input
              readOnly
              value={
                user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"
              }
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
