import { ImageResponse } from "next/og";
import { getBlogPost } from "@/lib/blog-service";

export const alt = "Kartix Vale — Article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  const title = post?.title ?? "The Dark Library";
  const category = post?.category ?? "Kartix Vale";
  const readTime = post?.readTime ?? "Longform Essay";
  const excerpt = post?.excerpt ?? "Dark romance essays and reading guides.";

  const OXBLOOD = "#5c0a0a";
  const GOLD = "#b8924a";
  const INK = "#0c0907";
  const IVORY = "#f6efe4";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: INK,
          backgroundImage: `radial-gradient(circle at 20% 20%, ${OXBLOOD}40 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${GOLD}25 0%, transparent 55%)`,
          padding: "60px 80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: `1px solid ${GOLD}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: GOLD,
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "0.1em",
              }}
            >
              KV
            </div>
            <div
              style={{
                color: IVORY,
                fontSize: "20px",
                letterSpacing: "0.4em",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Kartix Vale
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: GOLD,
              fontSize: "14px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ opacity: 0.6 }}>●</span>
            {category}
          </div>
        </div>

        <div
          style={{
            width: "100%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            marginBottom: "40px",
          }}
        />

        <div
          style={{
            color: IVORY,
            fontSize: "64px",
            lineHeight: 1.1,
            fontWeight: 600,
            marginBottom: "30px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: `${IVORY}cc`,
            fontSize: "24px",
            lineHeight: 1.4,
            fontStyle: "italic",
            marginBottom: "auto",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {excerpt}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "60px",
            paddingTop: "30px",
            borderTop: `1px solid ${GOLD}33`,
          }}
        >
          <div
            style={{
              color: GOLD,
              fontSize: "18px",
              fontStyle: "italic",
              fontFamily: "serif",
            }}
          >
            Love was never meant to be safe.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: `${IVORY}aa`,
              fontSize: "16px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            <span>○</span>
            {readTime}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
