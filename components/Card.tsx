import { Yeseva_One, Calistoga } from "next/font/google";

const calistoga = Calistoga({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Card({
  setShowOverlay,
  title,
  children,
}: {
  setShowOverlay: (showOverlay: boolean) => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className="absolute inset-0 bg-slate-500 bg-opacity-50 z-10 flex justify-center overflow-scroll"
        onClick={() => setShowOverlay(false)}
      >
        <div
          className="max-w-xl w-full bg-slate-50 opacity-100 z-20 p-4 mt-0 rounded-none shadow-lg h-fit md:mt-4 md:rounded-lg lg:rounded-lg lg:mt-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center">
            <h1
              className={`text-2xl font-bold text-teal-950 ${calistoga.className}`}
            >
              {title}
            </h1>
            <a
              href="#"
              className="text-2xl text-slate-800"
              onClick={() => setShowOverlay(false)}
            >
              ╳
            </a>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
