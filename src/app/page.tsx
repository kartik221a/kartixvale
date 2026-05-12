"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BookCard } from "@/components/book-card";
import { EmailCapture } from "@/components/email-capture";
import { FaqSection } from "@/components/faq-section";
import { BookModal } from "@/components/book-modal";
import { Button } from "@/components/ui/button";
import { ChevronDown, BookOpen, Eye, Heart } from "lucide-react";

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

// ─── Book Data with Descriptions ───

interface BookData {
  title: string;
  subtitle?: string;
  coverUrl: string;
  genre: string;
  price?: string;
  amazonUrl?: string;
  comingSoon?: boolean;
  hook?: string;
  description: string[];
  whatToExpect: string[];
  contentWarning?: string;
  series?: string;
  kindleUnlimited?: boolean;
}

const booksData: BookData[] = [
  {
    title: "Thorns of the Fae Thorne: A Slow Burn Dark Fae Romance",
    subtitle: "A Slow Burn Dark Fae Romance",
    coverUrl: "https://m.media-amazon.com/images/I/61kY61LNZ-L._SY522_.jpg",
    genre: "Dark Fae Romance",
    price: "$2.99",
    amazonUrl: "https://www.amazon.com/dp/B0H1BTKZ4M",
    kindleUnlimited: true,
    series: "Standalone",
    hook: "The bond between them is not a love story. Not yet. It is a demolition.",
    description: [
      "Three hundred years ago, something broke the world. The fae court has been lying about it ever since.",
      "The Thornwall is consuming everything \u2014 ancient cities swallowed whole, entire populations displaced, and the very magic that sustains the realm is rotting from the inside. The truth has been buried under three centuries of institutional silence, and the world is running out of time.",
      "Then a human woman falls through the veil by accident.",
      "Seren Ashwood has spent her life building walls. A postgraduate student from Wales who learned early that needing people is a vulnerability, she did not ask to be pulled into a dying fae realm. She did not ask to be bonded \u2014 involuntarily, irrevocably \u2014 to a shadow-wielding immortal who looks at her like she is the most terrifying thing he has ever seen.",
      "His name is Kaelen Duskveil. He has not been touched willingly in two hundred years. For sixty of those years, he was used as a tool \u2014 a methodology designed to manufacture trust and harvest the resulting intimacy for power. He speaks fewer than two hundred words in the entire book. His silence is not mystery. It is the logical endpoint of a life that taught him that every word he ever gave away was used against him.",
      "The bond between them is not a love story. Not yet. It is a demolition. Five stages. Each one a further dismantling of the walls two broken people have built to survive. The first physical contact between them does not come easily. It lasts three seconds. It is devastating.",
      "But the wound killing the realm was caused by the opposite of what this bond is becoming. A death in solitude so complete it cracked the world. And the only thing that can begin to heal it is the one thing both Seren and Kaelen have spent their entire lives protecting themselves against: genuine connection, freely offered, between two people who have every reason to stay apart.",
    ],
    whatToExpect: [
      "Slow burn romance with five-stage bond progression",
      "Touch-starved MMC with deep trauma",
      "Morally grey characters and fae court politics",
      "Dual POVs \u2014 enemies to lovers with forced proximity",
      "Cursed bonds, shadow magic, and ancient secrets",
      "Standalone with a complete, earned ending",
    ],
    contentWarning: "Themes of trauma, institutional abuse, emotional manipulation, and forced bonding. No on-page explicit sexual content.",
  },
  {
    title: "The Gotham Reaper\u2019s Bride: A Dark Gothic Romance of Murder and Marriage",
    subtitle: "A Dark Gothic Romance",
    coverUrl: "https://m.media-amazon.com/images/I/61+jamW5fJL._SL1499_.jpg",
    genre: "Gothic Romance",
    price: "$2.99",
    amazonUrl: "https://www.amazon.com/dp/B0GZZN42ZH",
    kindleUnlimited: true,
    series: "Standalone",
    hook: "She married a stranger. The danger was never the stranger.",
    description: [
      "Seraphine Voss has nothing left \u2014 no family, no fortune, no choices but one: cross the sea and marry a man she has never met.",
      "Dorian Blackthorn is beautiful, guarded, and keeper of a clifftop manor that has stood for two hundred years over a town that buries its women in silence. Grimhaven is not what it seems. The fog that swallows the coastline every evening hides more than the harbour. Women have been dying here for two decades \u2014 posed in the marshes with white roses clutched in their hands, their faces arranged to match the likeness of a dead woman. The town whispers a name: the Gotham Reaper.",
      "No one has been caught. No one has been tried.",
      "And Seraphine\u2019s new husband is not the man the town fears most.",
      "As the walls of Blackthorn Manor close around her \u2014 locked doors, watchful eyes, a husband who protects her with silence and control \u2014 Seraphine realizes the truth: she is not safe. She has never been safe. The danger does not live in the bedroom down the hall. It lives in the walls themselves.",
      "And it has been watching her since the day she arrived.",
    ],
    whatToExpect: [
      "Atmospheric gothic romance with murder mystery",
      "Marriage of convenience turned psychological thriller",
      "Possessive, morally grey hero who protects with silence",
      "Strong heroine who refuses to be a victim",
      "No supernatural elements \u2014 all-too-human horror",
      "Standalone with no cliffhanger",
    ],
    contentWarning: "Explicit sexual content, graphic violence, themes of possessive relationships, murder, and moral ambiguity. 18+",
  },
  {
    title: "Behind the Veil: A Dark Gothic Paranormal Romance",
    subtitle: "Beneath the Veil \u2014 Book Four",
    coverUrl: "https://m.media-amazon.com/images/I/61C5PJYM7tL._SL1499_.jpg",
    genre: "Paranormal Romance",
    price: "$5.99",
    amazonUrl: "https://www.amazon.com/dp/B0GZ72XX4W",
    kindleUnlimited: true,
    series: "Beneath the Veil \u2014 Book Four (Finale)",
    hook: "She diminished herself to save the world. What grew back was something the world had never seen.",
    description: [
      "Seraphina Vale\u2019s coherence \u2014 the measure of who she is \u2014 has fallen to fifty-seven percent and is still dropping. Every engagement with the Veil that runs beneath Blackthorn Manor costs her another fragment of the person she was. The modified consciousness that was meant to stabilize her is becoming something else entirely: a bridge between two realities, permanent and irreversible.",
      "Winter is coming to the English countryside, and with it the winter solstice \u2014 the moment when the Veil reaches its thinnest. The ancient entity on the other side has waited decades for this door to open. The Order that was supposed to prevent it is fracturing from within.",
      "And the man who has stood between Seraphina and the darkness since the beginning is watching her disappear, one percentage point at a time, and learning that love does not always mean protection. Sometimes it means standing beside someone while they become something you cannot follow.",
      "Behind the Veil is the devastating conclusion to the Beneath the Veil series \u2014 a gothic dark romance about identity, sacrifice, and the terrifying beauty of loving someone in a world where the cost of saving them may be the person they were before you met.",
    ],
    whatToExpect: [
      "Devastating series finale with emotional payoff",
      "Identity transformation and irreversible change",
      "Gothic atmosphere at its darkest",
      "Love that means letting someone become something you cannot follow",
      "Complete resolution of the Veil storyline",
      "Not a happy ending \u2014 an earned one",
    ],
    contentWarning: "Explicit sexual content, graphic violence, themes of grief, trauma, identity dissolution, possessive relationships, moral ambiguity, and body horror. 18+",
  },
  {
    title: "A Crown of Ashes: Beneath the Veil \u2014 Book Three",
    subtitle: "Beneath the Veil \u2014 Book Three",
    coverUrl: "https://m.media-amazon.com/images/I/71LQrdTVsgL._SL1499_.jpg",
    genre: "Dark Fantasy Thriller",
    price: "$5.99",
    amazonUrl: "https://www.amazon.com/dp/B0GY9H2W2R",
    kindleUnlimited: true,
    series: "Beneath the Veil \u2014 Book Three",
    hook: "She began at eighty percent. She will end at fifty-seven.",
    description: [
      "Seraphina Vale can sense the Veil \u2014 the thin membrane between the physical world and something ancient, hungry, and vast. In 1882, as Britain\u2019s hidden supernatural crisis accelerates, she is the only operative capable of suppressing the six nodes that keep the Veil from collapsing.",
      "Each suppression costs her a piece of who she is. A fragment of memory. A degree of emotional range. A sliver of the person she used to be.",
      "She began at eighty percent. She will end at fifty-seven.",
      "But the conspiracy runs deeper than the nodes. Enemies move within the institutions meant to protect her. Her closest ally concealed the true cost of the fifth operation \u2014 and the betrayal broke something that no node suppression could restore.",
      "A Crown of Ashes is the story of a woman who chose to diminish herself to protect a world that cannot know what she sacrificed. It is about the lies told in the name of love, the architecture of trust after deception, and whether the person who remains after the losing is still the person who began.",
    ],
    whatToExpect: [
      "Dark fantasy thriller set in Victorian Britain",
      "Heroine sacrificing pieces of herself to save the world",
      "Betrayal from within the closest circle",
      "Institutional conspiracy and political intrigue",
      "Explores identity, sacrifice, and what remains after loss",
    ],
    contentWarning: "Graphic violence, themes of grief, trauma, identity erosion, possessive relationships, moral ambiguity, and institutional betrayal. 18+",
  },
  {
    title: "The Unholy Reverie: A Supernatural Psychological Thriller",
    subtitle: "Beneath the Veil \u2014 Book Two",
    coverUrl: "https://m.media-amazon.com/images/I/71tfd6o7v-L._SL1499_.jpg",
    genre: "Supernatural Thriller",
    price: "$5.99",
    amazonUrl: "https://www.amazon.com/dp/B0GX7BLW1N",
    kindleUnlimited: true,
    series: "Beneath the Veil \u2014 Book Two",
    hook: "The deeper you fall, the less you remember what\u2019s real.",
    description: [
      "London is a city built on layers of history, and beneath every one of them, something is waking up.",
      "When an invisible barrier between the known world and something far older begins to destabilize, it does not arrive with warnings or spectacle. It begins as a whisper \u2014 a frequency most people cannot hear, threaded through the noise of a metropolis that has no idea it is changing. Only a handful of individuals can sense it. They call it dissonance.",
      "Seraphina has been feeling it for weeks. Each session pulls her deeper into the architecture of something she cannot yet name \u2014 a structure hidden within the Veil itself, vast and layered and alive. Her coherence is slipping. The boundary between her thoughts and the noise beyond the Veil is fraying. The institution that was supposed to protect her is watching her unravel.",
      "What terrifies her most is not the dissonance itself \u2014 it is the growing certainty that some part of her wants to see what lies on the other side.",
      "Across the city, Blackthorn is assembling something that has never been attempted. A countermeasure to push the Veil back into stability before the thinning reaches a point of no return. The science is experimental. The margin for error is nonexistent. And the conspiracy they are up against has been planning for far longer than anyone realized.",
      "When decoded letters surface pointing to a date that cannot be changed, the race to understand the Veil becomes a race against time itself. Loyalties fracture. Paranoia spreads. And the deeper they dig, the more they realize the conspiracy is not trying to destroy reality \u2014 it is trying to replace it.",
    ],
    whatToExpect: [
      "Supernatural psychological thriller with conspiracy suspense",
      "Mind-bending mystery that questions what is real",
      "Morally complex characters with fractured loyalties",
      "Slow-burn continuation of the Beneath the Veil series",
      "Can be read as a standalone",
    ],
    contentWarning: "Explicit sexual content, graphic violence, themes of psychological manipulation, paranoia, conspiracy, moral ambiguity, and body horror. 18+",
  },
  {
    title: "The Crown of Ash and Tides: A Dark Epic Fantasy",
    subtitle: "A Dark Epic Fantasy of Forbidden Magic, Lost Kingdoms, and Destiny",
    coverUrl: "https://m.media-amazon.com/images/I/81oKnxJvFJL._SL1500_.jpg",
    genre: "Dark Epic Fantasy",
    price: "$5.99",
    amazonUrl: "https://www.amazon.com/dp/B0GSN8SKYB",
    kindleUnlimited: true,
    series: "Standalone",
    hook: "In Virellion, the ocean does not hold water. It holds memories. And it is always hungry.",
    description: [
      "Veyne is a resonance diver \u2014 one of the few who dare descend into the poisoned depths to harvest the ash of ancient leviathans. The work keeps her sister alive. But it slowly kills her in return. She has learned to survive by becoming invisible to the empire that sees divers as disposable tools.",
      "Until the black sails arrive.",
      "Taken to the imperial capital of Stormholde, Veyne is pulled into a dangerous world of court intrigue, buried secrets, and a power hidden beneath the sea itself. A consciousness older than kingdoms has begun to stir, searching for a single voice in the deep.",
      "Her voice.",
      "Bound to a powerful sovereign with secrets of his own, Veyne must decide what she is willing to become to survive. Because the sea does not forget. And the tide is rising.",
      "The Crown of Ash and Tides is a dark epic fantasy of ancient power, dangerous loyalty, forbidden magic, and the price of destiny \u2014 where the ocean itself holds the memories of drowned gods, and the girl who dives deepest may be the one the sea has been waiting for.",
    ],
    whatToExpect: [
      "Dark epic fantasy with oceanic mythology",
      "Reluctant heroine with dangerous power awakening inside her",
      "Court intrigue and political machinations",
      "Forbidden bond with a sovereign who has his own secrets",
      "Ancient gods, leviathan remains, and memory magic",
      "Standalone novel with a complete story",
    ],
    contentWarning: "Violence, themes of exploitation, body horror, political manipulation, and moral ambiguity. 18+",
  },
  {
    title: "A Bargain in Shadows: A Gothic Victorian Dark Romance",
    subtitle: "Beneath the Veil \u2014 Book One",
    coverUrl: "https://m.media-amazon.com/images/I/610eFf4cJYL._SL1499_.jpg",
    genre: "Gothic Romance",
    price: "$5.99",
    amazonUrl: "https://www.amazon.com/dp/B0GWZQ8QDM",
    kindleUnlimited: true,
    series: "Beneath the Veil \u2014 Book One",
    hook: "She married a monster hunter. The monster was always her.",
    description: [
      "Ruined. Penniless. Branded a fraud across every drawing room in London.",
      "Seraphina Vale was once the capital\u2019s most celebrated medium \u2014 a woman whose s\u00e9ances drew the aristocracy like moths to flame. But when a performance went catastrophically wrong, the illusion shattered, and Seraphina lost everything: her clients, her reputation, her home, and the last shreds of the respectable life she had fought so hard to build.",
      "Then Lord Cassian Blackthorn comes for her.",
      "The reclusive Earl of Ashworth \u2014 a man whose name is whispered alongside ghost stories and whose first wife died under circumstances no one dares discuss \u2014 offers her a bargain she cannot afford to refuse: marry him. Use her supposed gifts to lure the supernatural entities that the Order of the Veil hunts from the shadows of Victorian London. In exchange, her debts vanish and she gets a second chance.",
      "There is just one problem. Seraphina has no gift. She never did.",
      "But deep inside Blackthorn Manor \u2014 a house where candles flicker without draft and shadows move against the light \u2014 something ancient and dormant is beginning to stir inside her. Something the Order was founded to destroy. And the man she must trust with her life may be the one destined to end it.",
    ],
    whatToExpect: [
      "Gothic Victorian dark romance with supernatural suspense",
      "Marriage of convenience / slow-burn enemies to lovers",
      "Haunted manor with secrets in every shadow",
      "Morally grey hero who hunts monsters \u2014 and a heroine who is one",
      "Lies, obsession, and forbidden power",
      "First book in the Beneath the Veil series",
    ],
    contentWarning: "Explicit sexual content, graphic violence, themes of deception, possessive relationships, moral ambiguity, and supernatural horror. 18+",
  },
];

