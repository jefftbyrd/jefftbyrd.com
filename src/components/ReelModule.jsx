import { useEffect, useRef, useState } from 'react';

let rafId;

const fmt = (s) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export default function ReelModule() {
  const canvasRef = useRef();
  const audioRef = useRef();
  const sourceRef = useRef();
  const analyzerRef = useRef();
  const progressRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState({ elapsed: 0, duration: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const observer = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawLine();
    });
    observer.observe(canvas);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  const drawLine = (songData) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0.2, '#2392f5');
    grad.addColorStop(0.5, '#fe0095');
    grad.addColorStop(1.0, 'purple');
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.beginPath();

    const data = songData ?? new Uint8Array(2).fill(128);
    const w = canvas.width,
      h = canvas.height;
    data.forEach((v, i) => {
      const x = (i / data.length) * w;
      const amp = 4;
      const y = h / 2 + (v - 128) * amp;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });

    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  };

  const animate = () => {
    if (audioRef.current.paused) return drawLine();
    const data = new Uint8Array(analyzerRef.current.frequencyBinCount);
    analyzerRef.current.getByteTimeDomainData(data);
    drawLine(data);
    const { currentTime, duration } = audioRef.current;
    setTime({ elapsed: currentTime, duration: duration || 0 });
    if (progressRef.current && duration)
      progressRef.current.style.width = `${(currentTime / duration) * 100}%`;
    rafId = requestAnimationFrame(animate);
  };

  const handlePlay = () => {
    if (!sourceRef.current) {
      const ctx = new AudioContext();
      sourceRef.current = ctx.createMediaElementSource(audioRef.current);
      analyzerRef.current = ctx.createAnalyser();
      analyzerRef.current.fftSize = 2048;
      sourceRef.current.connect(analyzerRef.current);
      analyzerRef.current.connect(ctx.destination);
    }
    cancelAnimationFrame(rafId);
    animate();
  };

  const toggle = () =>
    audioRef.current.paused
      ? audioRef.current.play()
      : audioRef.current.pause();

  const seek = (e) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    audioRef.current.currentTime = ((e.clientX - left) / width) * time.duration;
  };

  const remaining = time.duration - time.elapsed;

  return (
    <div className="w-full">
      <div className="relative cursor-pointer" onClick={toggle}>
        <audio
          ref={audioRef}
          src="/jefftbyrd-reel.mp3"
          onPlay={() => {
            handlePlay();
            setPlaying(true);
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
        <canvas
          ref={canvasRef}
          className="w-full h-50 lg:h-70"
          style={{ opacity: playing ? 1 : 0 }}
        />

        {/* Time overlay */}
        <div className="absolute bottom-0 inset-x-0 flex justify-between px-5 lg:py-3 pointer-events-none lg:text-2xl text-black/70">
          <span className="tabular-nums">{fmt(time.elapsed)}</span>
          <span className="tabular-nums">−{fmt(remaining)}</span>
        </div>

        {/* Play button */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none mt-6"
          style={{ opacity: playing ? 0 : 1 }}
        >
          <div className="w-18 h-18 lg:w-24 lg:h-24 rounded-full flex items-center justify-center bg-foreground border border-white/60 backdrop-blur-sm transition-all duration-200 group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(67,56,202,0.2)]">
            <div className="border-t-16 border-b-16 border-l-26 lg:border-t-24 lg:border-b-24 lg:border-l-40 border-solid border-transparent border-l-white/90 ml-2 w-0 h-0" />
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-3 bg-white/20 cursor-pointer mt-1" onClick={seek}>
        <div
          ref={progressRef}
          className="h-full w-0"
          style={{
            background: 'linear-gradient(to right, #2392f5, #fe0095, purple)',
          }}
        />
      </div>
    </div>
  );
}
