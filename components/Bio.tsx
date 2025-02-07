import { Yeseva_One, Calistoga } from "next/font/google";

const yeseva_one = Yeseva_One({
  subsets: ["latin"],
  weight: ["400"],
});

const calistoga = Calistoga({
  subsets: ["latin"],
  weight: ["400"],
});

interface CardProps {
  onResearchWorkClick: (arg: boolean) => void;
  onDemosClick: (arg: boolean) => void;
  onWritingClick: (arg: boolean) => void;
}

export default function Bio({
  onResearchWorkClick,
  onDemosClick,
  onWritingClick,
}: CardProps) {
  const handleResearchWorkClick = () => {
    onResearchWorkClick(true);
  };

  const handleDemosClick = () => {
    onDemosClick(true);
  };

  const handleWritingClick = () => {
    onWritingClick(true);
  };

  return (
    <div className="p-8 flex flex-col h-full justify-center items-center overflow-scroll">
      <img src="/profile.JPG" alt="profile" className="w-32 h-32 mb-4" />
      <h1
        className={`text-5xl font-bold mb-2 text-teal-950 ${calistoga.className} text-center`}
      >
        Felix O'Mahony
      </h1>
      <div className="flex justify-center items-center flex-row">
        {/* <a
          href="/Felix_OMahony_CV.pdf"
          className="flex items-center text-slate-700 underline mb-2 mr-2 ml-2"
        >
          CV
        </a> */}
        <a
          href="https://uk.linkedin.com/in/felix-o-mahony-37851213a"
          className="flex items-center text-slate-700 underline mb-2 mr-2 ml-2"
        >
          LinkedIn
        </a>
        <a
          href="https://scholar.google.com/citations?user=pGRdscoAAAAJ"
          className="flex items-center text-slate-700 underline mb-2 mr-2 ml-2"
        >
          Google Scholar
        </a>
        <a
          href="https://github.com/felixomahony"
          className="flex items-center text-slate-700 underline mb-2 mr-2 ml-2"
        >
          GitHub
        </a>
      </div>
      <p className="text-black text-center">
        PhD candidate at the University of Cambridge supervised by Roberto
        Cipolla. Interested in using world models to generate synthetic training
        data for robots.
      </p>
      <div className="mt-4">
        <a
          href="#"
          onClick={handleResearchWorkClick}
          className="flex items-center text-blue-600 hover:underline font-semibold"
        >
          ➔ Research Work
        </a>
        <a
          href="#"
          onClick={handleDemosClick}
          className="flex items-center text-blue-600 hover:underline font-semibold"
        >
          ➔ Demos and Games
        </a>
        <a
          href="#"
          onClick={handleWritingClick}
          className="flex items-center text-blue-600 hover:underline font-semibold"
        >
          ➔ Data Journalism & Writing
        </a>
      </div>
    </div>
  );
}