export default function HomePage() {
  const [selectedBook, setSelectedBook] = useState<BookData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openBookModal = (book: BookData) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBook(null), 300); // wait for animation
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.png"
            alt="Dark romantic atmosphere"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          {/* Dark overlays */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.9)_100%)]" />
        </div>

        {/* Atmospheric orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blood/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-midnight/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Logo */}
            <motion.div variants={fadeInUp} className="mb-6">
              <h2 className="logo-text text-3xl md:text-4xl uppercase">
                Kartix
              </h2>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent mx-auto mt-2" />
            </motion.div>

            <motion.p variants={fadeInUp} className="text-gold/80 tracking-[0.3em] uppercase text-xs md:text-sm mb-6 font-medium">
              Dark Romance Author
            </motion.p>

            <motion.h1
              variants={fadeInUp}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground mb-4 text-glow-red leading-[0.9]"
            >
              Kartix Vale
            </motion.h1>

            <motion.div variants={fadeInUp} className="divider-gold w-48 md:w-64 mx-auto my-6" />

            <motion.p
              variants={fadeInUp}
              className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground/80 italic mb-8"
            >
              &ldquo;Love was never meant to be safe&rdquo;
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <a href="#featured-book">
                <Button
                  size="lg"
                  className="bg-blood-light hover:bg-blood text-white font-semibold px-8 h-12 text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,20,60,0.5)] hover:scale-105"
                  data-track="explore-darkness"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Explore the Darkness
                </Button>
              </a>
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-md mx-auto">
              <p className="text-muted-foreground text-sm mb-3">
                Get a free chapter from the latest release
              </p>
              <EmailCapture source="hero" variant="hero" />
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <a href="#featured-book" className="text-muted-foreground/50 hover:text-blood-light transition-colors">
              <ChevronDown className="h-6 w-6 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED BOOK SECTION ===== */}
      <section id="featured-book" className="py-16 md:py-24 bg-gradient-dark relative">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <p className="text-gold/80 tracking-[0.3em] uppercase text-xs md:text-sm mb-3">
                Featured Release
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                Enter the Fae Court
              </h2>
              <div className="divider-gold w-24 mx-auto mt-4" />
            </motion.div>

            <motion.div variants={fadeInUp}>
              <BookCard
                title={booksData[0].title}
                coverUrl={booksData[0].coverUrl}
                genre={booksData[0].genre}
                price={booksData[0].price}
                amazonUrl={booksData[0].amazonUrl}
                featured
                description={booksData[0].description[0] + " " + booksData[0].description[1]}
                onBookClick={() => openBookModal(booksData[0])}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION DIVIDER IMAGE ===== */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <Image
          src="/section-divider.png"
          alt="Dark forest path"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      </div>

      {/* ===== MORE BOOKS SECTION ===== */}
      <section className="py-16 md:py-24 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <p className="text-gold/80 tracking-[0.3em] uppercase text-xs md:text-sm mb-3">
                The Collection
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                More From the Darkness
              </h2>
              <div className="divider-gold w-24 mx-auto mt-4" />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
            >
              {booksData.map((book, i) => (
                <motion.div key={book.title} variants={fadeInUp}>
                  <BookCard
                    title={book.title}
                    coverUrl={book.coverUrl}
                    genre={book.genre}
                    price={book.price}
                    amazonUrl={book.amazonUrl}
                    onBookClick={() => openBookModal(book)}
                  />
                </motion.div>
              ))}
              {/* Coming Soon placeholder */}
              <motion.div variants={fadeInUp}>
                <BookCard
                  title="Title to be revealed"
                  coverUrl="/coming-soon-cover.svg"
                  genre="Coming Soon"
                  comingSoon
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== ABOUT THE AUTHOR SECTION ===== */}
      <section className="py-16 md:py-24 bg-gradient-dark relative overflow-hidden">
        {/* Background decoration */}
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
                The Mind Behind the Words
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                The Author
              </h2>
              <div className="divider-gold w-24 mx-auto mt-4" />
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
            >
              {/* Mysterious emblem with text logo */}
              <div className="flex-shrink-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-midnight via-blood/20 to-midnight flex items-center justify-center border border-gold/20 relative overflow-hidden shadow-[0_0_40px_rgba(139,0,0,0.2)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="relative logo-text text-3xl md:text-4xl uppercase">
                    Kartix
                  </span>
                </div>
              </div>

              {/* Bio */}
              <div className="text-center md:text-left">
                <p className="text-foreground/90 text-base md:text-lg leading-relaxed mb-4">
                  Kartix Vale writes dark romance that lives in the space between love and obsession,
                  safety and ruin. Drawing from the shadows of fae courts, gothic manors, and the
                  monsters we love, every story asks the same question:{" "}
                  <span className="text-blood-light italic font-serif">
                    What would you sacrifice for love?
                  </span>
                </p>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                  Based nowhere in particular. Writing from the dark.
                </p>
                <a href="#email-capture">
                  <Button
                    variant="outline"
                    className="border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50 transition-all duration-300"
                    data-track="subscribe-about"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Subscribe for Updates
                  </Button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== GENRE HIGHLIGHT SECTION ===== */}
      <section className="py-16 md:py-20 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
                Worlds of Dark Romance
              </h2>
              <div className="divider-gold w-24 mx-auto" />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {[
                { title: "Dark Fae", desc: "Courts of shadow and thorn", icon: "\uD83E\uDEB7" },
                { title: "Paranormal", desc: "Beyond the veil of reality", icon: "\uD83D\uDC41\uFE0F" },
                { title: "Gothic", desc: "Manors, moors, and madness", icon: "\uD83C\uDFF0" },
                { title: "Fantasy", desc: "Magic-woven obsessions", icon: "\u2694\uFE0F" },
                { title: "Mystery", desc: "Love hides in the dark", icon: "\uD83D\uDD11" },
                { title: "Demons & Fae", desc: "Where monsters love deepest", icon: "\uD83D\uDD25" },
              ].map((genre) => (
                <motion.div
                  key={genre.title}
                  variants={fadeInUp}
                  className="card-dark rounded-xl p-5 text-center group hover:border-blood/30 hover:shadow-[0_0_20px_rgba(139,0,0,0.15)] transition-all duration-300"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {genre.icon}
                  </div>
                  <h3 className="font-serif text-lg text-foreground mb-1">
                    {genre.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{genre.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== EMAIL CAPTURE SECTION WITH BACKGROUND ===== */}
      <section id="email-capture" className="relative py-16 md:py-24 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/newsletter-bg.png"
            alt="Dark letter and candle"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-transparent to-[#0a0a0a]" />
        </div>

        <div className="max-w-xl mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <EmailCapture source="email-section" variant="card" />
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <FaqSection />

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 md:py-24 bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blood/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Heart className="h-10 w-10 text-blood-light mx-auto mb-6" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4"
            >
              Ready to Fall Into the Dark?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-base md:text-lg mb-8 max-w-xl mx-auto"
            >
              Your next obsession is one click away. Start reading Thorns of the Fae Thorne today for just $2.99.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <a
                href="https://www.amazon.com/dp/B0H1BTKZ4M"
                target="_blank"
                rel="noopener noreferrer"
                data-track="buy-amazon-cta"
              >
                <Button className="bg-blood-light hover:bg-blood text-white font-semibold px-10 h-14 text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(220,20,60,0.5)] hover:scale-105">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Read Now — $2.99 on Amazon
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#050505] border-t border-border py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            {/* Logo in footer */}
            <div className="mb-4">
              <span className="logo-text text-xl uppercase">
                Kartix
              </span>
            </div>
            <p className="font-serif text-lg text-foreground/60 italic mb-4">
              &ldquo;Love was never meant to be safe&rdquo;
            </p>
            <div className="divider-gold w-16 mx-auto mb-6" />
            <nav className="flex justify-center gap-6 mb-6" aria-label="Footer navigation">
              <a href="/" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">
                Home
              </a>
              <a href="#featured-book" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">
                Books
              </a>
              <a href="#faq" className="text-sm text-muted-foreground hover:text-blood-light transition-colors">
                FAQ
              </a>
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

      {/* ===== BOOK MODAL ===== */}
      <BookModal
        isOpen={isModalOpen}
        onClose={closeModal}
        book={selectedBook}
      />
    </main>
  );
}
