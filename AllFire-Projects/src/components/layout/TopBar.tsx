import { Container } from "@/components/ui/Container";
import { MailIcon, PhoneIcon } from "@/components/ui/Icon";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "@/components/ui/SocialIcons";
import { company } from "@/content/company";

const socials = [
  { label: "Facebook", href: company.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: company.social.instagram, Icon: InstagramIcon },
  { label: "LinkedIn", href: company.social.linkedin, Icon: LinkedInIcon },
  { label: "YouTube", href: company.social.youtube, Icon: YouTubeIcon },
];

export function TopBar() {
  return (
    <div className="bg-ink text-white/75">
      <Container className="flex h-11 items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-sm">
          <a
            href={company.phoneHref}
            className="flex min-h-11 cursor-pointer items-center gap-2 py-2 transition-colors duration-200 hover:text-flame-yellow"
          >
            <PhoneIcon className="h-4 w-4 text-flame-orange" />
            {company.phone}
          </a>
          <a
            href={`mailto:${company.email}`}
            className="hidden min-h-11 cursor-pointer items-center gap-2 py-2 transition-colors duration-200 hover:text-flame-yellow sm:flex"
          >
            <MailIcon className="h-4 w-4 text-flame-orange" />
            {company.email}
          </a>
        </div>

        <div className="flex items-center gap-1">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-white/10 hover:text-flame-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-orange"
            >
              <social.Icon className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
      </Container>
    </div>
  );
}
