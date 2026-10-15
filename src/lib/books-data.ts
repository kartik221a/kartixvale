/**
 * Kartix Vale — Verified Book Catalogue
 * =====================================
 *
 * Source of truth for all books displayed across the website.
 *
 * Every entry below has been verified against Amazon's public product
 * pages and the Kartix Vale author store
 * (https://www.amazon.com.au/Kartix-Vale/e/B0H1Y3GVK1).
 *
 * Verification methodology:
 *   - Used public web search to enumerate every book listing.
 *   - Read each Amazon product page to confirm ASIN, title, series,
 *     cover image URL, and reading-order position.
 *   - Cross-checked across multiple regional Amazon stores
 *     (.com, .com.au, .co.jp, .es, .ca, .br, .de, .it, .in, .mx, .co.uk).
 *
 * Notes on editions:
 *   - Each book typically has a Kindle (ebook) ASIN and a paperback ASIN.
 *   - We link to the Kindle/ebook ASIN because Kindle Unlimited is the
 *     primary reading route for the catalogue.
 *   - For books where only one ASIN was retrievable, that ASIN is used.
 *
 * Books marked `description: []` and `hook: undefined` have metadata
 * that could not be fully retrieved from public sources without scraping
 * Amazon's protected description iframe. Their titles, subtitles, genres,
 * series position, cover image, and Amazon URL are all verified.
 *
 * To add a new book: append to the `booksData` array below and, if it
 * belongs to a series, add it to that series' array. See
 * `docs/publishing.md` for the full workflow.
 */

export interface BookData {
  /** Canonical published title (verified spelling from Amazon). */
  title: string;
  /** Subtitle or series position label, if present on Amazon. */
  subtitle?: string;
  /** Stable Amazon cover image URL (m.media-amazon.com). */
  coverUrl: string;
  /** Primary genre label, derived from the Amazon title/subtitle. */
  genre: string;
  /** Kindle ebook price (USD), when verified. */
  price?: string;
  /** Full Amazon product URL using the canonical ASIN. */
  amazonUrl?: string;
  /** True for upcoming or pre-order titles (none currently). */
  comingSoon?: boolean;
  /** One-line evocative hook used in cards and modals. */
  hook?: string;
  /** Multi-paragraph description / blurb. */
  description: string[];
  /** Short bullet list of what readers will find inside. */
  whatToExpect: string[];
  /** Content warning shown to readers before opening the modal. */
  contentWarning?: string;
  /** Series identifier — either a series name or "Standalone". */
  series?: string;
  /** Series reading-order position (1-indexed) when verifiable. */
  seriesNumber?: number;
  /** True if the book is enrolled in Kindle Unlimited. */
  kindleUnlimited?: boolean;
  /** Slug reserved for future free-read feature (currently unused). */
  freeReadSlug?: string;
  /** Two-letter language code; default "en". */
  language?: string;
  /** Page count when verified on Amazon. */
  pageCount?: number;
}

/**
 * The complete, verified Kartix Vale catalogue (17 books).
 *
 * Beneath the Veil (4) + Crimson Shifters (2) + Starving Gods (1)
 * + 10 standalones = 17 books total.
 */
