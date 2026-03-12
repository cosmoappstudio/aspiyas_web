"use client";

const FALLBACK_BRANDS = [
  "LC Waikiki",
  "Vodafone",
  "Twigy",
  "Kiralarsın",
  "Marka A",
  "Marka B",
  "Marka C",
  "Marka D",
];

function BrandItem({ name }: { name: string }) {
  return (
    <>
      <span className="text-sm font-semibold tracking-wide text-white/20 whitespace-nowrap transition-colors duration-200 hover:text-white/55">
        {name}
      </span>
      <span className="text-[10px] text-[#5a5fcf]/50">✦</span>
    </>
  );
}

export function Marquee({ brands }: { brands: string[] }) {
  const list = brands?.length ? brands : FALLBACK_BRANDS;
  return (
    <div className="border-t border-b border-white/[0.06] bg-[#070b17] py-6 overflow-hidden group">
      <div
        className="flex gap-12 w-max group-hover:[animation-play-state:paused]"
        style={{
          animation: "marquee 25s linear infinite",
        }}
      >
        {list.map((name) => (
          <BrandItem key={`${name}-1`} name={name} />
        ))}
        {list.map((name) => (
          <BrandItem key={`${name}-2`} name={name} />
        ))}
      </div>
    </div>
  );
}
