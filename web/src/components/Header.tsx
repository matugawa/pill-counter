"use client";

import { useState } from "react";

type HeaderProps = {
  onToggle: (active: boolean) => void;
};

export default function Header({ onToggle }: HeaderProps) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    const next = !active;
    setActive(next);
    onToggle(next);
  };

  return (
    <header className="h-[200px] flex items-start justify-start p-4 bg-gray-100">
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
