const segments = {
  hero: "M 20 755 C 200 800 440 700 530 540 C 590 440 470 440 500 490 C 535 555 770 320 920 350 C 1240 410 1080 830 70 900",
  work: "M 70 0 C 60 170 170 180 270 200 C 460 260 270 470 160 470 C 70 470 90 550 150 540 C 250 515 700 480 830 650 C 925 765 980 865 1080 900",
  about:
    "M 1080 0 C 1040 140 760 210 670 450 C 580 680 540 720 530 630 C 515 545 710 710 560 770 C 420 825 250 835 130 900",
  capabilities:
    "M 130 0 C 250 160 940 80 1080 210 C 1220 340 780 435 830 630 C 860 775 990 810 1000 900",
  contact:
    "M 1000 0 C 1050 140 1000 260 800 280 C 670 290 725 200 765 260 C 810 330 1060 400 1010 700",
} as const;

// Shared edge coordinates join adjacent scenes; normalized length drives the drawing.
export function JourneyPath({ scene }: { scene: keyof typeof segments }) {
  return (
    <svg
      className={`journey-path journey-${scene}`}
      viewBox="0 0 1200 900"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        pathLength="1"
        d={segments[scene]}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      {scene === "contact" && (
        <circle cx="1010" cy="700" r="7" fill="currentColor" />
      )}
    </svg>
  );
}
