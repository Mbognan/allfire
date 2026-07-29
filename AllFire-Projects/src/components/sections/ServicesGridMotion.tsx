"use client";

import { useRef } from "react";
import { motion, type Variants } from "motion/react";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { CarouselDots } from "@/components/ui/CarouselDots";
import type { Service } from "@/types/service";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] } },
};

export function ServicesGridMotion({ services }: { services: Service[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <motion.div
        ref={trackRef}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        /*
          Carousel below sm, grid above. Stacked cards make a very long scroll
          on a phone with no sense of how much is left; a snap rail keeps the
          set browsable and shows there is more beside it.
        */
        /* Three up, then the remaining two centred beneath, per the reference.

           A wrapping flex row rather than a grid: with five items a 3-column
           grid strands the last two hard left, and centring them needs
           col-start hacks that break the moment the count changes. Flex-wrap
           with justify-center handles any count on its own.

           Carousel below sm, as before. */
        className="mt-14 -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 scrollbar-none sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0"
      >
        {services.map((service) => (
          <motion.div
            key={service.slug}
            data-card
            variants={item}
            /* calc subtracts the gap share so three fit per row exactly. */
            className="w-[68%] shrink-0 snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
          >
            <ServiceCard service={service} />
          </motion.div>
        ))}
      </motion.div>

      {/* Only meaningful while the rail scrolls; above sm this is a grid. */}
      <CarouselDots
        trackRef={trackRef}
        count={services.length}
        tone="light"
        label="Services"
        className="sm:hidden"
      />
    </>
  );
}
