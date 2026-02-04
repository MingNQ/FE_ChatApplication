export function HomePageSkeleton() {
  return (
    <section className="bg-gray-100 min-h-screen mt-16 animate-pulse">
      <div className="relative">
        <div className="flex justify-center py-4">
          <div className="w-full max-w-2xl px-3 space-y-4">
            <div className="bg-white rounded-lg shadow p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="h-10 w-full bg-gray-200 rounded-full" />
              </div>
              <div className="flex justify-between">
                <div className="h-8 w-24 bg-gray-200 rounded" />
                <div className="h-8 w-24 bg-gray-200 rounded" />
                <div className="h-8 w-24 bg-gray-200 rounded" />
              </div>
            </div>

            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                    <div className="h-3 w-20 bg-gray-200 rounded" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded" />
                </div>

                <div className="h-60 bg-gray-200 rounded-lg" />

                <div className="flex justify-between pt-2">
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden xl:block fixed top-20 right-6 w-80 space-y-4">
          <div className="bg-white rounded-lg shadow p-4 space-y-4">
            <div className="h-5 w-32 bg-gray-200 rounded" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-200 rounded-full" />
                <div className="h-4 w-40 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
