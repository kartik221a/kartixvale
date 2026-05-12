const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  PageBreak, Header, Footer, PageNumber, NumberFormat,
  AlignmentType, HeadingLevel, WidthType, BorderStyle, ShadingType,
  PageOrientation,
} = require("docx");
const fs = require("fs");

// Dark romance palette — Ink Gold (IG-1)
const P = {
  primary: "1A1A1A",
  body: "2A2A2A",
  secondary: "6E6560",
  accent: "C9A84C",
  surface: "FBF9F7",
};

const c = (hex) => hex.replace("#", "");

// ─── Component Builders ───

function bookTitle(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 600, after: 80 },
    children: [new TextRun({ text, bold: true, color: P.primary, font: { ascii: "Times New Roman", eastAsia: "SimHei" }, size: 36 })],
  });
}

function bookSubtitle(text) {
  return new Paragraph({
    spacing: { before: 0, after: 200 },
    children: [new TextRun({ text, italics: true, color: P.secondary, font: { ascii: "Times New Roman" }, size: 22 })],
  });
}

function hookLine(text) {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    children: [new TextRun({ text, bold: true, italics: true, color: P.accent, font: { ascii: "Times New Roman" }, size: 26 })],
  });
}

function bodyPara(text) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 160, line: 312 },
    children: [new TextRun({ text, color: P.body, font: { ascii: "Times New Roman" }, size: 24 })],
  });
}

function bodyParaItalic(text) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 160, line: 312 },
    children: [new TextRun({ text, italics: true, color: P.body, font: { ascii: "Times New Roman" }, size: 24 })],
  });
}

function sectionLabel(text) {
  return new Paragraph({
    spacing: { before: 300, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: P.accent, space: 4 } },
    children: [new TextRun({ text, bold: true, color: P.primary, font: { ascii: "Times New Roman" }, size: 24 })],
  });
}

function bulletItem(text) {
  return new Paragraph({
    spacing: { after: 60, line: 312 },
    indent: { left: 480 },
    children: [
      new TextRun({ text: "\u2022  ", color: P.accent, font: { ascii: "Times New Roman" }, size: 24 }),
      new TextRun({ text, color: P.body, font: { ascii: "Times New Roman" }, size: 24 }),
    ],
  });
}

function metaInfo(label, value) {
  return new Paragraph({
    spacing: { after: 60, line: 312 },
    children: [
      new TextRun({ text: label, bold: true, color: P.secondary, font: { ascii: "Times New Roman" }, size: 22 }),
      new TextRun({ text: value, color: P.body, font: { ascii: "Times New Roman" }, size: 22 }),
    ],
  });
}

function divider() {
  return new Paragraph({
    spacing: { before: 400, after: 400 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "\u2015\u2015\u2015  \u2699  \u2015\u2015\u2015", color: P.accent, font: { ascii: "Times New Roman" }, size: 20 })],
  });
}

function amazonCopyLabel(text) {
  return new Paragraph({
    spacing: { before: 200, after: 80 },
    shading: { type: ShadingType.CLEAR, fill: "F5F0E5" },
    indent: { left: 120, right: 120 },
    children: [new TextRun({ text, bold: true, italics: true, color: P.accent, font: { ascii: "Times New Roman" }, size: 20 })],
  });
}

// ─── Book Data ───

