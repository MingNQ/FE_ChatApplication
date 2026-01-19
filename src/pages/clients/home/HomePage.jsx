import FeedComposer from "../../../components/feed/FeedComposer";
import { FeedList } from "../../../components/feed/FeedList";
import { Header } from "../../../components/Header";

export function HomePage() {
  return (
    <>
      <title>Home</title>

      <Header />

      <section>
        <div className="flex justify-center bg-gray-100 min-h-screen mt-16 pt-4">
          <div className="w-full max-w-2xl px-3">
            <FeedComposer />
            <FeedList />
          </div>
        </div>
      </section>
    </>
  );
}
