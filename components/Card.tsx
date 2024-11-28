import { Yeseva_One, Calistoga } from "next/font/google";

const yeseva_one = Yeseva_One({
  subsets: ["latin"],
  weight: ["400"],
});

const calistoga = Calistoga({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Card() {
  return (
    <div className="p-16 flex flex-col h-full border-r justify-center items-center">
      <img src="/profile.JPG" alt="profile" className="w-32 h-32 mb-4" />
      <h1
        className={`text-5xl font-bold mb-4 text-teal-950 ${calistoga.className} text-center`}
      >
        Felix O'Mahony
      </h1>
      <p className="text-black text-center">
        PhD candidate at the University of Cambridge supervised by Roberto
        Cipolla. Interested in using world models to generate synthetic training
        data for robots. I also like making games and demos (see overleaf), and
        writing. I am still in the process of updating this website, so please
        check back soon for more content.
      </p>
      {/* <div className="mt-4">
        <a
          href="#"
          className="flex items-center text-blue-600 hover:underline font-semibold"
        >
          ➔ Recent Projects and Work
        </a>
        <a
          href="#"
          className="flex items-center text-blue-600 hover:underline font-semibold"
        >
          ➔ Games and Demos
        </a>
        <a
          href="#"
          className="flex items-center text-blue-600 hover:underline font-semibold"
        >
          ➔ More About Felix
        </a>
      </div> */}
    </div>
  );
}
