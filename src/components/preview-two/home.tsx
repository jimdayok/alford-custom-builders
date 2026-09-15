import Image from "next/image";
import Link from "next/link";

import { PreviewLogoLink } from "@/components/preview-logo-link";

export function PreviewTwoHome() {
  return (
    <section className="acb-v2-home">
      <Image
        src="/images/4906-deloache-ave-42.jpg"
        alt="A custom residence and outdoor living space by Alford Custom Builders"
        fill
        priority
        quality={75}
        className="object-cover"
        sizes="100vw"
      />
      <div className="acb-v2-home__veil" />
      <div className="acb-v2-home__center">
        <PreviewLogoLink previewVersion="preview2" variant="hero" />
      </div>
      <Link href="/discover" className="acb-v2-home__discover">
        <span>Discover more</span>
        <span aria-hidden="true">↓</span>
      </Link>
    </section>
  );
}