const books = [
  {
    title: "Thorns of the Fae Thorne",
    subtitle: "A Slow Burn Dark Fae Romance",
    asin: "B0H1BTKZ4M",
    kindlePrice: "$2.99",
    paperbackPrice: "$25.99",
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
      "Standalone novel with a complete, earned ending",
    ],
    whatYouWontFind: [
      "Instalust or instant love",
      "On-page explicit sexual content",
      "A fairy tale ending \u2014 but an earned one",
    ],
    contentWarning: "Themes of trauma, institutional abuse, emotional manipulation, and forced bonding. No on-page explicit sexual content.",
    compTitles: "For fans of The Bridge Kingdom, The Serpent and the Wings of Night, and A Court of Thorns and Roses \u2014 but slower, darker, and earned.",
    wordCount: "~110,000 words",
  },
  {
    title: "The Gotham Reaper\u2019s Bride",
    subtitle: "A Dark Gothic Romance of Murder and Marriage",
    asin: "B0GZZN42ZH",
    kindlePrice: "$2.99",
    paperbackPrice: "Coming Soon",
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
    whatYouWontFind: [
      "Supernatural or paranormal elements",
      "Cliffhangers or unresolved endings",
      "A passive heroine who waits to be saved",
    ],
    contentWarning: "Explicit sexual content, graphic violence, themes of possessive relationships, murder, and moral ambiguity. 18+",
    compTitles: "For readers who loved the atmospheric dread of Rebecca, the marriage-gone-wrong tension of Jane Eyre, and the dark romance of The Haunting of Hill House.",
    wordCount: "~115,000 words",
  },
  {
    title: "A Bargain in Shadows",
    subtitle: "A Gothic Victorian Dark Romance (Beneath the Veil \u2014 Book One)",
    asin: "B0GWZQ8QDM",
    kindlePrice: "$5.99",
    paperbackPrice: "$29.99",
    kindleUnlimited: true,
    series: "Beneath the Veil \u2014 Book One",
    seriesOrder: "Prequel: His Darkest Vow | Book One: A Bargain in Shadows | Book Two: The Unholy Reverie | Book Three: A Crown of Ashes | Book Four: Behind the Veil",
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
    whatYouWontFind: [
      "Instalove or fast-burn romance",
      "A passive or naive heroine",
      "Standalone ending \u2014 this is Book One of a series",
    ],
    contentWarning: "Explicit sexual content, graphic violence, themes of deception, possessive relationships, moral ambiguity, and supernatural horror. 18+",
    compTitles: "For fans of The Bargainer series, A Discovery of Witches, and Crimson Peak \u2014 gothic atmosphere, slow-burn tension, and a heroine who is far more dangerous than anyone suspects.",
    wordCount: "~120,000 words",
  },
  {
    title: "The Unholy Reverie",
    subtitle: "A Supernatural Psychological Thriller (Beneath the Veil \u2014 Book Two)",
    asin: "B0GX7BLW1N",
    kindlePrice: "$5.99",
    paperbackPrice: "$29.99",
    kindleUnlimited: true,
    series: "Beneath the Veil \u2014 Book Two",
    seriesOrder: "Prequel: His Darkest Vow | Book One: A Bargain in Shadows | Book Two: The Unholy Reverie | Book Three: A Crown of Ashes | Book Four: Behind the Veil",
    hook: "The deeper you fall, the less you remember what\u2019s real.",
    description: [
      "London is a city built on layers of history, and beneath every one of them, something is waking up.",
      "When an invisible barrier between the known world and something far older begins to destabilize, it does not arrive with warnings or spectacle. It begins as a whisper \u2014 a frequency most people cannot hear, threaded through the noise of a metropolis that has no idea it is changing. Only a handful of individuals can sense it. They call it dissonance.",
      "Seraphina has been feeling it for weeks. Each session pulls her deeper into the architecture of something she cannot yet name \u2014 a structure hidden within the Veil itself, vast and layered and alive. Her coherence is slipping. The boundary between her thoughts and the noise beyond the Veil is fraying. The institution that was supposed to protect her is watching her unravel. And the countdown toward an event they barely understand is accelerating with every passing day.",
      "What terrifies her most is not the dissonance itself \u2014 it is the growing certainty that some part of her wants to see what lies on the other side.",
      "Across the city, Blackthorn is assembling something that has never been attempted. A countermeasure to push the Veil back into stability before the thinning reaches a point of no return. The science is experimental. The margin for error is nonexistent. And the conspiracy they are up against has been planning for far longer than anyone realized.",
      "When decoded letters surface pointing to a date that cannot be changed, and an operative embedded deep within the network is finally identified, the race to understand the Veil becomes a race against time itself. Loyalties fracture. Paranoia spreads. And the deeper they dig, the more they realize that the conspiracy is not trying to destroy reality \u2014 it is trying to replace it.",
    ],
    whatToExpect: [
      "Supernatural psychological thriller with conspiracy suspense",
      "Mind-bending mystery that questions what is real",
      "Morally complex characters with fractured loyalties",
      "Slow-burn continuation of the Beneath the Veil series",
      "Can be read as a standalone",
      "Atmospheric tension and creeping dread",
    ],
    whatYouWontFind: [
      "Simple good-vs-evil dynamics",
      "Fast-paced action over psychological depth",
      "A clean resolution \u2014 answers come at a cost",
    ],
    contentWarning: "Explicit sexual content, graphic violence, themes of psychological manipulation, paranoia, conspiracy, moral ambiguity, and body horror. 18+",
    compTitles: "For fans of The Silent Patient, The Outsider, and Dark \u2014 mind-bending psychological tension meets supernatural conspiracy in Victorian London.",
    wordCount: "~130,000 words",
  },
  {
    title: "A Crown of Ashes",
    subtitle: "A Dark Fantasy Thriller (Beneath the Veil \u2014 Book Three)",
    asin: "B0GY9H2W2R",
    kindlePrice: "$5.99",
    paperbackPrice: "$30.99",
    kindleUnlimited: true,
    series: "Beneath the Veil \u2014 Book Three",
    seriesOrder: "Prequel: His Darkest Vow | Book One: A Bargain in Shadows | Book Two: The Unholy Reverie | Book Three: A Crown of Ashes | Book Four: Behind the Veil",
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
      "Third book in the Beneath the Veil series",
      "Explores identity, sacrifice, and what remains after loss",
    ],
    whatYouWontFind: [
      "Light or hopeful tone \u2014 this one is devastating by design",
      "Simple romance \u2014 love here is complicated by betrayal",
      "A neat resolution \u2014 the cost is real and permanent",
    ],
    contentWarning: "Graphic violence, themes of grief, trauma, identity erosion, possessive relationships, moral ambiguity, and institutional betrayal. 18+",
    compTitles: "For fans of The Poppy War, The Fifth Season, and The Traitor Baru Cormorant \u2014 dark fantasy where the cost of power is the self.",
    wordCount: "~115,000 words",
  },
  {
    title: "Behind the Veil",
    subtitle: "A Dark Gothic Paranormal Romance (Beneath the Veil \u2014 Book Four)",
    asin: "B0GZ72XX4W",
    kindlePrice: "$5.99",
    paperbackPrice: "$35.99",
    kindleUnlimited: true,
    series: "Beneath the Veil \u2014 Book Four (Series Finale)",
    seriesOrder: "Prequel: His Darkest Vow | Book One: A Bargain in Shadows | Book Two: The Unholy Reverie | Book Three: A Crown of Ashes | Book Four: Behind the Veil",
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
    whatYouWontFind: [
      "A clean, painless resolution",
      "The same Seraphina you started with",
      "Standalone reading \u2014 this is the series finale, read Books 1\u20133 first",
    ],
    contentWarning: "Explicit sexual content, graphic violence, themes of grief, trauma, identity dissolution, possessive relationships, moral ambiguity, and body horror. 18+",
    compTitles: "For readers who reached the end of The Locked Tomb series and needed something that hurts just as much \u2014 gothic dark romance where the love story is the horror story.",
    wordCount: "~125,000 words",
  },
  {
    title: "The Crown of Ash and Tides",
    subtitle: "A Dark Epic Fantasy of Forbidden Magic, Lost Kingdoms, and Destiny",
    asin: "B0GSN8SKYB",
    kindlePrice: "$5.99",
    paperbackPrice: "$25.99",
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
    whatYouWontFind: [
      "A chosen one who embraces her destiny willingly",
      "Simple politics or clear-cut villains",
      "Romance as the central plot \u2014 power and survival come first",
    ],
    contentWarning: "Violence, themes of exploitation, body horror, political manipulation, and moral ambiguity. 18+",
    compTitles: "For fans of The Bone Shard Daughter, The Poppy War, and The City of Brass \u2014 dark epic fantasy where the magic costs more than anyone should pay.",
    wordCount: "~120,000 words",
  },
];

