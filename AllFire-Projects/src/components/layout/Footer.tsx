import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { footerNav } from "@/content/nav";
import { services } from "@/content/services";
import { company } from "@/content/company";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/ui/Icon";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
  TikTokIcon,
  XIcon as XSocialIcon,
} from "@/components/ui/SocialIcons";

const socials = [
  { label: "Facebook", href: company.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: company.social.instagram, Icon: InstagramIcon },
  { label: "LinkedIn", href: company.social.linkedin, Icon: LinkedInIcon },
  { label: "YouTube", href: company.social.youtube, Icon: YouTubeIcon },
  { label: "TikTok", href: company.social.tiktok, Icon: TikTokIcon },
  { label: "X", href: company.social.x, Icon: XSocialIcon },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white/65">
      {/* Emergency call band */}
      <div className="brand-gradient">
        <Container className="flex flex-col items-center justify-between gap-5 py-8 text-center sm:flex-row sm:text-left">
          <p className="font-display text-2xl font-bold text-white uppercase sm:text-3xl">
            Fire emergency or urgent defect?
          </p>
          <Button href={company.emergencyPhoneHref} variant="ink">
            Call {company.emergencyPhone}
          </Button>
        </Container>
      </div>

      {/* Capability strip: the client's own supplied artwork, replacing the
          hand-drawn icon row that approximated it.

          The artwork has a white background rather than transparency, so it
          gets its own white band instead of sitting on the dark footer.

          It is roughly 8:1. Scaled to a phone width that puts the labels around
          five pixels tall, so below sm it scrolls at a legible minimum width
          rather than shrinking into an illegible smear. */}
      <div className="border-b border-white/10 bg-white">
        <Container className="overflow-x-auto py-6">
          <Image
            src="/images/brand/fpa-capability-strip.png"
            alt="FPA Australia Bronze Member. AllFire services fire extinguishers, fire hoses and reels, fire hydrants and boosters, emergency equipment, fire panels, and testing and compliance."
            width={2953}
            height={369}
            sizes="(max-width: 1024px) 900px, 1024px"
            className="mx-auto h-auto w-full max-w-5xl min-w-160"
          />
        </Container>
      </div>

      <Container className="grid grid-cols-1 gap-12 py-16 md:grid-cols-4">
        <div>
          <Logo tone="paper" />
          <p className="mt-5 max-w-xs text-sm">
            Firefighter-run fire protection compliance, serving {company.areaServed}. Family
            legacy in the fire service since {company.legacyYear}.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 text-white/75 transition-colors duration-200 hover:border-white hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <social.Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold tracking-wide text-white uppercase">
            Navigate
          </h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {footerNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="cursor-pointer transition-colors duration-200 hover:text-flame-yellow"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold tracking-wide text-white uppercase">
            Services
          </h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {services.slice(0, 5).map((service) => (
              <li key={service.slug}>
                <a
                  href="#services"
                  className="cursor-pointer transition-colors duration-200 hover:text-flame-yellow"
                >
                  {service.shortName}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold tracking-wide text-white uppercase">
            Get in touch
          </h3>
          <ul className="mt-5 space-y-3.5 text-sm">
            <li className="flex items-start gap-2.5">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-flame-orange" />
              <a
                href={company.phoneHref}
                className="cursor-pointer transition-colors duration-200 hover:text-flame-yellow"
              >
                {company.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-flame-orange" />
              <a
                href={`mailto:${company.email}`}
                className="cursor-pointer break-all transition-colors duration-200 hover:text-flame-yellow"
              >
                {company.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-flame-orange" />
              <span>
                {company.address.street}, {company.address.suburb} {company.address.state}{" "}
                {company.address.postcode}
              </span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-white/45 md:flex-row">
          <p>
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>
          <p>{company.memberships.join(" / ")}</p>
        </Container>
      </div>
    </footer>
  );
}
