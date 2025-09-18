"use client";

import { useEffect, useRef } from "react";

type CameraViewProps = {
  active: boolean;
};

export default function CameraView({ active }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        await video.play().catch((err) => {
          console.warn("Autoplay prevented:", err);
        });
      } catch (err) {
        console.error("Camera start failed:", err);
      }
    };

    const stopCamera = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
      }
      video.srcObject = null;
    };

    if (active) {
      startCamera();
    } else {
      stopCamera();
    }

    // クリーンアップ（コンポーネントが unmount されたとき）
    return () => stopCamera();
  }, [active]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        playsInline
        muted
      />
    </div>
  );
}
