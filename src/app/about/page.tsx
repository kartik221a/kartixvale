"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import GlitchText from "@/components/reactbits/GlitchText";
import Particles from "@/components/reactbits/Particles";
import { Button } from "@/components/ui/button";
import { Eye, Feather, Moon, Flame, Castle, Sparkles, Ghost, Skull } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const genres = [
  { title: "Dark Fae", desc: "Courts of shadow and thorn, where love is a weapon and bonds are forged in blood", icon: Feather, color: "text-purple-400" },
  { title: "Paranormal", desc: "Beyond the veil of reality, where the dead whisper and the living listen", icon: Ghost, color: "text-blue-400" },
  { title: "Gothic", desc: "Manors, moors, and madness — where the walls have ears and the dark has teeth", icon: Castle, color: "text-gray-300" },
  { title: "Fantasy", desc: "Magic-woven obsessions across worlds where power and love are inseparable", icon: Sparkles, color: "text-gold" },
  { title: "Mystery", desc: "Love hides in the dark, and every answer leads deeper into the labyrinth", icon: Moon, color: "text-cyan-400" },
  { title: "Demons & Fae", desc: "Where monsters love deepest and the line between salvation and damnation blurs", icon: Flame, color: "text-blood-light" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/author-page-bg.png"
            alt="Dark atmospheric author portrait"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.9)_100%)]" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          <Particles
            particleCount={50}
            particleSpread={8}
            speed={0.05}
            particleColors={["#8B0000", "#C9A84C", "#4a0000"]}
            moveParticlesOnHover
            particleHoverFactor={0.2}
            alphaParticles
            particleBaseSize={40}
            sizeRandomness={1.5}
            cameraDistance={25}
            disableRotation={false}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p variants={fadeInUp} className="text-gold/80 tracking-[0.3em] uppercase text-xs md:text-sm mb-6 font-medium">
              The Author
            </motion.p>

            {/* GlitchText name - subtle glitch on hover only */}
            <motion.div variants={fadeInUp} className="w-full overflow-visible">
              <GlitchText
                speed={0.5}
                enableShadows
                enableOnHover
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl uppercase"
                style={{ letterSpacing: '0.15em', background: 'linear-gradient(135deg, #C9A84C 0%, #D4AF37 40%, #B8860B 60%, #C9A84C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 0 12px rgba(201, 168, 76, 0.3))' }}
              >
                Kartix Vale
              </GlitchText>
            </motion.div>

            <motion.div variants={fadeInUp} className="divider-gold w-48 md:w-64 mx-auto my-6" />

            <motion.p
              variants={fadeInUp}
              className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground/80 italic"
            >
              &ldquo;Love was never meant to be safe&rdquo;
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-sm mt-4"
            >
              22 years old. Shy by nature. Relentless on the page.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== THE PEN BEHIND THE SHADOWS ===== */}
      <section className="py-16 md:py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-midnight/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blood/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <p className="text-gold/80 tracking-[0.3em] uppercase text-xs md:text-sm mb-3">
                Origin Story
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                The Pen Behind the Shadows
              </h2>
              <div className="divider-gold w-24 mx-auto mt-4" />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
            >
              {/* Mysterious emblem */}
              <div className="flex-shrink-0">
                <div className="w-48 h-48 md:w-60 md:h-60 rounded-full bg-gradient-to-br from-midnight via-blood/20 to-midnight flex items-center justify-center border border-gold/20 relative overflow-hidden shadow-[0_0_50px_rgba(139,0,0,0.25)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Skull className="h-10 w-10 md:h-12 md:w-12 text-gold/20" />
                  </div>
                  <span className="relative logo-text text-lg md:text-2xl uppercase text-center leading-tight">
                    Kartix<br/>Vale
                  </span>
                </div>
              </div>

              {/* Bio text */}
              <div className="text-center md:text-left space-y-4">
                <p className="text-foreground/90 text-base md:text-lg leading-relaxed">
                  Kartix Vale writes dark romance that lives in the space between love and obsession,
                  safety and ruin. At twenty-two, the worlds built on the page are older than the person
                  writing them — born from a lifelong fascination with the shadowy corners of love
                  that most stories are afraid to explore.
                </p>
                <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                  Every story asks the same question, dressed in different shadows:{" "}
                  <span className="text-blood-light italic font-serif">
                    What would you sacrifice for love?
                  </span>{" "}
                  The answer is never simple. It is never safe. And it is always worth the descent.
                </p>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  Shy by nature but relentless on the page, Kartix prefers to let the stories speak
                  for themselves. There is no photo because the author believes the words should find
                  you before the person does. Based nowhere in particular. Writing from the dark.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== WORLDS I WRITE ===== */}
      <section className="py-16 md:py-24 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-midnight/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <p className="text-gold/80 tracking-[0.3em] uppercase text-xs md:text-sm mb-3">
                The Territories
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                Worlds I Write
              </h2>
              <div className="divider-gold w-24 mx-auto mt-4" />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {genres.map((genre) => {
                const Icon = genre.icon;
                return (
                  <motion.div
                    key={genre.title}
                    variants={fadeInUp}
                    className="card-dark rounded-xl p-6 group hover:border-blood/30 hover:shadow-[0_0_25px_rgba(139,0,0,0.15)] transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg bg-white/5 ${genre.color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-serif text-xl text-foreground">
                        {genre.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {genre.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== THE PHILOSOPHY ===== */}
      <section className="py-16 md:py-24 bg-gradient-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blood/5 rounded-full blur-3xl" />
        </div>

        {/* Background particles */}
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <Particles
            particleCount={30}
            particleSpread={10}
            speed={0.03}
            particleColors={["#8B0000", "#C9A84C"]}
            alphaParticles
            particleBaseSize={30}
            sizeRandomness={1}
            cameraDistance={25}
            disableRotation
          />
        </div>

        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <p className="text-gold/80 tracking-[0.3em] uppercase text-xs md:text-sm mb-3">
                The Creed
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                The Philosophy
              </h2>
              <div className="divider-gold w-24 mx-auto mt-4" />
            </motion.div>

            {/* Central quote */}
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl text-blood-light text-glow-red italic leading-tight">
                &ldquo;Love was never meant to be safe.&rdquo;
              </blockquote>
            </motion.div>

            {/* Philosophy text */}
            <motion.div variants={fadeInUp} className="space-y-5 text-center">
              <p className="text-foreground/90 text-base md:text-lg leading-relaxed">
                This is not a tagline. It is the foundation of every story written under this name.
                Safe love is beautiful. Safe love is necessary. But there is a kind of love that
                exists beyond safety — in the territory where vulnerability becomes power, where
                obsession becomes devotion, and where the monsters we fear become the only ones
                who understand us.
              </p>
              <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                Dark romance is not about glorifying pain. It is about telling the truth about the
                parts of love that polite fiction leaves out: the jealousy that proves you care,
                the possessiveness that masks terror of loss, the darkness that lives in every
                heart that has ever loved too deeply. These stories do not sanitize. They illuminate.
              </p>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                Every character is broken in a different way. Every story asks whether love can
                survive what life has done to the people holding it. The answer is never guaranteed.
                But it is always worth finding out.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 md:py-20 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gold/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Eye className="h-10 w-10 text-gold mx-auto mb-6" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-4xl text-foreground mb-4"
            >
              Stay in the Shadows
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-base md:text-lg mb-8 max-w-lg mx-auto"
            >
              New stories are always forming in the dark. Subscribe to be the first to know when
              the next world opens its doors.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/#email-capture">
                <Button className="bg-blood-light hover:bg-blood text-white font-semibold px-8 h-12 text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,20,60,0.5)] hover:scale-105">
                  Subscribe for Updates
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#050505] border-t border-border py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="mb-4">
              <span className="logo-text text-xl uppercase">Kartix</span>
            </div>
            <p className="font-serif text-lg text-foreground/60 italic mb-4">
              &ldquo;Love was never meant to be safe&rdquo;
            </p>
            <div className="divider-gold w-16 mx-auto mb-6" />
            <nav className="flex justify-center gap-6 mb-6" aria-label="Footer navigation">
              <Link href="/" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">
                Home
              </Link>
              <Link href="/books" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">
                Books
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">
                About
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">
                Blog
              </Link>
            </nav>
            <p className="text-xs text-muted-foreground/50">
              &copy; 2025 Kartix Vale. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/40 mt-1">
              All books available on Amazon
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
