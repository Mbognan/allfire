import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingSection } from "@/components/sections/BookingSection";
import { team, widerCrewNote, teamGallery } from "@/content/team";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "Our Team",
  description: `The firefighters and technicians behind ${company.legalName}: who they are, what they hold, and who turns up at your building.`,
  alternates: { canonical: "/team" },
};

const [lead, ...crew] = team;

/**
 * Our Team.
 *
 * The differentiator this business sells is who does the work, so the page is
 * built around people rather than capability statements: the founder at full
 * width, the crew as a grid, then real photographs of them on the job.
 *
 * Deliberately light on biography. We have names and roles from the client's
 * own copy and nothing more, and invented backstory for real, named employees
 * is not a thing to guess at.
 */
export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        lead="The people"
        accent="who turn up"
        crumbLabel="Our Team"
        intro={`Firefighter-run since 2009. Every job across ${company.areaServed} is done by the crew below, not subcontracted out.`}
      />

      {/* Founder, full width. He is the reason the rest of the page is
          credible, so he is not one tile among seven. */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-paper-raised">
              <Image
                src={lead.photo}
                alt={`${lead.name}, ${lead.role}`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
                className="object-cover"
              />
            </div>

            <div>
              <Eyebrow>Founder</Eyebrow>
              {/* Split the name rather than using the full title as the accent:
                  the title is 40 characters and already stated below. */}
              <SectionHeading className="mt-5" lead="Peter" accent="Wood" />
              <p className="mt-6 font-display text-lg font-bold text-flame-red-deep">
                {lead.role}
              </p>
              {lead.bio && (
                <p className="mt-4 text-lg leading-relaxed text-ink-soft">{lead.bio}</p>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* The crew */}
      <section className="bg-paper py-16 md:py-24">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>The crew</Eyebrow>
            <SectionHeading className="mt-5" lead="Who you'll" accent="actually deal with" />
            <p className="mt-6 text-ink-soft">{widerCrewNote}</p>
          </div>

          <ul className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {crew.map((member) => (
              <li key={member.name}>
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-paper-raised">
                  <Image
                    src={member.photo}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 50vw, 16vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 font-display text-lg font-bold text-ink">{member.name}</p>
                <p className="mt-0.5 text-sm text-ink-soft">{member.role}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* On the job. Real photographs, unlike the portraits above. */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>On the job</Eyebrow>
            <SectionHeading className="mt-5" lead="Out in" accent="Sydney buildings" />
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {teamGallery.map((shot) => (
              <li key={shot.src} className="group">
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-paper-raised">
                  <Image
                    src={shot.src}
                    alt={shot.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-ink-soft">{shot.caption}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <BookingSection />
    </>
  );
}
