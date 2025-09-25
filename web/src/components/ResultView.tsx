"use client";

type ResultViewProps = {
  img: string | null;
};

export default function ResultView({ img }: ResultViewProps) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      {img ? (
        <img
          src={img}
          alt="YOLO result"
          className="max-w-full max-h-full"
        />
      ) : (
        <p className="text-gray-400">YOLO 出力エリア (準備中)</p>
      )}
    </div>
  );
}