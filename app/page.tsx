'use client'
import Link from "next/link";
import './scribble-btn.css';

export default function Home() {
  function play() {
    const audio = new Audio('/scribble.mp3');
    audio.play();
  }
  

  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white flex flex-col  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute z-0 pointer-events-none inset-0 flex  items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <h1 className="text-6xl font-semibold">Scribblore ✍️</h1>
      <Link 
        href={`/notes`}
        onMouseOver={play}
      >
        <button className="btn">
          <span>Scribble your Lore</span>  
        </button>
      </Link>
    </div>
  );
}


{/* <Link 
        href={`/notes`}
        className="mt-11 flex items-center justify-center rounded-xl w-60 h-16 text-lg text-center font-semibold text-sky-10 outline-4 bg-cyan-700 hover:bg-cyan-900"
      >
        Scribble your Lore</Link> */}