import Image from "next/image";
import Link from "next/link";

import { ComingSoonRenderings } from "@/components/coming-soon-renderings";

export function PreviewTwoAvailable() {
  return (
    <section className="acb-v2-available">
      <Image
        src="/images/prestonshire-coming-soon.jpg"
        alt="Architectural rendering of 6207 Prestonshire"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="acb-v2-available__veil" />
      <div className="acb-v2-available__copy">
        <p className="acb-kicker">Available</p>
        <h1>6207 Prestonshire</h1>
        <p>Preston Hollow</p>
        <div className="acb-v2-available__actions">
          <ComingSoonRenderings />
          <Link href="/contact#project-form">Ask About This Home <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}
