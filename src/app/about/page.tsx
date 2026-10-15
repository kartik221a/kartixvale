"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { EmailCapture } from "@/components/marketing/email-capture";
import {
  Feather,
  Moon,
  Flame,
  Castle,
  Sparkles,
  Ghost,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const territories = [
  {
    title: "Dark Romance",
    desc: "Love under pressure. Morally grey characters, obsession, and the cost of wanting someone you shouldn't.",
    icon: Flame,
  },
  {
    title: "Gothic",
    desc: "Atmospheric manors, marriage of convenience, and the secrets older than the houses that hold them.",
    icon: Castle,
  },
  {
    title: "Paranormal",
    desc: "Fated mates, wolf shifters, and ancient bonds that choose their vessels without permission.",
    icon: Ghost,
  },
  {
    title: "Dark Fantasy",
    desc: "Curses, gods, drowned memories, and the price of forbidden magic in worlds built on ruins.",
    icon: Sparkles,
  },
  {
    title: "Psychological Thriller",
    desc: "Obsession, manipulation, and the architecture of silence built around a person until they forget who they were.",
    icon: Moon,
  },
  {
    title: "Mythological",
    desc: "Cruel gods, chosen vessels, and the devotional edge of dark romance — where worship blurs into love.",
    icon: Feather,
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen flex flex-col">
      <Navbar />

      {/* ============================================================
          HERO — understated, no portrait
          ============================================================ */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-gradient-ink">
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 30% 20%, rgba(160,24,24,0.15) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 70% 80%, rgba(184,146,74,0.10) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 50%, transparent 0%, rgba(12,9,7,0.6) 100%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="mb-6">
              <Feather className="h-8 w-8 text-gold mx-auto" />
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-5"
            >
              The Author
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] text-foreground leading-[1.05] text-glow-soft"
            >
              Kartix Vale
            </motion.h1>
            <motion.div variants={fadeUp} className="divider-ornament w-64 mx-auto my-8" />
            <motion.p
              variants={fadeUp}
              className="font-body text-xl md:text-2xl text-foreground/80 italic max-w-2xl mx-auto leading-relaxed"
            >
              &ldquo;Love was never meant to be safe.&rdquo;
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="font-body text-base text-muted-foreground mt-4 italic"
            >
              Twenty-two years old. Shy by nature. Relentless on the page.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          BIO — the pen behind the shadows
          ============================================================ */}
      <section className="py-20 md:py-28 bg-gradient-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-10 text-center">
              <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
                Origin
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground leading-tight">
                The Pen Behind the Shadows
              </h2>
              <div className="divider-gold w-24 mx-auto mt-4" />
            </motion.div>

            <motion.div variants={fadeUp} className="prose-editorial max-w-none">
              <p>
                Kartix Vale writes dark romance that lives in the space between love
                and obsession, safety and ruin. At twenty-two, the worlds built on the
                page are older than the person writing them — born from a lifelong
                fascination with the shadowy corners of love that most stories are
                afraid to explore.
              </p>
              <p>
                Every story asks the same question, dressed in different shadows:{" "}
                <em>what would you sacrifice for love?</em> The answer is never simple.
                It is never safe. And it is always worth the descent.
              </p>
              <p className="text-muted-foreground">
                Shy by nature but relentless on the page, Kartix prefers to let the
                stories speak for themselves. There is no portrait here because the
                author believes the words should find you before the person does.
                Writing from the dark — based nowhere in particular.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          TERRITORIES — the worlds
          ============================================================ */}
      <section className="py-20 md:py-28 bg-section-alt">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-12">
              <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
                The Territories
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground leading-tight">
                Worlds I Write
              </h2>
              <div className="divider-gold w-24 mx-auto mt-4" />
              <p className="font-body text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">
                Every Kartix Vale novel belongs to one of these atmospheres —
                each one a different way to fall into the dark.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {territories.map((territory) => {
                const Icon = territory.icon;
                return (
                  <motion.div key={territory.title} variants={fadeUp}>
                    <div className="card-dark rounded-md p-6 md:p-7 h-full transition-all duration-300 hover:border-gold/40 hover:shadow-[0_0_40px_-12px_rgba(184,146,74,0.2)]">
                      <Icon className="h-6 w-6 text-gold mb-4" />
                      <h3 className="font-serif text-xl text-foreground mb-2 leading-tight">
                        {territory.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        {territory.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          PHILOSOPHY — the creed
          ============================================================ */}
      <section className="py-20 md:py-32 bg-gradient-dark relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(160,24,24,0.10) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-10">
              <p className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-3">
                The Creed
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground leading-tight">
                The Philosophy
              </h2>
              <div className="divider-gold w-24 mx-auto mt-4" />
            </motion.div>

            <motion.blockquote
              variants={fadeUp}
              className="text-center my-10"
            >
              <p className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-gold leading-tight">
                &ldquo;Love was never meant to be safe.&rdquo;
              </p>
            </motion.blockquote>

            <motion.div variants={fadeUp} className="prose-editorial max-w-none">
              <p>
                This is not a tagline. It is the foundation of every story written
                under this name. Safe love is beautiful. Safe love is necessary. But
                there is a kind of love that exists beyond safety — in the territory
                where vulnerability becomes power, where obsession becomes devotion,
                and where the monsters we fear become the only ones who understand us.
              </p>
              <p>
                Dark romance is not about glorifying pain. It is about telling the
                truth about the parts of love that polite fiction leaves out: the
                jealousy that proves you care, the possessiveness that masks terror
                of loss, the darkness that lives in every heart that has ever loved
                too deeply. These stories do not sanitize. They illuminate.
              </p>
              <p className="text-muted-foreground">
                Every character is broken in a different way. Every story asks
                whether love can survive what life has done to the people holding it.
                The answer is never guaranteed. But it is always worth finding out.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          CTA
          ============================================================ */}
      <section className="py-20 md:py-24 bg-section-alt relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(184,146,74,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="font-display text-[11px] tracking-[0.4em] uppercase text-gold mb-3"
            >
              Continue
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-3xl md:text-5xl text-foreground mb-4 leading-tight"
            >
              Step Into the Books
            </motion.h2>
            <motion.div variants={fadeUp} className="divider-gold w-24 mx-auto mb-6" />
            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed"
            >
              Seventeen novels across three series and ten standalones. Every one
              of them a doorway into the atmospheres described above.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link href="/books">
                <Button variant="oxblood" className="h-12 px-8 text-sm tracking-wider uppercase font-semibold">
                  Browse the Catalogue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <a
                href="https://www.amazon.com/author/kartixvale"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="gold" className="h-12 px-8 text-sm tracking-wider uppercase font-semibold">
                  Amazon Author Page
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter signup */}
      <section className="py-16 md:py-20 bg-section-alt">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <EmailCapture variant="editorial" source="about-page" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
