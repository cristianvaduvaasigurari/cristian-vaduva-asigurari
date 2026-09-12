import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Cristian Văduva — Asigurări Premium & Protecție Financiară Generali";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #05070A 0%, #09111D 50%, #05070A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          fontFamily: "system-ui, sans-serif",
          color: "#FFFFFF",
          border: "2px solid #1A3150",
          boxSizing: "border-box",
        }}
      >
        {/* Top Header Tag */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: "#C9A227",
              }}
            />
            <span
              style={{
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#C9A227",
              }}
            >
              INSURANCE & WEALTH PROTECTION
            </span>
          </div>
          <span
            style={{
              fontSize: "16px",
              letterSpacing: "0.15em",
              color: "#94A3B8",
              textTransform: "uppercase",
            }}
          >
            GENERALI ROMÂNIA PARTNER
          </span>
        </div>

        {/* Center Main Typography */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#FFFFFF",
            }}
          >
            Cristian Văduva
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 500,
              color: "#CBD5E1",
              lineHeight: 1.3,
              maxWidth: "900px",
            }}
          >
            Consultanță Strategică în Asigurări Premium, Protecția Patrimoniului & Managementul Riscului
          </div>
        </div>

        {/* Bottom Metrics / Pillar Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #1A3150",
            paddingTop: "28px",
          }}
        >
          <div style={{ display: "flex", gap: "40px" }}>
            <span style={{ fontSize: "16px", color: "#94A3B8" }}>🛡️ Viață & Sănătate</span>
            <span style={{ fontSize: "16px", color: "#94A3B8" }}>🏢 Corporate & IMM</span>
            <span style={{ fontSize: "16px", color: "#94A3B8" }}>🚗 CASCO & Flote</span>
            <span style={{ fontSize: "16px", color: "#94A3B8" }}>🏡 Locuințe Premium</span>
          </div>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#F5F5F2",
              fontFamily: "monospace",
            }}
          >
            insurance.cristianvaduva.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
