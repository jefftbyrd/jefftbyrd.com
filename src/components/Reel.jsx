'use client';
import ReelModule from './ReelModule';

export default function Reel() {
  return (
    <div className="w-full m-0 p-0 border border-foreground group cursor-pointer bg-white/40 hover:bg-white/60 transition-colors duration-200">
      <div className="p-4 lg:pl-8 lg:pt-7 absolute">
        <h2 className="text-2xl! lg:text-4xl! mb-1!">Narrative Podcast Reel</h2>
        <h3>
          A selection of music from NPR's <i>White Lies</i>
        </h3>
      </div>
      <ReelModule />
    </div>
  );
}
