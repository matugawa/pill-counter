"use client";

import { useState } from "react";
import Header from "../components/Header";
import CameraView from "../components/CameraView";
import ResultView from "../components/ResultView";

export default function Home() {
  const [cameraActive, setCameraActive] = useState(false);
  const [resultImg, setResultImg] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ヘッダー（ボタン押下でカメラON/OFF切り替え） */}
      <Header onToggle={setCameraActive}
              onResult={(img) => setResultImg(img)} />

      {/* 下部メインエリア：左右分割 */}
      <div className="flex flex-1">
        {/* 左：カメラ映像 */}
        <div className="flex-1 bg-black">
          <CameraView active={cameraActive} />
        </div>

        {/* 右：YOLO出力（まだ空） */}
        <div className="flex-1 bg-gray-50">
          <ResultView img={resultImg} />
        </div>
      </div>
    </div>
  );
}
