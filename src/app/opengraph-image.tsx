import { ImageResponse } from "next/og";

export const alt = "Steppingstone Realty — Georgetown, Guyana";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          background: "linear-gradient(135deg, #205033 0%, #17402c 48%, #0d2a1c 100%)",
          color: "white",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: "-50px",
            bottom: "-70px",
            opacity: 0.14,
            transform: "rotate(18deg)",
          }}
        >
          <svg width="430" height="430" viewBox="0 0 64 64" fill="#e6cb8d">
            <path d="M52 12C34 12 12 32 12 56c24 0 44-20 44-40 0-2.2-1.8-4-4-4Z" />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 4,
            background:
              "linear-gradient(90deg, rgba(218,181,102,0) 0%, rgba(218,181,102,0.75) 50%, rgba(218,181,102,0) 100%)",
          }}
        />
        <div
          style={{
            fontSize: 28,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#e6cb8d",
          }}
        >
          Georgetown, Guyana
        </div>
        <div style={{ fontSize: 76, marginTop: 24, fontWeight: 600 }}>
          STEPPINGSTONE
        </div>
        <div style={{ fontSize: 36, letterSpacing: 16, marginTop: 8, color: "#e6cb8d" }}>
          REALTY
        </div>
        <div style={{ fontSize: 28, marginTop: 40, opacity: 0.9 }}>
          Property sales, rentals, and care
        </div>
      </div>
    ),
    { ...size },
  );
}
