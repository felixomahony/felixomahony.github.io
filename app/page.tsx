"use client";

import Card from "../components/Card";
import LinearMNIST from "../components/LinearMNIST";

export default function Home() {
  return (
    <div className="flex h-screen bg-slate-50">
      <div className="flex-1 p-4 pr-2 relative">
        <Card />
      </div>
      <div className="flex-1 p-4 pr-2 relative">
        <LinearMNIST />
      </div>
    </div>
  );
}
