import Image from "next/image";
import Link from "next/link";

import { navigation, siteConfig } from "@/lib/site-data";
import { getGlobalSettings } from "@/lib/cms/published-content";
import type { PreviewVersion } from "@/lib/preview-version";

export async function Footer({ previewVersion }: { previewVersion: PreviewVersion | null }) {
  const settings = await getGlobalSettings();
  const websiteManagementUrl =
    "https://portal.d2dperformance.com/portal/login?next=%2Fportal%2Fsites%2Falford-custom-homes";

  if (previewVersion === "preview2") {
    return (
      <footer className="acb-v2-footer">
        <div className="acb-shell">
          <Image
            src="/brand/web/logo-horizontal-blanket.svg"
            alt={settings.businessName}
            width={406}
            height={152}
          />
          <div className="acb-v2-footer__contact">
            <a href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}>{settings.phone}</a>
            <a className="acb-v2-footer__email" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <p className="acb-v2-footer__service-area">{siteConfig.location}</p>
          </div>
          <p>© {new Date().getFullYear()} {settings.businessName}</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="acb-footer">
      <div className="acb-shell">
        <div className="acb-footer__lead">
          <div>
            <p className="acb-kicker text-[var(--brand-apricot)]">The Alford Standard</p>
            <p className="acb-footer__statement">
              The home is the product.<br />The experience is the brand.
            </p>
          </div>
          <Link href="/contact" className="acb-footer__conversation">
            <span>Start a Conversation</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="acb-footer__grid">
          <div className="acb-footer__brand">
            <Link href="/" aria-label={`${settings.businessName} home`}>
              <Image
                src="/brand/web/logo-horizontal-blanket.svg"
                alt={settings.businessName}
                width={406}
                height={152}
              />
            </Link>
            <p>Custom homes shaped by thoughtful planning, trusted relationships, and exceptional craftsmanship.</p>
          </div>

          <div>
            <p className="acb-footer__label">Explore</p>
            <nav className="acb-footer__links" aria-label="Footer navigation">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="acb-footer__label">Contact</p>
            <div className="acb-footer__links">
              <a href={`tel:${settings.phone.replace(/[^+\d]/g, "")}`}>{settings.phone}</a>
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
              <p>{settings.footerContactCopy}</p>
            </div>
          </div>
        </div>

        <div className="acb-footer__base">
          <div className="acb-footer__ownership">
            <p>© {new Date().getFullYear()} {settings.businessName}</p>
            <p className="acb-footer__credit">
              Built by <a href="https://digital.d2dmktg.com/" target="_blank" rel="noreferrer">D2D Digital</a>
            </p>
          </div>
          <p>Luxury. Personalized.</p>
          <a href={websiteManagementUrl}>Admin login · Edit this website</a>
        </div>
      </div>
    </footer>
  );
}
