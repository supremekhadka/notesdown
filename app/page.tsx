'use client'
import Link from "next/link";
import './scribble-btn.css';
import Footer from "./components/footer/page";

export default function Home() {
  function play() {
    const audio = new Audio('/scribble.mp3');
    audio.play();
  }
  

  return (
    <div className="min-h-[30rem] sm:min-h-[40rem] h-max relative flex flex-col items-center justify-center">
          <h1 className="sm:text-5xl text-4xl font-semibold">Scribblore ✍️</h1>
      <Link 
        href={`/notes`}
        
      >
        <button className="btn" onMouseOver={play}>
          <span>Scribble your Lore</span>  
        </button>
      </Link>
    </div>
  );
}
