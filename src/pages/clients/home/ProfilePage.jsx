import { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { ProfileHeader } from "../../../components/profile/ProfileHeader";
import { ProfileTabs } from "../../../components/profile/ProfileTabs";
import { ProfileStats } from "../../../components/profile/ProfileStats";
import { ProfileAbout } from "../../../components/profile/ProfileAbout";
import { ProfileFriends } from "../../../components/profile/ProfileFriends";
import { ProfilePhotos } from "../../../components/profile/ProfilePhotos";
import { ProfilePosts } from "../../../components/profile/ProfilePosts";
import { useParams } from "react-router";
import { getFriendByUserId, getUserById } from "../../../api/userApi";
import { useAuth } from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { ProfilePageSkeleton } from "../../../components/skeletons/ProfilePageSkeleton";

export default function ProfilePage() {
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("posts");
  const [isMe, setIsMe] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [friends, setFriends] = useState([]);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId || !currentUser) return;

    setIsMe(userId == currentUser.id);

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const userRes = await getUserById(userId);
        setUser(userRes.result);

        const friendsRes = await getFriendByUserId(userId);
        setFriends(friendsRes.result);

        const isFriend = friendsRes.result.some((f) => f.id === currentUser.id);

        setIsFriend(isFriend);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId, currentUser]);

  return (
    <>
      <title>Profile Page</title>

      <Header />

      {isLoading ? (
        <ProfilePageSkeleton />
      ) : (
        <section className="bg-gray-100">
          <div className="max-w-6xl mx-auto pb-10 px-4 min-h-screen mt-16 pt-4">
            <ProfileHeader user={user} isMe={isMe} isFriend={isFriend} />
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="mt-4 grid grid-cols-12 gap-4 items-start">
              {activeTab === "posts" && (
                <>
                  <aside className="col-span-12 lg:col-span-4">
                    <ProfileStats user={user} />
                    <ProfileAbout user={user} className="mt-4" />
                    <div className="bg-white rounded-xl shadow p-4 mt-4">
                      <h3 className="font-semibold mb-3">
                        {friends.length} {t("common.friends")}
                      </h3>
                      <ProfileFriends friends={friends} variant="compact" />
                    </div>
                    <div className="bg-white rounded-xl shadow p-4 mt-4">
                      <h3 className="font-semibold mb-3">
                        {t("common.photo")}
                      </h3>
                      <ProfilePhotos />
                    </div>
                  </aside>

                  <div className="col-span-12 lg:col-span-8">
                    <div className="mt-2">
                      <ProfilePosts userId={userId} isMe={isMe} />
                    </div>
                  </div>
                </>
              )}
              {activeTab === "photos" && (
                <div className="col-span-12">
                  <div className="bg-white rounded-xl shadow p-4">
                    <h3 className="font-semibold mb-3">{t("common.photo")}</h3>
                    <ProfilePhotos />
                  </div>
                </div>
              )}
              {activeTab === "friends" && (
                <div className="col-span-12">
                  <div className="bg-white rounded-xl shadow p-4">
                    <h3 className="font-semibold mb-3">
                      {friends.length} {t("common.friends")}
                    </h3>
                    <ProfileFriends friends={friends} variant="grid" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
