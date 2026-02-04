export function ProfilePageSkeleton() {
  return (
    <section className="bg-gray-100">
      <div className="max-w-6xl mx-auto pb-10 px-4 min-h-screen mt-16 pt-4 animate-pulse">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="h-48 bg-gray-200" /> {/* Cover */}
          <div className="p-4 flex items-end gap-4">
            <div className="w-32 h-32 bg-gray-200 rounded-full border-4 border-white -mt-20" />
            <div className="space-y-3 flex-1">
              <div className="h-6 w-48 bg-gray-200 rounded" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
            <div className="h-10 w-28 bg-gray-200 rounded-lg" />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 bg-white rounded-xl shadow p-3 flex gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-24 bg-gray-200 rounded-lg" />
          ))}
        </div>

        {/* Content */}
        <div className="mt-4 grid grid-cols-12 gap-4 items-start">
          {/* Left column */}
          <aside className="col-span-12 lg:col-span-4 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow p-4 space-y-3">
                <div className="h-5 w-32 bg-gray-200 rounded" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-5/6 bg-gray-200 rounded" />
                  <div className="h-4 w-2/3 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </aside>

          {/* Right column (Posts) */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow p-4 space-y-4">
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
                </div>

                <div className="h-60 bg-gray-200 rounded-lg" />

                <div className="flex justify-between">
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
