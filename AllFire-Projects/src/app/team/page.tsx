import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingSection } from "@/components/sections/BookingSection";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { Button } from "@/components/ui/Button";
import {
  team,
  widerCrewNote,
  teamGallery,
  teamValues,
  managementStatement,
} from "@/content/team";
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
              <SectionHeading className="mt-5" lead="Peter" accent="Tricklebank" />
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

          {/* Three across rather than six, and portrait rather than square.

              Six across put each crew member in a ~180px box on a desktop
              screen, which is a thumbnail, not a showcase. Three columns at 3:4
              roughly triples the area per person and gives the photographs room
              to read as portraits. */}
          <ul className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {crew.map((member) => (
              <li key={member.name} className="group">
                <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-paper-raised">
                  <Image
                    src={member.photo}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
                  />
                </div>
                <p className="mt-5 font-display text-xl font-bold text-ink">{member.name}</p>
                <p className="mt-1 text-ink-soft">{member.role}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* How we work. Client-supplied copy, verbatim. */}
      <section className="relative isolate overflow-hidden bg-ink py-16 md:py-24">
        <SectionBackdrop />
        <Container className="relative">
          <div className="max-w-2xl">
            <Eyebrow tone="light">How we work</Eyebrow>
            <SectionHeading
              className="mt-5"
              tone="light"
              lead="Service driven."
              accent="Client focused."
            />
            {/* The heading carries the first two clauses; this keeps the third,
                so none of the client's line is dropped. */}
            <p className="mt-6 font-display text-xl font-bold text-flame-yellow">
              Committed to your success.
            </p>
            <p className="mt-4 text-lg text-white/70">{managementStatement.body}</p>
          </div>

          {/* Five items, so the last one is left to span the full width on the
              two-column breakpoint rather than sitting alone in a half column. */}
          <ul className="mt-14 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
            {teamValues.map((value) => (
              <li key={value.title} className="border-t border-white/15 pt-6">
                <h3 className="font-display text-xl font-bold text-white uppercase">
                  {value.title}
                </h3>
                <p className="mt-3 leading-relaxed text-white/70">{value.body}</p>
              </li>
            ))}
          </ul>

          {/* Work showcase. Points at the channel in company.ts rather than a
              hardcoded URL, so it follows if the client's channel moves. */}
          <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-white/15 pt-10">
            <Button
              href={company.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              withArrow
            >
              Watch our work on YouTube
            </Button>
            <p className="text-white/60">See the crew on real Sydney jobs.</p>
          </div>
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
