"use client";

type ResultViewProps = {
  img: string | null;
  count: number | null;
};

export default function ResultView({ img, count }: ResultViewProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
      {img ? (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* カウント表示 (画像の上にオーバーレイ) */}
          {count !== null && (
            <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-lg">
              検出数: {count}
            </div>
          )}

          {/* YOLO画像 */}
          <img
            src={img}
            alt="YOLO result"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      ) : (
        <p className="text-gray-400">YOLO 出力エリア (準備中)</p>
      )}
    </div>
  );
}