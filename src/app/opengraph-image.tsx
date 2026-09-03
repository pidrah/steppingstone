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
          background: "#1a6b3c",
          color: "white",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, textTransform: "uppercase", opacity: 0.8 }}>
          Georgetown, Guyana
        </div>
        <div style={{ fontSize: 72, marginTop: 24, fontWeight: 600 }}>
          STEPPINGSTONE
        </div>
        <div style={{ fontSize: 36, letterSpacing: 16, marginTop: 8 }}>REALTY</div>
        <div style={{ fontSize: 28, marginTop: 40, opacity: 0.9 }}>
          Property sales, rentals, and care
        </div>
      </div>
    ),
    { ...size },
  );
}
