"use client";

import { useState } from "react";
import Header from "../../components/Header";
import CameraView from "../../components/CameraView";
import ResultView from "../../components/ResultView";

export default function CounterPage() {
  const [cameraActive, setCameraActive] = useState(false);
  const [resultImg, setResultImg] = useState<string | null>(null);
  const [count, setCount] = useState<number | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        onToggle={setCameraActive}
        onResult={(img) => setResultImg(img)}
        onResultCount={(c) => setCount(c)}
      />

      <div className="flex flex-1">
        <div className="flex-1 bg-black">
          <CameraView active={cameraActive} />
        </div>
        <div className="flex-1 bg-gray-50">
          <ResultView img={resultImg} count={count} />
        </div>
      </div>
    </div>
  );
}
