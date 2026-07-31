"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { BrandCorner } from "@/components/ui/BrandCorner";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from "@/components/ui/Icon";
import { company } from "@/content/company";

const fullAddress = `${company.address.street}, ${company.address.suburb} ${company.address.state} ${company.address.postcode}`;
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

const ease = [0.33, 1, 0.68, 1] as const;

/**
 * Contact.
 *
 * The four identical bordered tiles are gone. They were cards where elevation
 * communicated nothing: same weight for a phone number you want people to use
 * and an address you rarely need. This is a divided list instead, with the
 * emergency line pulled out as the one thing that earns its own panel.
 *
 * One map, not two. The Australia coverage map was removed and the street map
 * promoted into the right column: a contact section is answering "where are
 * you", and the coverage question belongs to ServiceAreas, which still renders
 * that map elsewhere.
 */
export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-20 overflow-hidden bg-white py-20 md:py-28"
    >
      <BrandCorner position="top-right" />
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>Contact us</Eyebrow>
          <SectionHeading
            className="mt-5"
            lead="Talk to a"
            accent="firefighter, not a call centre"
          />
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85, ease }}
          >
            {/* Emergency line first and loudest: it is the reason most people
                land on this section outside business hours. */}
            <a
              href={company.emergencyPhoneHref}
              className="brand-gradient group flex items-center gap-5 rounded-2xl p-6 text-white transition-[filter] duration-200 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flame-red-deep"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20">
                <PhoneIcon className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-sm font-bold tracking-[0.14em] text-white/85 uppercase">
                  24/7 emergency line
                </span>
                <span className="block font-display text-2xl font-bold sm:text-3xl">
                  {company.emergencyPhone}
                </span>
              </span>
            </a>

            <dl className="mt-8 divide-y divide-line border-t border-line">
              <div className="flex gap-5 py-6">
                <PhoneIcon
                  className="mt-1 h-6 w-6 shrink-0 text-flame-orange"
                  aria-hidden="true"
                />
                <div>
                  <dt className="font-display text-sm font-bold tracking-[0.12em] text-ink-soft uppercase">
                    Phone
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={company.phoneHref}
                      className="cursor-pointer font-display text-xl font-bold text-ink transition-colors duration-200 hover:text-flame-red-deep"
                    >
                      {company.phone}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-5 py-6">
                <MailIcon className="mt-1 h-6 w-6 shrink-0 text-flame-orange" aria-hidden="true" />
                <div className="min-w-0">
                  <dt className="font-display text-sm font-bold tracking-[0.12em] text-ink-soft uppercase">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${company.email}`}
                      className="cursor-pointer font-display text-lg font-bold break-all text-ink transition-colors duration-200 hover:text-flame-red-deep"
                    >
                      {company.email}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex gap-5 py-6">
                <MapPinIcon
                  className="mt-1 h-6 w-6 shrink-0 text-flame-orange"
                  aria-hidden="true"
                />
                <div>
                  <dt className="font-display text-sm font-bold tracking-[0.12em] text-ink-soft uppercase">
                    Address
                  </dt>
                  <dd className="mt-1 text-ink">{fullAddress}</dd>
                </div>
              </div>

              <div className="flex gap-5 py-6">
                <ClockIcon className="mt-1 h-6 w-6 shrink-0 text-flame-orange" aria-hidden="true" />
                <div>
                  <dt className="font-display text-sm font-bold tracking-[0.12em] text-ink-soft uppercase">
                    Hours
                  </dt>
                  <dd className="mt-1 space-y-1 text-ink">
                    {company.hours.map((entry) => (
                      <span key={entry.days} className="flex flex-wrap gap-x-2">
                        <span className="font-semibold">{entry.days}</span>
                        <span className="text-ink-soft">{entry.time}</span>
                      </span>
                    ))}
                  </dd>
                </div>
              </div>
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, delay: 0.08, ease }}
          >
            {/* The Australia coverage map used to sit here, with the street map
                below it. Two maps answering two different questions was one map
                too many for a contact section: this one answers "where are
                you", which is the question the section is actually about.

                The street map moves up into this column rather than staying
                below the grid, so the section keeps its two-column shape. */}
            <p className="font-display text-sm font-bold tracking-[0.18em] text-ink-soft uppercase">
              Where to find us
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold text-ink uppercase md:text-3xl">
              {company.address.suburb},{" "}
              <span className="brand-gradient-text">{company.address.state}</span>
            </h3>

            <div className="mt-6 overflow-hidden rounded-2xl border border-line">
              <iframe
                src={mapSrc}
                title={`Map to ${company.legalName}`}
                className="h-100 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
