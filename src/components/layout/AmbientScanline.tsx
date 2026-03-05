export function AmbientScanline() {
  return (
    <div
      aria-hidden="true"
      className="scanline pointer-events-none fixed inset-x-0 top-[-2px] z-[999] h-[2px] opacity-5"
      style={{
        background:
          "linear-gradient(90deg, transparent, var(--color-cyan), transparent)",
        animation: "scanline 8s linear infinite",
      }}
    />
  );
}