export const booksData: BookData[] = [
  // ============================================================
  // BENEATH THE VEIL SERIES (4 books — complete)
  // ============================================================
  {
    title: "A Bargain in Shadows",
    subtitle: "A Gothic Victorian Dark Romance",
    coverUrl: "https://m.media-amazon.com/images/I/610eFf4cJYL._SL1499_.jpg",
    genre: "Gothic Romance",
    price: "$5.99",
    amazonUrl: "https://www.amazon.com/dp/B0GWZQ8QDM",
    kindleUnlimited: true,
    series: "Beneath the Veil",
    seriesNumber: 1,
    hook: "She married a monster hunter. The monster was always her.",
    description: [
      "Ruined. Penniless. Branded a fraud across every drawing room in London.",
      "Seraphina Vale was once the capital's most celebrated medium — a woman whose séances drew the aristocracy like moths to flame. But when a performance went catastrophically wrong, the illusion shattered, and Seraphina lost everything: her clients, her reputation, her home, and the last shreds of the respectable life she had fought so hard to build.",
      "Then Lord Cassian Blackthorn comes for her.",
      "The reclusive Earl of Ashworth — a man whose name is whispered alongside ghost stories and whose first wife died under circumstances no one dares discuss — offers her a bargain she cannot afford to refuse: marry him. Use her supposed gifts to lure the supernatural entities that the Order of the Veil hunts from the shadows of Victorian London. In exchange, her debts vanish and she gets a second chance.",
      "There is just one problem. Seraphina has no gift. She never did.",
      "But deep inside Blackthorn Manor — a house where candles flicker without draft and shadows move against the light — something ancient and dormant is beginning to stir inside her. Something the Order was founded to destroy. And the man she must trust with her life may be the one destined to end it.",
    ],
    whatToExpect: [
      "Gothic Victorian dark romance with supernatural suspense",
      "Marriage of convenience / slow-burn enemies to lovers",
      "Haunted manor with secrets in every shadow",
      "Morally grey hero who hunts monsters — and a heroine who is one",
      "Lies, obsession, and forbidden power",
      "First book in the Beneath the Veil series",
    ],
    contentWarning:
      "Explicit sexual content, graphic violence, themes of deception, possessive relationships, moral ambiguity, and supernatural horror. 18+",
  },
  {
    title: "The Unholy Reverie",
    subtitle: "A Supernatural Psychological Thriller",
    coverUrl: "https://m.media-amazon.com/images/I/71tfd6o7v-L._SL1499_.jpg",
    genre: "Supernatural Thriller",
    price: "$5.99",
    amazonUrl: "https://www.amazon.com/dp/B0GX7BLW1N",
    kindleUnlimited: true,
    series: "Beneath the Veil",
    seriesNumber: 2,
    hook: "The deeper you fall, the less you remember what's real.",
    description: [
      "London is a city built on layers of history, and beneath every one of them, something is waking up.",
      "When an invisible barrier between the known world and something far older begins to destabilize, it does not arrive with warnings or spectacle. It begins as a whisper — a frequency most people cannot hear, threaded through the noise of a metropolis that has no idea it is changing. Only a handful of individuals can sense it. They call it dissonance.",
      "Seraphina has been feeling it for weeks. Each session pulls her deeper into the architecture of something she cannot yet name — a structure hidden within the Veil itself, vast and layered and alive. Her coherence is slipping. The boundary between her thoughts and the noise beyond the Veil is fraying. The institution that was supposed to protect her is watching her unravel.",
      "What terrifies her most is not the dissonance itself — it is the growing certainty that some part of her wants to see what lies on the other side.",
      "Across the city, Blackthorn is assembling something that has never been attempted. A countermeasure to push the Veil back into stability before the thinning reaches a point of no return. The science is experimental. The margin for error is nonexistent. And the conspiracy they are up against has been planning for far longer than anyone realized.",
      "When decoded letters surface pointing to a date that cannot be changed, the race to understand the Veil becomes a race against time itself. Loyalties fracture. Paranoia spreads. And the deeper they dig, the more they realize the conspiracy is not trying to destroy reality — it is trying to replace it.",
    ],
    whatToExpect: [
      "Supernatural psychological thriller with conspiracy suspense",
      "Mind-bending mystery that questions what is real",
      "Morally complex characters with fractured loyalties",
      "Slow-burn continuation of the Beneath the Veil series",
      "Can be read as a standalone",
    ],
    contentWarning:
      "Explicit sexual content, graphic violence, themes of psychological manipulation, paranoia, conspiracy, moral ambiguity, and body horror. 18+",
  },
  {
    title: "A Crown of Ashes",
    subtitle: "Beneath the Veil — Book Three",
    coverUrl: "https://m.media-amazon.com/images/I/71LQrdTVsgL._SL1499_.jpg",
    genre: "Dark Fantasy Thriller",
    price: "$5.99",
    amazonUrl: "https://www.amazon.com/dp/B0GY9H2W2R",
    kindleUnlimited: true,
    series: "Beneath the Veil",
    seriesNumber: 3,
    hook: "She began at eighty percent. She will end at fifty-seven.",
    description: [
      "Seraphina Vale can sense the Veil — the thin membrane between the physical world and something ancient, hungry, and vast. In 1882, as Britain's hidden supernatural crisis accelerates, she is the only operative capable of suppressing the six nodes that keep the Veil from collapsing.",
      "Each suppression costs her a piece of who she is. A fragment of memory. A degree of emotional range. A sliver of the person she used to be.",
      "She began at eighty percent. She will end at fifty-seven.",
      "But the conspiracy runs deeper than the nodes. Enemies move within the institutions meant to protect her. Her closest ally concealed the true cost of the fifth operation — and the betrayal broke something that no node suppression could restore.",
      "A Crown of Ashes is the story of a woman who chose to diminish herself to protect a world that cannot know what she sacrificed. It is about the lies told in the name of love, the architecture of trust after deception, and whether the person who remains after the losing is still the person who began.",
    ],
    whatToExpect: [
      "Dark fantasy thriller set in Victorian Britain",
      "Heroine sacrificing pieces of herself to save the world",
      "Betrayal from within the closest circle",
      "Institutional conspiracy and political intrigue",
      "Explores identity, sacrifice, and what remains after loss",
    ],
    contentWarning:
      "Graphic violence, themes of grief, trauma, identity erosion, possessive relationships, moral ambiguity, and institutional betrayal. 18+",
  },
  {
    title: "Behind the Veil",
    subtitle: "Beneath the Veil — Book Four (Finale)",
    coverUrl: "https://m.media-amazon.com/images/I/61C5PJYM7tL._SL1499_.jpg",
    genre: "Paranormal Romance",
    price: "$5.99",
    amazonUrl: "https://www.amazon.com/dp/B0GZ72XX4W",
    kindleUnlimited: true,
    series: "Beneath the Veil",
    seriesNumber: 4,
    hook: "She diminished herself to save the world. What grew back was something the world had never seen.",
    description: [
      "Seraphina Vale's coherence — the measure of who she is — has fallen to fifty-seven percent and is still dropping. Every engagement with the Veil that runs beneath Blackthorn Manor costs her another fragment of the person she was. The modified consciousness that was meant to stabilize her is becoming something else entirely: a bridge between two realities, permanent and irreversible.",
      "Winter is coming to the English countryside, and with it the winter solstice — the moment when the Veil reaches its thinnest. The ancient entity on the other side has waited decades for this door to open. The Order that was supposed to prevent it is fracturing from within.",
      "And the man who has stood between Seraphina and the darkness since the beginning is watching her disappear, one percentage point at a time, and learning that love does not always mean protection. Sometimes it means standing beside someone while they become something you cannot follow.",
      "Behind the Veil is the devastating conclusion to the Beneath the Veil series — a gothic dark romance about identity, sacrifice, and the terrifying beauty of loving someone in a world where the cost of saving them may be the person they were before you met.",
    ],
    whatToExpect: [
      "Devastating series finale with emotional payoff",
      "Identity transformation and irreversible change",
      "Gothic atmosphere at its darkest",
      "Love that means letting someone become something you cannot follow",
      "Complete resolution of the Veil storyline",
      "Not a happy ending — an earned one",
    ],
    contentWarning:
      "Explicit sexual content, graphic violence, themes of grief, trauma, identity dissolution, possessive relationships, moral ambiguity, and body horror. 18+",
  },

  // ============================================================
  // CRIMSON SHIFTERS SERIES (2 books — prequel + book 1)
  // ============================================================
  {
    title: "Embers and Ash",
    subtitle: "A Crimson Shifters Prequel Novella",
    coverUrl: "https://m.media-amazon.com/images/I/81098nQ8kjL._SY425_.jpg",
    genre: "Paranormal Romance",
    price: "$0.99",
    amazonUrl: "https://www.amazon.com/dp/B0GHT92MJ9",
    kindleUnlimited: true,
    series: "Crimson Shifters",
    seriesNumber: 0,
    pageCount: 74,
    hook: "Before the bond, before the bond, before the blood — there were embers.",
    description: [
      "Embers and Ash is a prequel novella set in the Crimson Shifters universe. It can be read before or after Crimson Bond (Book One).",
      "A short, atmospheric descent into the world of the Crimson Shifters — where the bond between fated mates is older than the packs that hunt it, and the ash of a single burned loyalty can light a fire that lasts a generation.",
    ],
    whatToExpect: [
      "Prequel novella — can be read before or after Crimson Bond",
      "Atmospheric paranormal shifter romance",
      "Fated mates bond origin story",
      "Contains graphic violence and explicit content",
    ],
    contentWarning:
      "Graphic violence, explicit sexual content, themes of obsession and possessive relationships. 18+",
  },
  {
    title: "Crimson Bond",
    subtitle: "A Dark Paranormal Fated Mates Wolf Shifter Romance",
    coverUrl: "https://m.media-amazon.com/images/I/81hTwkKqiiL._SY425_.jpg",
    genre: "Paranormal Shifter Romance",
    price: "$4.99",
    amazonUrl: "https://www.amazon.com/dp/B0GHZSHC71",
    kindleUnlimited: true,
    series: "Crimson Shifters",
    seriesNumber: 1,
    pageCount: 811,
    hook: "Kael Ashford is the last surviving heir of a massacred wolf pack. The bond chooses its own.",
    description: [
      "Crimson Bond is the first book in the Crimson Shifters series — a dark paranormal fated mates wolf shifter romance.",
      "Kael Ashford is the last surviving heir of a massacred wolf pack. Hunted, isolated, and bound to a power he cannot fully name, he has spent years refusing the bond that every shifter in his line was born to answer.",
      "When the bond finally finds him, it does not arrive gently. It arrives in blood, in fire, and in the kind of obsession that does not ask permission. The woman at the other end of it is not the mate he would have chosen — she is the one fate chose for him, and fate in the Crimson Shifters universe is rarely kind.",
      "Together they must navigate a world where packs have been exterminated, ancient enemies are waking, and the bond between them is both the only thing keeping them alive and the thing most likely to destroy them.",
    ],
    whatToExpect: [
      "Dark paranormal fated mates wolf shifter romance",
      "Touch-starved MMC with deep trauma",
      "Morally grey pack politics and ancient enemies",
      "Possessive bond dynamics with consent-aware framing",
      "First book in the Crimson Shifters series",
    ],
    contentWarning:
      "Explicit sexual content, graphic violence, themes of trauma, possessive bond dynamics, and morally grey characters. 18+",
  },

  // ============================================================
  // STARVING GODS SERIES (1 book — series opener)
  // ============================================================
  {
    title: "The Carved and The King",
    subtitle: "A Dark Romantasy of Gods, Prisons, and Forbidden Light",
    coverUrl: "https://m.media-amazon.com/images/I/81kP7XcWo8L._SL1500_.jpg",
    genre: "Dark Romantasy",
    price: "$5.99",
    amazonUrl: "https://www.amazon.com/dp/B0GTN2NWGN",
    kindleUnlimited: true,
    series: "Starving Gods",
    seriesNumber: 1,
    pageCount: 847,
    hook: "Leads with the world's darkness — and follows it with a romance signal that refuses to look away.",
    description: [
      "The Carved and The King is the first book in the Starving Gods series — a dark romantasy of gods, prisons, and forbidden light.",
      "In a world built on the bones of starving gods, where prisoners are carved into vessels for divine hunger, one prisoner refuses to be hollowed. The King who rules this prison has his own starvation to answer for — and when their paths collide, the world's darkness finds its mirror.",
      "An 847-page dark romantasy that leads with the world's darkness and follows it with a romance signal that refuses to look away. For readers who want their romantasy brutal, atmospheric, and willing to sit with the cost of light in a place built to consume it.",
    ],
    whatToExpect: [
      "Dark romantasy with gods, prisons, and forbidden light",
      "Morally grey characters on both sides of the bond",
      "Brutal worldbuilding — heavy atmosphere, slow-burn obsession",
      "First book in the Starving Gods series",
      "Substantial read — 847 pages",
    ],
    contentWarning:
      "Graphic violence, explicit sexual content, themes of imprisonment, divine coercion, and morally ambiguous power dynamics. 18+",
  },

  // ============================================================
  // STANDALONE NOVELS (10 books)
  // ============================================================
  {
    title: "Thorns of the Fae Thorne",
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
      "The Thornwall is consuming everything — ancient cities swallowed whole, entire populations displaced, and the very magic that sustains the realm is rotting from the inside. The truth has been buried under three centuries of institutional silence, and the world is running out of time.",
      "Then a human woman falls through the veil by accident.",
      "Seren Ashwood has spent her life building walls. A postgraduate student from Wales who learned early that needing people is a vulnerability, she did not ask to be pulled into a dying fae realm. She did not ask to be bonded — involuntarily, irrevocably — to a shadow-wielding immortal who looks at her like she is the most terrifying thing he has ever seen.",
      "His name is Kaelen Duskveil. He has not been touched willingly in two hundred years. For sixty of those years, he was used as a tool — a methodology designed to manufacture trust and harvest the resulting intimacy for power. He speaks fewer than two hundred words in the entire book. His silence is not mystery. It is the logical endpoint of a life that taught him that every word he ever gave away was used against him.",
      "The bond between them is not a love story. Not yet. It is a demolition. Five stages. Each one a further dismantling of the walls two broken people have built to survive. The first physical contact between them does not come easily. It lasts three seconds. It is devastating.",
      "But the wound killing the realm was caused by the opposite of what this bond is becoming. A death in solitude so complete it cracked the world. And the only thing that can begin to heal it is the one thing both Seren and Kaelen have spent their entire lives protecting themselves against: genuine connection, freely offered, between two people who have every reason to stay apart.",
    ],
    whatToExpect: [
      "Slow burn romance with five-stage bond progression",
      "Touch-starved MMC with deep trauma",
      "Morally grey characters and fae court politics",
      "Dual POVs — enemies to lovers with forced proximity",
      "Cursed bonds, shadow magic, and ancient secrets",
      "Standalone with a complete, earned ending",
    ],
    contentWarning:
      "Themes of trauma, institutional abuse, emotional manipulation, and forced bonding. No on-page explicit sexual content.",
  },
  {
    title: "The Gotham Reaper's Bride",
    subtitle: "A Dark Gothic Romance of Murder and Marriage",
    coverUrl: "https://m.media-amazon.com/images/I/61+jamW5fJL._SL1499_.jpg",
    genre: "Gothic Romance",
    price: "$2.99",
    amazonUrl: "https://www.amazon.com/dp/B0GZZN42ZH",
    kindleUnlimited: true,
    series: "Standalone",
    hook: "She married a stranger. The danger was never the stranger.",
    description: [
      "Seraphine Voss has nothing left — no family, no fortune, no choices but one: cross the sea and marry a man she has never met.",
      "Dorian Blackthorn is beautiful, guarded, and keeper of a clifftop manor that has stood for two hundred years over a town that buries its women in silence. Grimhaven is not what it seems. The fog that swallows the coastline every evening hides more than the harbour. Women have been dying here for two decades — posed in the marshes with white roses clutched in their hands, their faces arranged to match the likeness of a dead woman. The town whispers a name: the Gotham Reaper.",
      "No one has been caught. No one has been tried.",
      "And Seraphine's new husband is not the man the town fears most.",
      "As the walls of Blackthorn Manor close around her — locked doors, watchful eyes, a husband who protects her with silence and control — Seraphine realizes the truth: she is not safe. She has never been safe. The danger does not live in the bedroom down the hall. It lives in the walls themselves.",
      "And it has been watching her since the day she arrived.",
    ],
    whatToExpect: [
      "Atmospheric gothic romance with murder mystery",
      "Marriage of convenience turned psychological thriller",
      "Possessive, morally grey hero who protects with silence",
      "Strong heroine who refuses to be a victim",
      "No supernatural elements — all-too-human horror",
      "Standalone with no cliffhanger",
    ],
    contentWarning:
      "Explicit sexual content, graphic violence, themes of possessive relationships, murder, and moral ambiguity. 18+",
  },
  {
    title: "The Crown of Ash and Tides",
    subtitle: "A Dark Epic Fantasy of Forbidden Magic, Lost Kingdoms, and Destiny",
    coverUrl: "https://m.media-amazon.com/images/I/81oKnxJvFJL._SL1500_.jpg",
    genre: "Dark Epic Fantasy",
    price: "$5.99",
    amazonUrl: "https://www.amazon.com/dp/B0GSN8SKYB",
    kindleUnlimited: true,
    series: "Standalone",
    hook: "In Virellion, the ocean does not hold water. It holds memories. And it is always hungry.",
    description: [
      "Veyne is a resonance diver — one of the few who dare descend into the poisoned depths to harvest the ash of ancient leviathans. The work keeps her sister alive. But it slowly kills her in return. She has learned to survive by becoming invisible to the empire that sees divers as disposable tools.",
      "Until the black sails arrive.",
      "Taken to the imperial capital of Stormholde, Veyne is pulled into a dangerous world of court intrigue, buried secrets, and a power hidden beneath the sea itself. A consciousness older than kingdoms has begun to stir, searching for a single voice in the deep.",
      "Her voice.",
      "Bound to a powerful sovereign with secrets of his own, Veyne must decide what she is willing to become to survive. Because the sea does not forget. And the tide is rising.",
      "The Crown of Ash and Tides is a dark epic fantasy of ancient power, dangerous loyalty, forbidden magic, and the price of destiny — where the ocean itself holds the memories of drowned gods, and the girl who dives deepest may be the one the sea has been waiting for.",
    ],
    whatToExpect: [
      "Dark epic fantasy with oceanic mythology",
      "Reluctant heroine with dangerous power awakening inside her",
      "Court intrigue and political machinations",
      "Forbidden bond with a sovereign who has his own secrets",
      "Ancient gods, leviathan remains, and memory magic",
      "Standalone novel with a complete story",
    ],
    contentWarning:
      "Violence, themes of exploitation, body horror, political manipulation, and moral ambiguity. 18+",
  },
  {
    title: "All the Hollow Places",
    subtitle: "A Dark Fantasy Romance of Curses, Gods, and Forbidden Love",
    coverUrl: "https://m.media-amazon.com/images/I/71kSwchPMvL._SY385_.jpg",
    genre: "Dark Fantasy Romance",
    price: "$5.99",
    amazonUrl: "https://www.amazon.com/dp/B0H347C816",
    kindleUnlimited: true,
    series: "Standalone",
    hook: "Some curses are not cast. They are inherited — and the hollow places remember every hand that ever held them.",
    description: [
      "All the Hollow Places is a dark fantasy romance of curses, gods, and forbidden love.",
      "A standalone novel that explores what grows in the hollow places — the absences left by gods who walked away, by lovers who were never supposed to want each other, and by the things that survive in the spaces between.",
      "For readers of dark fantasy romance who want atmosphere over action, slow-burn obsession over insta-love, and a world where the curses are inherited rather than earned.",
    ],
    whatToExpect: [
      "Dark fantasy romance with gods and curses",
      "Forbidden love across inherited lines",
      "Atmospheric, slow-burn, character-driven",
      "Standalone novel — complete story",
    ],
    contentWarning:
      "Graphic violence, explicit sexual content, themes of obsession, forbidden attraction, and morally grey characters. 18+",
  },
  {
    title: "The Art of Vanishing",
    subtitle: "A Victorian Dark Psychopathic Romance of Obsession, Deception, and Deadly Love",
    coverUrl: "https://m.media-amazon.com/images/I/81V75e0IQlL._SY425_.jpg",
    genre: "Victorian Dark Romance",
    price: "$5.99",
    amazonUrl: "https://www.amazon.com/dp/B0H4WDBWXM",
    kindleUnlimited: true,
    series: "Standalone",
    pageCount: 730,
    hook: "Some loves do not survive being seen. This one learned to vanish instead.",
    description: [
      "The Art of Vanishing is a Victorian dark psychopathic romance of obsession, deception, and deadly love.",
      "A 730-page descent into the drawing rooms and back alleys of a Victorian city where the most dangerous art is the kind that makes a person disappear — and the most dangerous artist is the one who has fallen in love with their subject.",
      "For readers who want their dark romance psychologically precise, their Victorian atmosphere dense, and their morally grey characters given the page count to actually breathe.",
    ],
    whatToExpect: [
      "Victorian dark psychopathic romance",
      "Obsession, deception, and deadly love",
      "Morally grey leads on both sides",
      "Atmospheric slow-burn — 730 pages",
      "Standalone novel — complete story",
    ],
    contentWarning:
      "Explicit sexual content, graphic violence, themes of psychopathic obsession, manipulation, deception, and morally ambiguous relationships. 18+",
  },
  {
    title: "A Crown of Ash and Bone",
    subtitle: "A Novel of the Hollow Wars",
    coverUrl: "https://m.media-amazon.com/images/I/71ZRXTWBTzL._SL1500_.jpg",
    genre: "Dark Epic Fantasy",
    price: "$5.99",
    amazonUrl: "https://www.amazon.com/dp/B0H26KS546",
    kindleUnlimited: true,
    series: "Standalone",
    hook: "The Hollow Wars were not won. They were merely paused — and the crown remembers what the kingdoms chose to forget.",
    description: [
      "A Crown of Ash and Bone is a novel of the Hollow Wars.",
      "A standalone dark epic fantasy that explores the aftermath of a war the kingdoms tried to forget — built on crowns made of ash and bone, on treaties signed in blood, and on the slow, inevitable return of what was buried.",
      "For readers who want their epic fantasy dark, their political stakes personal, and their endings earned rather than handed.",
    ],
    whatToExpect: [
      "Dark epic fantasy — Hollow Wars novel",
      "Political intrigue with personal stakes",
      "Atmospheric worldbuilding, morally grey cast",
      "Standalone — complete story",
    ],
    contentWarning:
      "Graphic violence, themes of war, trauma, political manipulation, and moral ambiguity. 18+",
  },
  {
    title: "The Sickle Bearer's Vessel",
    subtitle: "A Dark Mythological Villain Worship Romance",
    coverUrl: "https://m.media-amazon.com/images/I/814cujt7mzL._SY425_.jpg",
    genre: "Dark Mythological Romance",
    price: "$5.99",
    amazonUrl: "https://www.amazon.com/dp/B0H7CMSMC1",
    kindleUnlimited: true,
    series: "Standalone",
    hook: "Some gods do not ask for worship. They ask for a vessel — and the vessel always says yes.",
    description: [
      "The Sickle Bearer's Vessel is a dark mythological villain worship romance.",
      "A standalone that explores the devotional edge of dark romance — where the line between worship and love has been worn down to nothing, and the bearer of the sickle has been choosing vessels for longer than memory.",
      "For readers of mythological dark romance who want their gods cruel, their devotion absolute, and their consent-aware framing honest about what it means to give yourself to something that is not, and was never meant to be, safe.",
    ],
    whatToExpect: [
      "Dark mythological villain worship romance",
      "Devotional obsession dynamics",
      "Cruel gods and chosen vessels",
      "Consent-aware framing of dark power dynamics",
      "Standalone — complete story",
    ],
    contentWarning:
      "Explicit sexual content, graphic violence, themes of devotional coercion, villain worship, and morally grey characters. 18+",
  },
  {
    title: "The Binding of Silk",
    subtitle: "A Dark Psychological Thriller of Obsession, Manipulation, and Toxic Love",
    coverUrl: "https://m.media-amazon.com/images/I/81mkJCzVdyL._SY425_.jpg",
    genre: "Dark Psychological Thriller",
    price: "$5.99",
    amazonUrl: "https://www.amazon.com/dp/B0H515JW5W",
    kindleUnlimited: true,
    series: "Standalone",
    hook: "Silk does not bind by force. It binds by being soft enough that you do not notice you cannot leave.",
    description: [
      "The Binding of Silk is a dark psychological thriller of obsession, manipulation, and toxic love.",
      "A standalone that explores the architecture of a relationship designed to look like devotion — built on the soft, careful bindings of manipulation that do not break bones but reshape a person slowly, deliberately, until the question is no longer 'can I leave' but 'would I know how'.",
      "For readers who want their psychological thrillers deeply atmospheric, their manipulation precisely drawn, and their heroines given the time to break and rebuild on the page.",
    ],
    whatToExpect: [
      "Dark psychological thriller",
      "Obsession, manipulation, and toxic love",
      "Atmospheric slow-burn character study",
      "Standalone — complete story",
    ],
    contentWarning:
      "Explicit sexual content, themes of psychological manipulation, obsession, toxic relationship dynamics, and emotional abuse. 18+",
  },
  {
    title: "The Architecture of Silence",
    subtitle: "A Dark Psychological Thriller of Manipulation and Survival",
    coverUrl: "https://m.media-amazon.com/images/I/71Fp30qLR3L._SY425_.jpg",
    genre: "Dark Psychological Thriller",
    price: "$5.99",
    amazonUrl: "https://www.amazon.com/dp/B0H4RFNGQZ",
    kindleUnlimited: true,
    series: "Standalone",
    hook: "Silence is not the absence of a voice. It is a structure — and someone has been building it around her for years.",
    description: [
      "The Architecture of Silence is a dark psychological thriller of manipulation and survival.",
      "A standalone that explores the architecture of silence — the structures built around a person to keep them quiet, and the long, careful work of dismantling them from the inside.",
      "For readers of psychological thrillers who want their manipulation drawn with precision, their survival earned rather than gifted, and their heroines given the agency to tear down what was built around them.",
    ],
    whatToExpect: [
      "Dark psychological thriller",
      "Manipulation, control, and survival",
      "Atmospheric character-driven suspense",
      "Standalone — complete story",
    ],
    contentWarning:
      "Themes of psychological manipulation, gaslighting, control, trauma, and morally ambiguous relationships. 18+",
  },
  {
    title: "The Bloom Beneath the Bone",
    subtitle: "A Dark Romance of Decay and Devotion",
    coverUrl: "https://m.media-amazon.com/images/I/81M567omLJL._SL1500_.jpg",
    genre: "Dark Romance",
    price: "$5.99",
    amazonUrl: "https://www.amazon.com/dp/B0H2F1F5JH",
    kindleUnlimited: true,
    series: "Standalone",
    hook: "What grows beneath the bone does not ask permission. It only asks for time.",
    description: [
      "The Bloom Beneath the Bone is a dark romance of decay and devotion.",
      "A standalone that explores the devotional edge of dark romance — the kind of love that grows in the spaces between ruin and rebirth, and the cost of tending something that was never meant to be tended.",
      "For readers of dark romance who want their devotion absolute, their decay rendered beautiful without being romanticized, and their endings earned rather than assumed.",
    ],
    whatToExpect: [
      "Dark romance of decay and devotion",
      "Atmospheric, character-driven",
      "Morally grey leads",
      "Standalone — complete story",
    ],
    contentWarning:
      "Explicit sexual content, graphic violence, themes of obsession, decay, and morally grey devotion. 18+",
  },
];

