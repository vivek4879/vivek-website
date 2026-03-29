import { ImageResponse } from "next/og";

export const alt = "Vivek Aher — Full-Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Left accent bar — cyan → violet gradient */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "5px",
            background: "linear-gradient(to bottom, #22D3EE, #8B5CF6)",
          }}
        />

        {/* Terminal prompt */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "28px",
          }}
        >
          <span style={{ color: "#22D3EE", fontSize: "20px", fontFamily: "monospace" }}>
            ~/vivek
          </span>
          <span style={{ color: "#71717A", fontSize: "20px", fontFamily: "monospace" }}>
            $
          </span>
          <span
            style={{
              display: "flex",
              width: "12px",
              height: "22px",
              background: "#22D3EE",
              marginLeft: "4px",
            }}
          />
        </div>

        {/* Name */}
        <div
          style={{
            color: "#FAFAFA",
            fontSize: "88px",
            fontWeight: 700,
            letterSpacing: "-3px",
            lineHeight: 1.05,
          }}
        >
          Vivek Aher
        </div>

        {/* Title */}
        <div
          style={{
            color: "#A1A1AA",
            fontSize: "34px",
            marginTop: "20px",
            letterSpacing: "-0.5px",
          }}
        >
          Full-Stack Engineer
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "72px",
            left: "80px",
            right: "80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #27272A",
            paddingTop: "24px",
          }}
        >
          <div style={{ color: "#22D3EE", fontSize: "17px", fontFamily: "monospace" }}>
            Next.js · TypeScript · React · AWS
          </div>
          <div style={{ color: "#52525B", fontSize: "17px", fontFamily: "monospace" }}>
            github.com/vivek4879
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
