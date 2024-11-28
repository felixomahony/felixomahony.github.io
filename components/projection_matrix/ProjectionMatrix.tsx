import React, { useState } from "react";
import { Yeseva_One, Calistoga } from "next/font/google";
import PrimaryViews from "./PrimaryViews";
import ProjectedView from "./ProjectedView";

const calistoga = Calistoga({
  subsets: ["latin"],
  weight: ["400"],
});

export default function ProjectionMatrix() {
  return (
    <div className="flex flex-col h-screen items-center bg-slate-50 ">
      <h1
        className={`text-2xl font-bold p-4 w-full mb-4 text-teal-950 ${calistoga.className}`}
      >
        What is a Projection Matrix, Anyway?
      </h1>
      <PrimaryViews />
      <ProjectedView />
    </div>
  );
}