// ─── Build Document ───

function buildBookSection(book, index) {
  const children = [];

  // Book number + title
  children.push(bookTitle(`Book ${index + 1}: ${book.title}`));
  children.push(bookSubtitle(book.subtitle));

  // Meta info
  children.push(metaInfo("ASIN: ", book.asin));
  children.push(metaInfo("Kindle Price: ", book.kindlePrice + (book.kindleUnlimited ? " (Kindle Unlimited)" : "")));
  children.push(metaInfo("Paperback: ", book.paperbackPrice));
  children.push(metaInfo("Series: ", book.series));
  if (book.wordCount) children.push(metaInfo("Length: ", book.wordCount));
  children.push(new Paragraph({ spacing: { after: 100 } }));

  // Hook line
  children.push(sectionLabel("HOOK LINE"));
  children.push(hookLine(book.hook));

  // Main description
  children.push(sectionLabel("DESCRIPTION"));
  for (const para of book.description) {
    // Short paragraphs get italic treatment for emphasis
    if (para.length < 80) {
      children.push(bodyParaItalic(para));
    } else {
      children.push(bodyPara(para));
    }
  }

  // What to expect
  children.push(sectionLabel("WHAT TO EXPECT"));
  for (const item of book.whatToExpect) {
    children.push(bulletItem(item));
  }

  // What you won't find
  children.push(sectionLabel("WHAT YOU WON\u2019T FIND"));
  for (const item of book.whatYouWontFind) {
    children.push(bulletItem(item));
  }

  // Content warning
  children.push(sectionLabel("CONTENT WARNING"));
  children.push(bodyPara(book.contentWarning));

  // Comp titles
  children.push(sectionLabel("FOR FANS OF"));
  children.push(bodyParaItalic(book.compTitles));

  // Series order if applicable
  if (book.seriesOrder) {
    children.push(sectionLabel("SERIES READING ORDER"));
    children.push(bodyPara(book.seriesOrder));
  }

  // Amazon KDP HTML note
  children.push(amazonCopyLabel("TIP: Copy the description text above and format in Amazon KDP using <b>, <i>, <br>, and <ul>/<li> HTML tags."));

  return children;
}