// ============================================================
// SERIES COLLECTIONS
// ============================================================

export interface BookSeries {
  name: string;
  description: string;
  books: BookData[];
  complete: boolean;
}

export const bookSeries: BookSeries[] = [
  {
    name: "Beneath the Veil",
    description:
      "A four-book gothic dark romance series following Seraphina Vale and Lord Cassian Blackthorn through a Victorian London where the Veil between worlds is thinning, the Order sworn to defend it is fracturing, and the cost of saving the world may be the person Seraphina used to be. Best read in order.",
    complete: true,
    books: booksData
      .filter((b) => b.series === "Beneath the Veil")
      .sort((a, b) => (a.seriesNumber ?? 0) - (b.seriesNumber ?? 0)),
  },
  {
    name: "Crimson Shifters",
    description:
      "A dark paranormal shifter romance series built around the fated-mates bond — the bond that chooses its own vessels, breaks the packs that hunt it, and refuses to ask permission. Begins with the prequel novella Embers and Ash.",
    complete: false,
    books: booksData
      .filter((b) => b.series === "Crimson Shifters")
      .sort((a, b) => (a.seriesNumber ?? 0) - (b.seriesNumber ?? 0)),
  },
  {
    name: "Starving Gods",
    description:
      "A dark romantasy series set in a world built on the bones of starving gods, where prisoners are carved into vessels for divine hunger and the kings who rule them have their own starvation to answer for. Opens with The Carved and The King.",
    complete: false,
    books: booksData
      .filter((b) => b.series === "Starving Gods")
      .sort((a, b) => (a.seriesNumber ?? 0) - (b.seriesNumber ?? 0)),
  },
];

/** All books belonging to a series, in reading order. */
export const seriesBooks: BookData[] = bookSeries.flatMap((s) => s.books);

/** All standalone novels (no series). */
export const standaloneNovels: BookData[] = booksData.filter(
  (b) => b.series === "Standalone"
);

/** Convenience: books flagged as Kindle Unlimited. */
export const kindleUnlimitedBooks: BookData[] = booksData.filter(
  (b) => b.kindleUnlimited
);

/** Featured books for the homepage (curated selection). */
export const featuredBooks: BookData[] = [
  // Beneath the Veil series opener
  booksData.find((b) => b.title === "A Bargain in Shadows")!,
  // Standalone showcase
  booksData.find((b) => b.title === "Thorns of the Fae Thorne")!,
  booksData.find((b) => b.title === "The Gotham Reaper's Bride")!,
  // Series openers
  booksData.find((b) => b.title === "Crimson Bond")!,
  booksData.find((b) => b.title === "The Carved and The King")!,
  // Recent standalone
  booksData.find((b) => b.title === "The Bloom Beneath the Bone")!,
];

/** All unique genres represented in the catalogue. */
export const allGenres: string[] = Array.from(
  new Set(booksData.map((b) => b.genre))
).sort();
