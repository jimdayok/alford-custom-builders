import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #f8f5ef 0%, #f1ece3 45%, #e2d7c6 100%)",
          color: "#1b212a",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              fontSize: 20,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#7e5a3f",
            }}
          >
            Alford Custom Builders
          </div>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.02,
              maxWidth: 860,
              fontWeight: 600,
            }}
          >
            Luxury residential construction with lasting craftsmanship.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: 28,
              maxWidth: 700,
              lineHeight: 1.4,
              color: "#405062",
            }}
          >
            Custom homes, major renovations, and design-forward additions.
          </div>
          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: 999,
              border: "1px solid rgba(18,38,58,0.14)",
              background:
                "radial-gradient(circle at 30% 30%, rgba(18,38,58,0.12), rgba(18,38,58,0.02))",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
