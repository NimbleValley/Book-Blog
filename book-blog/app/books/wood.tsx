import { useMemo } from 'react';

export function seededRandom(seed: number) {
  // deterministic per-mount unless you pass Date.now() or a key as seed
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function WoodBackground({ children }: { children: React.ReactNode }) {
  const woodStyle = useMemo(() => {
    // random plank widths instead of one uniform repeat
    let x = 0;
    const seams: string[] = [];
    let i = 0;
    while (x < 2000) {
      const plankWidth = 26 + seededRandom(i * 7.31) * 22; // 26–48px planks
      x += plankWidth;
      seams.push(`transparent ${x - 1.5}px`, `rgba(0,0,0,0.12) ${x}px`, `transparent ${x + 1.5}px`);
      i++;
    }
    const plankSeams = `repeating-linear-gradient(90deg, ${seams.slice(0, 60).join(', ')})`;

    // a few randomized grain streak layers at slightly different angles
    const grainLayers = Array.from({ length: 3 }).map((_, n) => {
      const angle = 178 + seededRandom(n * 13.7) * 8; // 178–186deg, never perfectly vertical
      const spacing = 16 + seededRandom(n * 22.1) * 20; // 16–36px
      const opacity = (0.04 + seededRandom(n * 5.5) * 0.05).toFixed(3);
      const warm = n === 1; // one warm-toned streak layer for variety
      const color = warm ? `rgba(255,180,110,${opacity})` : `rgba(0,0,0,${opacity})`;
      return `repeating-linear-gradient(${angle}deg, transparent 0 ${spacing}px, ${color} ${spacing + 1}px, transparent ${spacing + 3}px)`;
    });

    // one or two faint knots, randomly placed
    const knots = Array.from({ length: 2 }).map((_, n) => {
      const cx = 15 + seededRandom(n * 31.2) * 70;
      const cy = 10 + seededRandom(n * 44.9) * 80;
      const size = 40 + seededRandom(n * 9.3) * 60;
      return `radial-gradient(ellipse ${size}px ${size * 1.6}px at ${cx}% ${cy}%, rgba(0,0,0,0.15), rgba(0,0,0,0.05) 60%, transparent 75%)`;
    });

    return {
      backgroundColor: '#1c120a',
      backgroundImage: [
        `radial-gradient(ellipse at 50% -10%, rgba(255,210,140,0.06), transparent 60%)`,
        ...knots,
        plankSeams,
        ...grainLayers,
        `linear-gradient(180deg, #1c120a, #150d07 60%, #0f0904)`,
      ].join(', '),
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative" style={woodStyle}>
      {children}
    </div>
  );
}