"use client";

import { useState } from "react";
import Bio from "../components/Bio";
import LinearMNIST from "../components/LinearMNIST";
import Card from "@/components/Card";
import ResearchWork from "@/components/ResearchWork";
import DemosAndGames from "@/components/DemosAndGames";
import WritingWork from "@/components/WritingWork";

export default function Home() {
  const [showResearch, setShowResearch] = useState(false);
  const [showDemos, setShowDemos] = useState(true);
  const [showWriting, setShowWriting] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50">
      <div className="flex-1 p-4 pr-2 relative">
        <Bio
          onResearchWorkClick={setShowResearch}
          onDemosClick={setShowDemos}
          onWritingClick={setShowWriting}
        />
      </div>
      <div className="flex-1 p-4 pr-2 relative hidden md:block lg:block">
        <LinearMNIST />
      </div>
      {showResearch && <ResearchWork setShowOverlay={setShowResearch} />}
      {showDemos && <DemosAndGames setShowOverlay={setShowDemos} />}
      {showWriting && <WritingWork setShowOverlay={setShowWriting} />}
    </div>
  );
}
