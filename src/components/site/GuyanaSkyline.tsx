import { cn } from "@/lib/utils";

/**
 * Static, hand-drawn silhouettes of Georgetown, Guyana — the landmarks a
 * visitor actually knows:
 *
 *   · Independence Arch           · Stabroek Market clock tower
 *   · Umana Yana (conical benab)  · Georgetown City Hall
 *   · Parliament Building dome    · St. George's Cathedral spire
 *   · Modern high-rises           · Demerara Harbour Bridge (far span)
 *
 * Purely decorative SVG art drawn in "moonlit night" tones. There is no
 * motion — the buildings stay perfectly still, keeping the page calm and
 * cheap to render on mobile. `variant="far"` is the hazy layer behind the
 * city; `variant="near"` is the crisp foreground layer.
 */
export function GuyanaSkyline({
  variant = "near",
  className,
}: {
  variant?: "far" | "near";
  className?: string;
}) {
  if (variant === "far") {
    return (
      <svg
        viewBox="0 0 1440 420"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
        focusable="false"
        className={cn("block", className)}
        fill="none"
      >
        {/* Hazy mid-rise blocks behind the foreground city */}
        <g fill="#101c15">
          <rect x="60" y="310" width="90" height="110" />
          <rect x="170" y="290" width="60" height="130" />
          <rect x="380" y="300" width="110" height="120" />
          <rect x="520" y="280" width="70" height="140" />
          <rect x="880" y="296" width="80" height="124" />
          <rect x="1120" y="286" width="100" height="134" />
          <path d="M60 330q60-44 120 0v90H60Z" />
          <path d="M300 340q50-38 100 0v80H300Z" />
          <path d="M700 336q55-40 110 0v84H700Z" />
        </g>
        {/* Demerara Harbour Bridge — the long floating span across the river */}
        <g fill="#101c15">
          <rect x="940" y="330" width="500" height="7" />
          <path d="M940 325q125-22 250 0t250 5v7H940v-12Z" />
          {Array.from({ length: 13 }, (_, index) => (
            <rect key={index} x={952 + index * 38} y={337} width={4} height={43} />
          ))}
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
      className={cn("block", className)}
      fill="none"
    >
      <g fill="#070d09">
        {/* Tree line along the sea front */}
        <path d="M0 380q30-36 64-20 18-26 46-12 26-20 44 4 24-14 34 8v40H0Z" />
        <path d="M420 380q22-30 52-16 20-22 44-6 22-16 36 6 20-10 28 6v30H420Z" />
        <path d="M1092 380q24-28 50-14 18-20 40-6 20-14 32 6 18-10 26 4v30h-148Z" />
        <path d="M1398 380q14-22 42-10v30h-42Z" />

        {/* Independence Arch */}
        <path
          fillRule="evenodd"
          d="M132 380V300q48-64 96 0v80h-22v-74q-26-34-52 0v74h-22Z"
        />
        <rect x="126" y="292" width="108" height="10" rx="3" />

        {/* Umana Yana — the conical Amerindian benab */}
        <path d="M352 236l6 24q-58 12-78 96 54-16 106 0-20-84-78-96l6-24h38Z" />
        <rect x="306" y="356" width="6" height="24" />
        <rect x="336" y="356" width="6" height="24" />
        <rect x="366" y="356" width="6" height="24" />
        <rect x="396" y="356" width="6" height="24" />

        {/* Colonial roofline */}
        <path d="M462 380v-52l34-30 34 30v52h-68Z" />
        <path d="M536 380v-44l28-24 28 24v44h-56Z" />

        {/* Stabroek Market clock tower */}
        <rect x="600" y="176" width="56" height="204" />
        <rect x="590" y="136" width="76" height="44" />
        <path d="M582 136l45-44 46 44h-91Z" />
        <path d="M612 96q15-12 31 0l-6-16h-19l-6 16Z" />
        <rect x="625" y="66" width="5" height="18" />

        {/* Georgetown City Hall — steep roof and corner turrets */}
        <rect x="714" y="272" width="94" height="108" />
        <path d="M706 272l55-64 55 64h-110Z" />
        <rect x="694" y="240" width="28" height="140" />
        <path d="M694 240l14-26 14 26h-28Z" />
        <rect x="706" y="200" width="4" height="16" />
        <rect x="800" y="240" width="28" height="140" />
        <path d="M800 240l14-26 14 26h-28Z" />
        <rect x="812" y="200" width="4" height="16" />

        {/* Parliament Building — dome and colonnade */}
        <rect x="852" y="322" width="108" height="58" />
        <rect x="846" y="308" width="120" height="14" />
        <path d="M872 308a38 38 0 0 1 76 0h-76Z" />
        <rect x="902" y="252" width="16" height="22" />
        <path d="M900 252a10 10 0 0 1 20 0h-20Z" />

        {/* St. George's Cathedral — among the tallest wooden buildings on earth */}
        <rect x="992" y="302" width="96" height="78" />
        <rect x="1016" y="222" width="48" height="80" />
        <rect x="1010" y="192" width="60" height="30" />
        <path d="M1014 192l26-104 26 104h-52Z" />
        <rect x="1038" y="58" width="4" height="30" />
        <rect x="1030" y="66" width="20" height="4" />

        {/* Modern high-rises */}
        <rect x="1122" y="208" width="76" height="10" />
        <rect x="1130" y="216" width="60" height="164" />
        <rect x="1157" y="168" width="4" height="40" />
        <rect x="1220" y="172" width="70" height="208" />
        <rect x="1236" y="152" width="38" height="20" />
        <rect x="1252" y="122" width="4" height="30" />
        <rect x="1320" y="292" width="82" height="88" />
        <path d="M1320 292l41-26 41 26h-82Z" />
      </g>

      {/* Lit windows — tiny warm lights so the city feels alive */}
      <g fill="#dab566" opacity="0.28">
        <rect x="1140" y="232" width="6" height="9" />
        <rect x="1156" y="258" width="6" height="9" />
        <rect x="1174" y="232" width="6" height="9" />
        <rect x="1232" y="192" width="6" height="9" />
        <rect x="1250" y="222" width="6" height="9" />
        <rect x="1268" y="192" width="6" height="9" />
        <rect x="1240" y="282" width="6" height="9" />
        <rect x="1334" y="312" width="6" height="9" />
        <rect x="1360" y="338" width="6" height="9" />
        <rect x="1004" y="318" width="6" height="9" />
        <rect x="1068" y="318" width="6" height="9" />
        <rect x="866" y="336" width="6" height="9" />
        <rect x="940" y="336" width="6" height="9" />
        <rect x="728" y="292" width="6" height="9" />
        <rect x="780" y="322" width="6" height="9" />
      </g>

      {/* Clock face on the Stabroek Market tower */}
      <circle cx="628" cy="158" r="13" fill="#c8dcc9" opacity="0.2" />
    </svg>
  );
}