// ─── Cover Section ───
// Using R1 (Pure Paragraph Left) with IG-1 (Ink Gold) palette

const coverBg = "1A1A1A";
const coverAccent = "C9A84C";

function buildCover() {
  const NB = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  const allNoBorders = { top: NB, bottom: NB, left: NB, right: NB, insideHorizontal: NB, insideVertical: NB };

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: allNoBorders,
    rows: [
      new TableRow({
        height: { value: 16838, rule: "exact" },
        children: [
          new TableCell({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: allNoBorders,
            shading: { type: ShadingType.CLEAR, fill: coverBg },
            verticalAlign: "top",
            children: [
              new Paragraph({ spacing: { before: 4800 } }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                indent: { left: 1200 },
                spacing: { line: 920, lineRule: "atLeast" },
                children: [
                  new TextRun({ text: "KARTIX VALE", color: coverAccent, font: { ascii: "Times New Roman" }, size: 72, bold: true }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                indent: { left: 1200 },
                spacing: { before: 200, after: 200 },
                border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: coverAccent, space: 20 } },
                children: [
                  new TextRun({ text: "Love was never meant to be safe", italics: true, color: "B0B8C0", font: { ascii: "Times New Roman" }, size: 28 }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                indent: { left: 1200 },
                spacing: { before: 400 },
                children: [
                  new TextRun({ text: "Amazon Book Descriptions", color: "90989F", font: { ascii: "Times New Roman" }, size: 24 }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.LEFT,
                indent: { left: 1200 },
                spacing: { before: 80 },
                children: [
                  new TextRun({ text: "Sales-Optimized Copy \u2014 Ready for KDP", color: "687078", font: { ascii: "Times New Roman" }, size: 22 }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

// ─── Introduction Section ───

function buildIntro() {
  const children = [];

  children.push(new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 200, after: 200 },
    children: [new TextRun({ text: "How to Use This Document", bold: true, color: P.primary, font: { ascii: "Times New Roman" }, size: 32 })],
  }));

  children.push(bodyPara("This document contains sales-optimized Amazon book descriptions for all seven Kartix Vale titles. Each description has been rewritten using proven dark romance conversion copy strategies while preserving the author\u2019s original voice and story details."));

  children.push(new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 120 },
    children: [new TextRun({ text: "What Changed and Why", bold: true, color: P.primary, font: { ascii: "Times New Roman" }, size: 28 })],
  }));

  children.push(bodyPara("Hook Line: Every description now opens with a single, punchy line designed to stop the scroll. This is the most important sentence on the entire Amazon page \u2014 it appears above the \u201cRead More\u201d fold and determines whether a browser becomes a reader. Dark romance readers make split-second buying decisions based on trope and tone; the hook line delivers both instantly."));

  children.push(bodyPara("Description Structure: Paragraphs are kept short and punchy. Mobile readers (over 70% of Amazon traffic) skip walls of text. Each paragraph is a single beat \u2014 one revelation, one emotional hit, one question that demands an answer. Short dramatic lines are italicized to create visual rhythm and draw the eye down the page."));

  children.push(bodyPara("What to Expect / What You Won\u2019t Find: Dark romance readers shop by tropes. They want to know exactly what they are getting into and, equally important, what boundaries the book respects. The \u201cWhat to Expect\u201d list is your sales pitch in bullet form \u2014 it maps directly to search intent. The \u201cWhat You Won\u2019t Find\u201d list prevents negative reviews from readers who expected something different, which protects your rating and your algorithmic visibility."));

  children.push(bodyPara("For Fans Of (Comp Titles): Comparison titles serve double duty \u2014 they tell readers \u201cif you loved X, you will love this\u201d while also feeding Amazon\u2019s recommendation engine. Mentioning well-known series creates an immediate emotional association that a synopsis alone cannot achieve."));

  children.push(bodyPara("Content Warning: This is not optional in dark romance. Readers who encounter triggering content without warning leave 1-star reviews. Readers who are warned upfront become your most loyal audience because they trust you. Trust equals repeat purchases."));

  children.push(bodyPara("Series Reading Order: For the Beneath the Veil series, the reading order is now prominently displayed at the bottom of each series book. This prevents the \u201cI started with Book Three and was confused\u201d reviews that kill series momentum."));

  children.push(new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 120 },
    children: [new TextRun({ text: "Formatting for Amazon KDP", bold: true, color: P.primary, font: { ascii: "Times New Roman" }, size: 28 })],
  }));

  children.push(bodyPara("Amazon supports basic HTML in book descriptions. When copying descriptions into KDP, use the following tags to maintain formatting: <b> for bold text (hook lines and emphasis), <i> for italics, <br> for line breaks between paragraphs, and <ul><li> for bullet lists (What to Expect / What You Won\u2019t Find). Avoid using heading tags (<h1>, <h2>) as Amazon\u2019s renderer handles them inconsistently across devices."));

  children.push(bodyPara("For best results on mobile, keep each paragraph to 2\u20133 sentences max. The italicized short lines in these descriptions create a visual rhythm that is particularly effective on phone screens, where most dark romance purchases happen."));

  return children;
}

// ─── Assemble Document ───

const bodyChildren = [...buildIntro()];

for (let i = 0; i < books.length; i++) {
  bodyChildren.push(divider());
  bodyChildren.push(...buildBookSection(books[i], i));
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: { ascii: "Times New Roman", eastAsia: "Microsoft YaHei" },
          size: 24,
          color: P.body,
        },
        paragraph: {
          spacing: { line: 312 },
        },
      },
      heading1: {
        run: {
          font: { ascii: "Times New Roman", eastAsia: "SimHei" },
          size: 32,
          bold: true,
          color: P.primary,
        },
        paragraph: { spacing: { before: 360, after: 160, line: 312 } },
      },
      heading2: {
        run: {
          font: { ascii: "Times New Roman", eastAsia: "SimHei" },
          size: 28,
          bold: true,
          color: P.primary,
        },
        paragraph: { spacing: { before: 240, after: 120, line: 312 } },
      },
    },
  },
  sections: [
    // Cover section
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838, orientation: PageOrientation.PORTRAIT },
          margin: { top: 0, bottom: 0, left: 0, right: 0 },
        },
      },
      children: [buildCover()],
    },
    // Body section
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838, orientation: PageOrientation.PORTRAIT },
          margin: { top: 1440, bottom: 1440, left: 1701, right: 1417 },
          pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL },
        },
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({ children: [PageNumber.CURRENT], size: 18, color: P.secondary }),
              ],
            }),
          ],
        }),
      },
      children: bodyChildren,
    },
  ],
});

// ─── Generate ───

const OUTPUT = "/home/z/my-project/download/Kartix_Vale_Amazon_Book_Descriptions.docx";

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUTPUT, buf);
  console.log("Document generated: " + OUTPUT);
});
