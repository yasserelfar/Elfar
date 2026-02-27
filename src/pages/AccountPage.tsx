import UserNav from "../components/UserNav";
import UserInfo from "../components/UserInfo";

const AccountPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <UserNav />
      <h1 className="text-3xl font-bold text-center mt-8">Account Page</h1>
      <p className="text-center text-gray-400 mt-4">
        Your account details will appear here.
      </p>
      <UserInfo />
    </div>
  );
};

export default AccountPage;
