"use client";

import { useState } from "react";

type HeaderProps = {
  onToggle: (active: boolean) => void;
  onResult: (img: string) => void;
  onResultCount: (count: number) => void;
};

export default function Header({ onToggle, onResult, onResultCount }: HeaderProps) {
  const [active, setActive] = useState(false);
  let pending: { frame_id: string; count: number } | null = null;

  const handleClick = async () => {
    const next = !active;
    setActive(next);
    onToggle(next);

    if(next){
      const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL!)

      ws.onopen = ()=>{
        console.log("WS OPEN");
      
        const canvas = document.createElement("canvas");
        const video = document.querySelector("video") as HTMLVideoElement;

        const sendFrame = () => {
          if(!video || ws.readyState !== WebSocket.OPEN) return;

          const ctx = canvas.getContext("2d");
          if(!ctx) return;

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

          canvas.toBlob((blob) => {
            if(!blob) return
            ws.send(blob);
            console.log("Frame sent:", blob.size);
          }, "image/jpeg", 0.8);
        }
        setInterval(sendFrame, 3000);
      }

      ws.onmessage = (event) => {
        if(typeof event.data === 'string'){
          const meta = JSON.parse(event.data);
          if (meta.frame_id && meta.count !== undefined) {
            pending = { frame_id: meta.frame_id, count: meta.count };
          }
        }else{
          const blob = event.data as Blob;
          const url = URL.createObjectURL(blob);
          
          if(pending){
            onResult(url);
            onResultCount(pending.count);
            pending = null;
          }
        }
      }
    }
  };

  return (
    <header className="h-[140px] flex items-start justify-start p-4 bg-white">
      <button
        onClick={handleClick}
        className={`w-[150px] h-[100px] text-xl font-bold rounded-lg shadow-md ${
          active ? "bg-red-500 hover:bg-red-600 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {active ? "中止" : "開始"}
      </button>
    </header>
  );
}
