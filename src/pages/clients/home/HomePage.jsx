import { useEffect, useState } from "react";
import { Header } from "../../../components/header";
import { UserCard } from "../../../components/users/UserCard";
import { getUsers } from "../../../api/userApi";

export function HomePage() {
  const [requested, setRequested] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getUsers();
        setData(result);
      } catch (error) {
        console.error("Get users failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAddFriend = (userId) => {
    setRequested((prev) => [...prev, userId]);
  };

  return (
    <>
      <title>Home</title>
      <Header />

      <main className="pt-20 px-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          People you may know
        </h1>

        {loading && <p className="text-gray-500">Loading users...</p>}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.result?.data?.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              isRequested={requested.includes(user.id)}
              onAddFriend={() => handleAddFriend(user.id)}
            />
          ))}
        </div>
      </main>
    </>
  );
}
