"use client";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">okusuri-info.com</h1>
      <p className="text-lg mb-12 text-gray-700">
        このサイトでは薬に関する2つのサービスを利用できます。
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Search */}
        <div className="p-6 bg-white rounded-xl shadow-md w-80 flex flex-col items-stretch">
          <h2 className="text-xl font-semibold mb-4">Search</h2>
          <p className="text-sm text-gray-600 flex-1 mb-6 text-left">
            保険薬価収載の内用薬・外用薬・注射薬・歯科薬を網羅的に検索<br />
            添付文書と禁忌情報も取得できます
          </p>
          <a
            href="/search"
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 text-center"
          >
            薬価検索
          </a>
        </div>

        {/* Counter */}
        <div className="p-6 bg-white rounded-xl shadow-md w-80 flex flex-col items-stretch">
          <h2 className="text-xl font-semibold mb-4">Pill Counter</h2>
          <p className="text-sm text-gray-600 flex-1 mb-6 text-left">
            試験運用版<br />一包化薬の錠剤個数を出力します<br />
            現在はカメラ付きのデスクトップ・ノートブックでの使用を想定しています
          </p>
          <a
            href="/counter"
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 text-center"
          >
            錠剤カウント
          </a>
        </div>
      </div>
    </main>
  );
}
