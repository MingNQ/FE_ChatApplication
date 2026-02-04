import { useEffect, useState } from "react";
import FeedComposer from "../../../components/feed/FeedComposer";
import { FeedList } from "../../../components/feed/FeedList";
import { FriendsSidebar } from "../../../components/friends/FriendsSidebar";
import { Header } from "../../../components/Header";
import { HomePageSkeleton } from "../../../components/skeletons/HomePageSkeleton";

export function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <title>Home</title>

      <Header />

      {isLoading ? (
        <HomePageSkeleton />
      ) : (
        <section className="bg-gray-100 min-h-screen mt-16">
          <div className="relative">
            <div className="flex justify-center py-4">
              <div className="w-full max-w-2xl px-3">
                <FeedComposer />
                <FeedList />
              </div>
            </div>

            <div className="hidden xl:block fixed top-20 right-6 w-80">
              <FriendsSidebar />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
