'use client';
import Image from 'next/image';
import ReelModule from './ReelModule';

export default function Reel() {
  return (
    <div className="w-full m-0 p-0 border-0 border-foreground group cursor-pointer bg-white/20 hover:bg-white/40 transition-colors duration-200 relative">
      <Image
        alt="White Lies"
        src="/images/white-lies-bloody-sunday.webp"
        fill
        className="object-cover mix-blend-overlay opacity-60 object-top"
        priority
      />
      <div className="p-4 lg:pl-12 lg:pt-7 absolute">
        <h2 className="text-2xl! lg:text-4xl! mb-1!">Narrative Podcast Reel</h2>
        <h3>
          Music from <i>White Lies</i> (NPR)
        </h3>
      </div>
      <ReelModule />
    </div>
  );
}
