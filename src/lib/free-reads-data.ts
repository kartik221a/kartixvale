export interface FreeReadBook {
  slug: string;
  title: string;
  subtitle?: string;
  coverUrl: string;
  genre: string;
  amazonUrl?: string;
  price?: string;
  kindleUnlimited?: boolean;
  hook: string;
  chapters: {
    number: number;
    title: string;
    content: string; // HTML content
  }[];
}

export const freeReadBooks: FreeReadBook[] = [
  {
    slug: "thorns-of-the-fae-thorne",
    title: "Thorns of the Fae Thorne",
    subtitle: "A Slow Burn Dark Fae Romance",
    coverUrl: "https://m.media-amazon.com/images/I/61kY61LNZ-L._SY522_.jpg",
    genre: "Dark Fae Romance",
    amazonUrl: "https://www.amazon.com/dp/B0H1BTKZ4M",
    price: "$2.99",
    kindleUnlimited: true,
    hook: "The bond between them is not a love story. Not yet. It is a demolition.",
    chapters: [
      {
        number: 1,
        title: "Chapter One",
        content: `<p>Three hundred years ago, something broke the world.</p>
<p>The fae court has been lying about it ever since.</p>
<p>Seren Ashwood had read those words in a dozen academic papers, scrolled past them in late-night forums, and once — just once — typed them into a search bar at three in the morning when the rest of the house was asleep and the question felt too big for daylight. She had never expected to <em>feel</em> them.</p>
<p>The veil tore open on a Tuesday.</p>
<p>She had been walking home from the university library in Aberystwyth, her rucksack heavy with overdue texts on Celtic myth and postgraduate anxiety, the Welsh wind doing what it always did — pushing, pulling, insisting she go somewhere she hadn't planned. The sky was the colour of iron. The sea was a wall of grey on the horizon. Normal. Predictable. <em>Safe.</em></p>
<p>And then the air split.</p>
<p>Not like glass — nothing so clean. It split like fabric, like old cotton pulled too hard between two hands, and the sound it made was not a crack but a <em>tear</em>. Seren felt it before she heard it: a pressure change in her chest, the way your ears pop on a plane, except the plane was the ground beneath her feet and it was no longer entirely certain it was solid.</p>
<p>She stopped walking. The streetlight above her flickered — once, twice — and then went dark. The next one did the same. Then the next. A wave of darkness rolling toward her down the pavement, each light dying as it reached her, as if something was following her shadow and the streetlamps were flinching away from it.</p>
<p>Seren did what any rational person would do.</p>
<p>She turned around.</p>
<p>The tear in the air was ten feet behind her. It hung like a wound — edges ragged, light bleeding from it in colours she didn't have names for. Through it, she could see trees. Not the grey-brick buildings of the promenade. Trees. Ancient, enormous, their trunks black as ironwood, their branches reaching toward a sky that was not her sky. The light on the other side was wrong. Purple and silver and <em>old</em>, the way starlight is old — already traveling for millions of years before it reaches your eyes.</p>
<p>She should have run. Every rational cell in her body screamed <em>run</em>. But Seren Ashwood had spent her entire life running from things — from conversations that mattered, from people who got too close, from the terrifying vulnerability of needing anyone — and she was so <em>tired</em> of it.</p>
<p>She stepped forward.</p>
<p>The veil closed behind her like a door that had been waiting for her to walk through it.</p>
<p>The silence was the first thing she noticed. Not the absence of sound — this was a forest, after all, and forests are never silent — but the absence of <em>familiarity</em>. The wind here had a different weight. The ground beneath her feet was soft and cold and smelled of something she couldn't name, something between ash and rain and the ghost of a fire that had burned out centuries ago.</p>
<p>The trees were wrong. Not in shape — they were trees, after all, trunks and branches and the architecture of growth — but in <em>presence</em>. They were aware. Seren couldn't explain it any other way. The bark shifted as she passed, not moving, not reaching, but <em>adjusting</em>. Making room. Acknowledging her the way a crowd parts for someone important.</p>
<p>She was not important. She was a postgraduate student from Wales with a tendency to push people away and a talent for building walls. The trees should not have been making room for her.</p>
<p>"You should not be here."</p>
<p>The voice came from everywhere and nowhere. It was low, measured, and utterly devoid of warmth. Not cruel — that would have required investment. This was something colder. The voice of someone who had stopped expecting the world to be kind and had organized his entire existence around that certainty.</p>
<p>Seren turned slowly.</p>
<p>He was standing between two of the ironwood trees, half in shadow, half in that strange purple-silver light. Tall — impossibly tall, the way all fae were supposed to be, except the stories hadn't prepared her for the reality of it. He wasn't beautiful. Beautiful was too soft a word, too human a concept. He was <em>devastating</em>. Sharp features, black hair that fell past his jaw, eyes the colour of a bruise just before it heals — purple-grey and full of something ancient and cold.</p>
<p>He wore shadow the way other people wore clothes. It clung to him, moved with him, deepened the darkness around him until the space he occupied seemed to <em>hold</em> more night than the spaces around it.</p>
<p>He did not step forward. He did not extend a hand. He looked at her the way you might look at a wound you didn't cause but will have to treat: with the careful distance of someone who has learned that getting too close always costs something.</p>
<p>"I said —" His voice was a blade. Quiet. Precise. "— you should not be here."</p>
<p>Seren swallowed. Her heart was hammering so hard she could feel it in her fingertips. "I know," she said. "I stepped through the — I don't know what that was. A door? A tear? I didn't mean to —"</p>
<p>"You <em>chose</em> to step through."</p>
<p>It wasn't a question. The way he said it made her realize it was true. She <em>had</em> chosen. Not accidentally, not instinctively — she had chosen to walk toward something unknown instead of running from it. For the first time in her life.</p>
<p>"Yes," she said quietly. "I did."</p>
<p>Something shifted in his expression. Not softening — nothing about this creature could be called soft. But a flicker of something that might have been recognition. As if he, too, understood what it meant to choose the unknown over the safety of the familiar.</p>
<p>It lasted half a second. Then the shadow around him deepened, and his face became a wall.</p>
<p>"Then you are either very brave or very foolish," he said. "The distinction rarely matters here."</p>
<p>He turned and walked into the forest. He did not look back. He did not invite her to follow. He simply left, as if the conversation was over and she would have to decide for herself what came next.</p>
<p>Seren Ashwood stood alone in a dying fae realm with no way home, a bond she hadn't asked for already beginning to form in the space between her ribs, and a choice that wasn't really a choice at all.</p>
<p>She followed him into the dark.</p>`,
      },
      {
        number: 2,
        title: "Chapter Two",
        content: `<p>The realm was dying. She could feel it.</p>
<p>Not in the way you feel cold or hunger — those were sensations with edges, boundaries, the possibility of remedy. This was something else. A resonance, deep in the marrow of the world itself, like standing next to a bell that had been struck centuries ago and was still vibrating, still ringing, still losing pieces of itself to the air with every fading pulse.</p>
<p>The forest was beautiful in the way a wound is beautiful — all that raw, exposed colour, the purple-black of bruised flesh, the silver of scar tissue. The trees reached for each other overhead in a canopy so dense that the purple-silver sky was visible only in fragments, like looking at stars through a shattered ceiling. Between the roots, the ground pulsed with faint light — not bioluminescence, not anything as simple as that — but something older. Residual. The echo of magic that had been <em>alive</em> once, vital and thrumming, and was now guttering like a candle in a room where the air was being deliberately stolen.</p>
<p>She followed him for what felt like an hour. He walked ahead of her without speaking, without slowing, without once checking to see if she was still there. The shadow around him moved like a living thing — not clinging, not trailing, but <em>accompanying</em>. As if the darkness itself had chosen him as its host and they had long since reached an understanding about the terms of their cohabitation.</p>
<p>She studied him as she walked. The way he moved — fluid, soundless, each step placed with the precision of someone who had learned that carelessness attracts attention and attention attracts danger. The set of his shoulders — not tense, not guarded, but <em>contained</em>. As if he had compressed himself into the smallest possible version of what he was, not to hide, but because existing at full capacity required more energy than the world deserved.</p>
<p>He had not spoken since telling her she was either brave or foolish. She had not tried to make him. Some silences are hostile; his was not. It was architectural — a structure he had built around himself, brick by careful brick, until it was strong enough to keep everything out. Including her. <em>Especially</em> her.</p>
<p>Because she could feel it now. The bond.</p>
<p>It was not a thread, not a chain, not any of the metaphors the stories used. It was a <em>frequency</em>. A resonance between her chest and the space where he walked, thirty feet ahead, shadow-wrapped and silent. Like two strings tuned to the same pitch — when one vibrates, the other answers. She felt it as a pull. Not physical. Not emotional. Something deeper than both, something that operated beneath the level of choice, in the part of a person that decides to breathe and blink and keep the heart beating without ever consulting the conscious mind.</p>
<p>The bond was pulling her toward him.</p>
<p>And every fibre of her being — every wall she had built, every distance she had maintained, every time she had chosen solitude over the terrifying vulnerability of connection — was pulling her back.</p>
<p>The contradiction was exhausting. By the time the trees began to thin and the shape of a building materialized through the purple-grey mist, Seren was trembling. Not from cold. Not from fear. From the effort of holding herself together when something fundamental was trying to pull her apart.</p>
<p>He stopped at the edge of the clearing. Did not turn around. Spoke to the space in front of him as if she weren't there.</p>
<p>"You will stay here. You will not leave this structure. You will not wander. You will not touch anything. And you will not —" A pause, precise as a held breath. "— speak to me unless I speak to you first."</p>
<p>Seren stared at the back of his head. At the shadow that rippled across his shoulders like a tide. At the rigid line of his spine, which was not anger — she knew anger, had built entire relationships around it — but something far more dangerous.</p>
<p>Fear.</p>
<p>He was afraid. Of her. Of whatever this bond was doing. Of the proximity that neither of them had chosen and both of them were already fighting.</p>
<p>The realization should have made her angry. Instead, it made her <em>recognize</em> him. Because she knew that kind of fear. The kind that doesn't flinch — it fortifies. The kind that doesn't run — it builds walls so high and so thick that nothing can get through, not even the things that might save you. Especially not those.</p>
<p>"I understand," she said quietly.</p>
<p>His shoulders moved. A fraction of an inch. Not a shrug — a flinch. As if her voice, her compliance, her simple acknowledgment of his terms was something he hadn't prepared for and didn't know how to defend against.</p>
<p>He walked into the building. The door closed behind him with a sound like a coffin lid.</p>
<p>Seren stood in the clearing and looked up at the purple-silver sky of a dying world and thought: <em>I have been alone my entire life. I chose it. I was good at it. And now something is happening to me that I did not choose and cannot control, and the only other person who understands it won't even look at me.</em></p>
<p>She sat down on the cold stone step and wrapped her arms around herself and did not cry, because crying requires hope that someone might hear you, and she had given up on that a long time ago.</p>
<p>Inside the building, behind a door that was not locked but might as well have been a continent, a shadow-wielding immortal stood in absolute darkness and pressed his back against the wall and breathed in counts of four, the way they had taught him in the years after — after — and waited for the shaking to stop.</p>
<p>It did not stop.</p>
<p>It would not stop for a very long time.</p>`,
      },
      {
        number: 3,
        title: "Chapter Three",
        content: `<p>Seren did not sleep.</p>
<p>The room he had given her — <em>given</em>, she thought, was generous; <em>designated</em> was more accurate, the way a jailer designates a cell — was sparse in a way that felt deliberate. A cot with a single blanket. A table with a candle that never guttered and never went out, its flame the same steady amber hour after hour, as if even the fire here was under orders. A window that looked out onto the purple-grey mist and nothing else.</p>
<p>She lay on the cot and stared at the ceiling and felt the bond like a second heartbeat in her chest, out of sync with her own, pulling toward a point somewhere in the building that she couldn't see but could feel with a precision that terrified her.</p>
<p>He was in the east wing. Two floors up. Behind a door she was absolutely certain was closed.</p>
<p>She knew this the way she knew her own name — not because anyone had told her, but because the information was simply <em>there</em>, embedded in the frequency between them, available whether she wanted it or not. The bond was not invasive. It didn't rifle through her thoughts or steal her secrets. It was worse than that. It was <em>honest</em>. It told her true things about him — his location, his general state, the edges of his emotional weather — without context, without explanation, without any of the lies that people use to make proximity bearable.</p>
<p>Right now, the bond told her he was not sleeping either.</p>
<p>Right now, the bond told her the space where his emotions should be was a void. Not empty — void. The difference mattered. Empty is a cup with no water. Void is a cup with no <em>concept</em> of water, no memory of it, no architecture that would allow it to hold anything at all.</p>
<p>He had not always been like this. The bond, in its ruthless honesty, showed her the shape of what was missing — the <em>negative space</em> where something had been before it was taken or given away or burned out of him. She couldn't see what had been there. Only the crater it had left behind.</p>
<p>Seren pulled the blanket tighter and hated the bond and hated this world and hated herself for stepping through that tear in the air instead of doing the smart thing, the safe thing, the thing she had done every single day of her life until yesterday.</p>
<p>But a quieter voice — the one she usually ignored, the one that lived beneath all her walls — whispered a question she didn't want to answer.</p>
<p><em>What if the smart thing and the safe thing were never the same?</em></p>
<p>Morning came without a sunrise. The purple-silver sky simply lightened by a degree, the way a bruise shifts from purple to violet, and Seren understood that this world did not have a sun — not anymore. Whatever had broken three hundred years ago had taken the light with it, and the fae had been living in the aftermath ever since, pretending the glow that remained was enough.</p>
<p>She found food on the table she was certain had been empty the night before. Bread. Something that might have been fruit if fruit came in colours that didn't exist. Water in a cup made of a dark, polished stone.</p>
<p>He had been in the room while she lay on the cot pretending to sleep. He had left food and left no trace of himself — no footstep, no shadow, no sound. The bond told her he had been there and gone within minutes, long enough to set the plate down and retreat, like feeding a wild animal you were afraid would bite.</p>
<p>She was the wild animal. The thought should have stung. Instead, it settled into her chest with the weight of recognition. He was afraid of her. She was afraid of connection. They were both building walls. The only difference was that his were made of shadow and hers were made of silence, and both of them were pretending the walls were for protection when really they were prisons.</p>
<p>Seren ate the bread. It tasted like nothing she could name. She drank the water. It was the coldest, cleanest thing she had ever tasted, as if it had been drawn from a source that predated pollution and memory and the terrible things people do to water to make it carry their waste instead of their prayers.</p>
<p>Then she opened the door and stepped into the corridor and looked for him.</p>
<p>The bond made it easy. Embarrassingly easy. She followed the frequency the way you follow a sound you can't ignore — not because you want to, but because silence has become unbearable. Down a hallway of black stone. Past windows that looked out onto a forest being slowly consumed by something dark and creeping at its edges. Through a door that was not closed — left open, she realized, deliberately. An invitation so reluctant it could barely bring itself to exist.</p>
<p>He was standing at the far end of a room that might have been a library once. Shelves lined the walls, but half of them were empty, the books — or whatever the fae equivalent of books was — gone, as if someone had been slowly removing knowledge from this place, one volume at a time, until only the architecture of learning remained and the content had been hollowed out.</p>
<p>He did not turn around when she entered.</p>
<p>"I told you not to leave your room."</p>
<p>"You left the door open."</p>
<p>Silence. The shadow around him rippled — not with anger, she was learning to tell the difference, but with something closer to discomfort. As if her logic had found a gap in his walls and was pressing against it.</p>
<p>"An oversight," he said.</p>
<p>"A choice," she corrected.</p>
<p>He turned then. Slowly. The way you turn toward something you've been avoiding — not because you want to face it, but because the act of turning is the only way to prove you're still capable of it. His eyes found hers across the room, and the bond <em>surged</em>, a sudden spike in the frequency between them, and Seren felt her breath catch and saw his hands tighten at his sides and knew — <em>knew</em> — that he felt it too.</p>
<p>"This bond," he said, and his voice was not a blade this time. It was something rawer. A wire pulled taut and vibrating. "It is not a gift. It is not a blessing. It is a consequence of the tear in the veil, and it will fade when the tear is mended. You will return to your world. I will remain in mine. And we will never speak of this again."</p>
<p>He said it like a vow. Like a prayer. Like something he had already decided was true and was trying to make true by sheer force of repetition.</p>
<p>Seren looked at him — at the void where his emotions should be, at the shadow clinging to his frame like armor, at the hands that were shaking, barely, a tremor so small she never would have seen it if the bond weren't amplifying every detail of him — and she said the only honest thing she could.</p>
<p>"You don't believe that."</p>
<p>The shadow around him <em>flinched</em>.</p>
<p>And for the first time since she had fallen through the veil into a dying world, something other than fear or cold or the relentless pull of an unwanted bond settled between them.</p>
<p>It was the smallest crack in the largest wall she had ever seen. And it was enough.</p>`,
      },
    ],
  },
  {
    slug: "a-bargain-in-shadows",
    title: "A Bargain in Shadows",
    subtitle: "Beneath the Veil — Book One",
    coverUrl: "https://m.media-amazon.com/images/I/610eFf4cJYL._SL1499_.jpg",
    genre: "Gothic Romance",
    amazonUrl: "https://www.amazon.com/dp/B0GWZQ8QDM",
    price: "$5.99",
    kindleUnlimited: true,
    hook: "She married a monster hunter. The monster was always her.",
    chapters: [
      {
        number: 1,
        title: "Chapter One",
        content: `<p>Ruined. Penniless. Branded a fraud across every drawing room in London.</p>
<p>Seraphina Vale sat in the cold remains of her rented parlour and watched the last of her reputation being carried out the door in the form of a newspaper. The <em>Morning Chronicle</em> had been particularly creative this time — "SHAMELESS DECEPTION" in bold type, with an illustration that made her look less like a disgraced medium and more like a common pickpocket. Her landlady had left it outside her door with the rent notice pinned on top, which was either passive-aggression or efficiency, depending on one's perspective.</p>
<p>The séance had gone wrong. Catastrophically, publicly, <em>spectacularly</em> wrong. The kind of wrong that doesn't merely end a career but incinerates it, scatters the ashes, and salts the earth where it stood so that nothing may ever grow there again.</p>
<p>She had been London's most celebrated medium for three years. The aristocracy had flocked to her parlour — duchesses with dead husbands, earls with guilty consciences, debutantes who wanted to know if their intended truly loved them. Seraphina had given them what they came for: comfort, closure, the soothing fiction that the dead were at peace and the living were forgiven. She had been very, very good at it.</p>
<p>The fact that none of it had been real did not, in her estimation, diminish its value. The comfort was real. The closure was real. Only the method was theatre, and if the theatre produced genuine relief, was it not a kind of truth?</p>
<p>The <em>Morning Chronicle</em> did not share her philosophical position.</p>
<p>Nor did her creditors. Nor did the five families who had prepaid for sessions they now demanded refunded, with interest, and a written apology, and Seraphina's head on a silver platter if it could be arranged.</p>
<p>She owed money to everyone. The landlord. The dressmaker. The candle merchant — an especially bitter irony, given her profession. The bank. The friends who were no longer friends, because in London society, debt is contagious and association with a disgraced woman is a death sentence of its own.</p>
<p>The knock came at seven o'clock.</p>
<p>Not her landlady — Mrs. Hutchinson knocked with the rhythm of a firing squad, sharp and impatient and final. This knock was different. Deliberate. Measured. The knock of someone who had never been kept waiting and did not intend to start now.</p>
<p>Seraphina opened the door and found a man she had never seen before standing in the hallway as if he owned it. He was tall, dark-haired, dressed in black so absolute it seemed to absorb the gaslight from the wall sconces. His face was angular and pale, the kind of face that belonged in portraits from a century ago — beautiful in a way that felt more threatening than attractive, as if beauty were merely the sheath for something sharper beneath.</p>
<p>His eyes were grey. Not the warm grey of a winter sky, but the cold grey of a blade, and they were examining her with the clinical detachment of a doctor assessing a patient he has already decided cannot be saved.</p>
<p>"Miss Vale," he said. It was not a question.</p>
<p>"I'm not receiving visitors."</p>
<p>"You are now." He stepped past her into the parlour without invitation, his coat brushing the doorframe, his presence filling the room the way cold fills a house in winter — not gradually, but all at once, completely, and without permission.</p>
<p>Seraphina closed the door because there was nothing else to do. You do not argue with a force of nature. You observe it and hope it passes without destroying you.</p>
<p>He stood in the centre of her ruined parlour — the furniture sheeted, the curtains half-drawn, the last candle burning low on the mantel — and he looked at the space around him with an expression that might have been distaste or might have been familiarity. As if he, too, knew what it felt like to inhabit a room that had already decided you were leaving.</p>
<p>"My name is Lord Cassian Blackthorn," he said. "The Earl of Ashworth."</p>
<p>Seraphina knew the name. Everyone in London knew the name. Blackthorn was whispered about in the same breath as ghost stories and cautionary tales — a reclusive nobleman whose manor in the north of England was said to be haunted, whose first wife had died under circumstances that no one discussed and everyone speculated about, whose interest in the supernatural was not academic but personal.</p>
<p>"I know who you are," she said carefully.</p>
<p>"Then you know why I'm here."</p>
<p>She didn't. But she was beginning to suspect she wouldn't like it.</p>
<p>He reached into his coat and withdrew an envelope — thick, cream-coloured, sealed with wax the colour of dried blood. He placed it on the table between them with the precision of a man laying down a weapon.</p>
<p>"I have a proposition for you, Miss Vale. A bargain, if you prefer."</p>
<p>The word <em>bargain</em> settled into the room like a stone dropped into still water. In the stories — the old stories, the ones Seraphina had read in those late-night forums and academic papers and the margins of texts that polite society pretended didn't exist — a bargain with a stranger in black was the beginning of every catastrophe. The fae dealt in bargains. Demons dealt in bargains. Desperate women in cold parlours should not deal in bargains.</p>
<p>She picked up the envelope. Broke the seal. Read.</p>
<p>And felt the floor of her already-ruined life give way beneath her feet entirely.</p>`,
      },
      {
        number: 2,
        title: "Chapter Two",
        content: `<p>The bargain was simple. The simplicity was the trap.</p>
<p>Lord Blackthorn required a wife. Specifically, he required a wife who could perform the duties of a medium — who could, in the presence of the supernatural entities that haunted the corners of Victorian England, draw them out, engage them, and allow the Order of the Veil to do what the Order had been doing for centuries: keep the membrane between the physical world and whatever lay beyond it intact.</p>
<p>Seraphina was not the first medium he had approached. She was, however, the most desperate.</p>
<p>"You want me to marry you," she said flatly, setting the document on the table as if it were contaminated. "And haunt houses for your secret society."</p>
<p>"The Order of the Veil is not a secret society. It is an institution with royal charter and ecclesiastical oversight. And I am not asking you to haunt houses. I am asking you to serve as a conduit — a role for which you have, until recently, been uniquely qualified."</p>
<p>"I was a fraud."</p>
<p>"You were <em>effective</em>." The correction was delivered without inflection, as if the distinction were obvious. "Whether the spirits you conjured were genuine is immaterial to me. What matters is that you created an environment in which the participants <em>believed</em> they were experiencing something supernatural. Belief is a kind of door, Miss Vale. And doors, once opened, may allow more through than intended."</p>
<p>Seraphina stared at him. The candlelight carved his face into planes of shadow and light, and she thought, irrelevantly, that he looked like a man carved from the same stone as his manor — beautiful, cold, and hiding cracks that would not be visible until the whole structure collapsed.</p>
<p>"And if I refuse?"</p>
<p>"Then you will be imprisoned for debt by the end of the week. Your creditors have been patient, Miss Vale, but patience has limits, and yours have been reached. I know this because I have spoken with them. I have also spoken with your landlady, your dressmaker, and the magistrate who will sign your committal order." He paused. "I am not threatening you. I am describing the landscape you currently occupy. The offer I am making is the only bridge across it."</p>
<p>The anger came then — hot, sudden, and familiar. The anger of a woman who had been managing her own catastrophe, in her own way, on her own terms, and was now being told that her terms had been revoked by a stranger in black who had apparently been orchestrating her circumstances from a distance.</p>
<p>"You arranged this," she said. "The creditors. The urgency. You made sure I would have no other options."</p>
<p>"I ensured the options you had would lead you here." The distinction, again, delivered without apology. "There is a difference between trapping someone and clearing a path. You may resent the method, Miss Vale, but I suspect you will find the destination more agreeable than the alternative."</p>
<p>The alternative was debtors' prison. Cold stone, thin gruel, and the slow erosion of whatever dignity remained after the newspapers had finished with her. She had heard stories — women who went into prison as ladies and emerged as ghosts of themselves, if they emerged at all.</p>
<p>And this man — this cold, precise, infuriating man — was offering her a way out. A marriage of convenience. A position within a world she had only pretended to understand. A second chance, wrapped in shadows and secrets and the particular danger that lived in the grey expanse of his eyes.</p>
<p>"I have no gift," she said quietly. "What I did was theatre. Illusion. There is nothing <em>real</em> inside me."</p>
<p>Lord Blackthorn looked at her then — truly looked, for the first time since entering the room. And something shifted in those blade-grey eyes. Not warmth. Not kindness. But recognition, maybe. The acknowledgment of a fellow liar.</p>
<p>"We shall see," he said.</p>
<p>He left the document on the table and walked out without another word. The door closed behind him with a sound that Seraphina would later recognize as the first hinge of a trap springing shut around a life that had been, until that moment, merely difficult — and was about to become something far, far worse.</p>
<p>Or far better. The distinction, she was learning, rarely mattered in the dark.</p>`,
      },
    ],
  },
  {
    slug: "the-gotham-reapers-bride",
    title: "The Gotham Reaper's Bride",
    subtitle: "A Dark Gothic Romance",
    coverUrl: "https://m.media-amazon.com/images/I/61+jamW5fJL._SL1499_.jpg",
    genre: "Gothic Romance",
    amazonUrl: "https://www.amazon.com/dp/B0GZZN42ZH",
    price: "$2.99",
    kindleUnlimited: true,
    hook: "She married a stranger. The danger was never the stranger.",
    chapters: [
      {
        number: 1,
        title: "Chapter One",
        content: `<p>The letters arrived on the same day — the proposal and the obituary.</p>
<p>Seraphine Voss held them in either hand and understood, with the calm clarity of a woman who had nothing left to lose, that her life was about to end in one direction or another. The obituary was for her last living relative — an aunt she had met twice, who had left her nothing but a stack of unpaid bills and the kind of reputation that clings to a family name like mildew. The proposal was from a man she had never met, in a country she had never visited, and it was written in handwriting so precise it looked engraved.</p>
<p><em>Dear Miss Voss,</em></p>
<p><em>I am writing regarding a matter of mutual benefit. I require a wife. You require a future. I am prepared to offer the latter in exchange for the former. My manor in Grimhaven, England, awaits. Your passage is arranged. The ship leaves in four days.</em></p>
<p><em>Yours,</em></p>
<p><em>Dorian Blackthorn</em></p>
<p>No warmth. No courtship. No pretense that this was anything other than what it was — a transaction between two people who had run out of alternatives. Seraphine should have been offended. She should have burned the letter and found another way. She should have done many things.</p>
<p>But she was twenty-three, orphaned, destitute, and one unpaid rent notice away from the kind of life that doesn't bear describing in polite company. The letter, cold as it was, represented something she hadn't felt in months: the possibility of survival.</p>
<p>Four days later, she boarded a ship to England with a single trunk, her aunt's funeral card, and the uneasy certainty that she was making either the best decision of her life or the last.</p>
<p>The crossing was rough. The Atlantic in late autumn was a grey, heaving creature that seemed personally invested in reminding every passenger that the ocean does not care about human plans. Seraphine spent most of the voyage in her cabin, reading the only other document Dorian Blackthorn had sent — a brief, clinical description of Grimhaven and its history, written in the same precise hand as the proposal.</p>
<p>Grimhaven. A clifftop town on the north coast of England, population declining, perpetually shrouded in fog. The manor — Blackthorn Manor — had stood for two hundred years on the cliffs above the harbour, a Gothic sprawl of dark stone and darker history. Blackthorn's first wife had died there. The document did not say how. It did not need to. The silence on the subject was louder than any explanation.</p>
<p>Seraphine read the document three times and then sat in her narrow bunk and listened to the sea and thought about the women she had known who had married strangers — her mother, first among them — and how that particular story always seemed to end the same way: with a woman standing in a doorway she could not close, looking back at a life she could not return to, and forward into a darkness that may or may not contain a home.</p>
<p>When the ship docked, the fog was waiting for her.</p>
<p>It clung to the harbour like something alive — not the gentle mist of a summer morning, but a thick, grey presence that seemed to have opinions about who should be allowed to pass through it. The driver who met her was silent. The carriage was black. The road to Grimhaven climbed steadily away from the harbour and into the fog, and Seraphine watched the town disappear behind her — the fishing boats, the grey stone cottages, the few faces that turned to watch the carriage pass — and felt the familiar sensation of a door closing at her back.</p>
<p>Blackthorn Manor emerged from the fog like a secret the landscape had been keeping. Dark stone. Tall windows that reflected nothing. A door that was already open, as if the house had been expecting her — had, perhaps, always been expecting her — and was not interested in the formalities of welcoming committees or second thoughts.</p>
<p>Her husband was standing in the entrance hall.</p>
<p>He was not what she had expected. The letter had suggested a man of order, control, and precision — someone who approached marriage the way one approaches a contract, with terms and conditions and the expectation of compliance. The reality was different. Dorian Blackthorn was beautiful in the way that dangerous things are beautiful — all sharp edges and dark surfaces and the promise that getting too close would cost you. His eyes were the grey-green of the sea on a storm day. His expression was closed. His hand, when he extended it, was cold.</p>
<p>"Welcome to Blackthorn Manor, Mrs. Blackthorn."</p>
<p>The name felt like a key turning in a lock. Or a cell door closing. She couldn't tell which yet.</p>
<p>"Thank you for having me," she said, because politeness was the only armor she had left, and she intended to wear it until something better came along.</p>
<p>His mouth twitched. Not a smile — nothing so warm. A recognition, perhaps, that they were both pretending this was normal, and that the pretense was the only thing standing between them and the truth: that they were two strangers who had agreed to share a house, a name, and whatever darkness lived in the walls, and that the odds of this ending well were approximately equal to the odds of the fog lifting.</p>
<p>He showed her to her room. It was large, cold, and overlooked the cliff. The window faced the sea. The curtains were heavy. The bed was enormous. There was a lock on the inside of the door, and when Seraphine noticed it, she also noticed that her husband had not mentioned it — had, in fact, turned away just quickly enough to suggest that the lock was a detail he preferred she discover on her own.</p>
<p>A husband who wanted his new wife to be able to lock her door.</p>
<p>It was the first kind thing he had done. It was also, she would later realize, the first warning.</p>`,
      },
    ],
  },
  {
    slug: "crown-of-ash-and-tides",
    title: "The Crown of Ash and Tides",
    subtitle: "A Dark Epic Fantasy",
    coverUrl: "https://m.media-amazon.com/images/I/81oKnxJvFJL._SL1500_.jpg",
    genre: "Dark Epic Fantasy",
    amazonUrl: "https://www.amazon.com/dp/B0GSN8SKYB",
    price: "$5.99",
    kindleUnlimited: true,
    hook: "In Virellion, the ocean does not hold water. It holds memories. And it is always hungry.",
    chapters: [
      {
        number: 1,
        title: "Chapter One",
        content: `<p>The ocean held Veyne's sister in its memory, and Veyne held the ocean in her lungs.</p>
<p>Not literally — not yet, though the ash did that to you, eventually. Crept into the places you didn't know were empty and filled them with something that was not quite death but was certainly not life. The other divers called it the Tide-Mark: the invisible line where your body stopped being yours and started belonging to the deep. Everyone had a different line. Some divers hit it after five years. Some after ten. Veyne had been diving for seven, and she could feel the Mark approaching the way you feel a storm — not in the sky, but in the bones.</p>
<p>She surfaced with a haul that would keep Nemi alive for another month and herself one dive closer to the line that couldn't be uncrossed. The ash glowed faintly in her palms — leviathan residue, the compressed remains of creatures that had died before the empire had a name, before the sea had settled into its current shape, before anything that walked on land had learned to swim. The alchemists in Stormholde paid well for it. The divers who harvested it paid in years they would never live.</p>
<p>Veyne hauled herself onto the rocks and lay there, breathing, counting her pulse, making sure it still belonged to her. The harbour of Saltmere was quiet in the way harbours are quiet when the fleet is out and the only people left are the ones too old or too young or too broken to dive. A few boats bobbed at their moorings. The grey stone of the town climbed the cliff behind her. Above it all, the watchtower stood empty, as it had for three years, since the last watchman had walked into the sea and not come back.</p>
<p>She thought about Nemi. About the medicine that cost more than Veyne could earn in a month of dives. About the way her sister's cough had deepened over the winter, each breath a small act of defiance against lungs that were slowly filling with something the healers couldn't name. The ash was killing Veyne from the outside in. The disease — if it was a disease — was killing Nemi from the inside out. Between the two of them, they were a study in the different ways the world consumes the people who are trying to survive it.</p>
<p>The black sails appeared on the horizon as the sun was dying.</p>
<p>Not merchant sails — those were white, or brown, or the faded grey of cloth that had spent too long at sea. These were <em>black</em>. Impossibly black, the kind of black that doesn't reflect light but absorbs it, as if the sails themselves were made of the same void that lived at the bottom of the ocean, where the leviathans slept and the pressure was so great that nothing should exist but somehow still did.</p>
<p>The imperial fleet. Here. In Saltmere.</p>
<p>Imperial ships did not visit harbour towns. Harbour towns existed to be exploited from a distance — quotas set, prices dictated, divers treated as disposable instruments of the empire's alchemical appetite. The fleet came to the coast only when something had gone very wrong, or when something was about to.</p>
<p>Veyne watched the sails multiply on the horizon and felt a chill that had nothing to do with the water drying on her skin. The ocean, which had been silent a moment ago, was now <em>humming</em>. A low, resonant sound that she could feel in the ash-scarred tissue of her lungs, in the marrow of her bones, in the deep, quiet place where her own frequency met the frequency of the deep and they recognized each other.</p>
<p>The sea knew something she didn't.</p>
<p>And it was trying to tell her.</p>`,
      },
    ],
  },
  {
    slug: "the-unholy-reverie",
    title: "The Unholy Reverie",
    subtitle: "Beneath the Veil — Book Two",
    coverUrl: "https://m.media-amazon.com/images/I/71tfd6o7v-L._SL1499_.jpg",
    genre: "Supernatural Thriller",
    amazonUrl: "https://www.amazon.com/dp/B0GX7BLW1N",
    price: "$5.99",
    kindleUnlimited: true,
    hook: "The deeper you fall, the less you remember what's real.",
    chapters: [
      {
        number: 1,
        title: "Chapter One",
        content: `<p>London was built on layers of the dead, and the dead were beginning to notice.</p>
<p>Seraphina Vale could feel it — a frequency running beneath the noise of the city, threaded through the rattle of carriages and the cry of street vendors and the relentless mechanical heartbeat of a metropolis that had convinced itself it was the centre of the world. The frequency was not sound. It was not vibration. It was something older than both, something that existed in the space between the physical and the impossible, and it had been growing louder for weeks.</p>
<p>She stood at the window of the London townhouse that the Order of the Veil had provided — a generous word for what was essentially a gilded cage with better curtains — and pressed her palm against the cold glass. The city spread below her in a haze of coal smoke and gaslight, beautiful and poisonous, and somewhere beneath it, in the forgotten rivers and buried crypts and the spaces between walls that had been standing since before the Great Fire, the Veil was thinning.</p>
<p>She could feel the thinning the way she could feel her own heartbeat — involuntary, inescapable, and getting faster.</p>
<p>Her coherence was at seventy-three percent.</p>
<p>She knew this with the same terrible precision with which she knew her own name. The number had been measured three days ago by the Order's physicians, who had subjected her to a battery of tests that felt more like interrogations than examinations. Coherence: the measure of how much of Seraphina Vale remained. How much of her personality, her memory, her emotional range, the architecture of who she was — how much was still intact after six months of engaging with the Veil.</p>
<p>She had begun at eighty percent. She was at seventy-three. The trajectory was not encouraging.</p>
<p>"You should be resting."</p>
<p>She did not turn around. The voice was familiar now — Blackthorn's voice, carrying its usual cocktail of concern and command, the emotional range of a man who had been taught that caring about someone meant controlling their circumstances.</p>
<p>"I can't sleep," she said. "The frequency is louder tonight."</p>
<p>A pause. Then the sound of him crossing the room, his footsteps precise and measured, and then he was standing beside her at the window, close enough that she could feel the particular cold that radiated from him — not the cold of temperature, but the cold of someone who had spent so long protecting himself from warmth that his presence had become a climate of its own.</p>
<p>"I feel it too," he said quietly. "It's accelerating."</p>
<p>The word settled between them like a stone in still water. Accelerating. The Veil was not merely thinning — it was thinning faster. Whatever barrier existed between the physical world and whatever lay beyond it was not merely degrading; it was being <em>pulled</em> apart, as if something on the other side had found a thread and was tugging, steadily, patiently, with the absolute certainty of a creature that had nothing but time.</p>
<p>"The letters," Seraphina said. "The ones decoded last week. What did they say?"</p>
<p>Blackthorn did not answer immediately. When he did, his voice was careful in the way that people are careful when they are choosing which truth to tell and which to withhold — a distinction that Seraphina had learned to recognize because she had once made her living doing exactly the same thing.</p>
<p>"They referenced a date," he said. "A specific date. Six months from now."</p>
<p>"And?"</p>
<p>He turned to look at her. The gaslight caught his face, and she saw something in his expression that she had never seen before — not in all the months of their marriage of convenience, not in the slowly thawing silence between them, not in the rare and devastating moments when the walls came down and she glimpsed the person he might have been before the world taught him to hide.</p>
<p>Fear. Genuine, unmasked, shaking fear.</p>
<p>"And if the Veil continues to thin at this rate," he said, "on that date, it won't just open. It will <em>invert</em>. And everything we know about the boundary between worlds will be wrong."</p>
<p>Outside, the city hummed its mechanical song, unaware that beneath its foundations, something ancient was waking up. And Seraphina stood at the window and felt the frequency in her bones and knew — with the calm clarity of a woman who was slowly losing herself one percentage point at a time — that the worst was not behind them.</p>
<p>The worst was still coming. And it had a date.</p>`,
      },
    ],
  },
  {
    slug: "a-crown-of-ashes",
    title: "A Crown of Ashes",
    subtitle: "Beneath the Veil — Book Three",
    coverUrl: "https://m.media-amazon.com/images/I/71LQrdTVsgL._SL1499_.jpg",
    genre: "Dark Fantasy Thriller",
    amazonUrl: "https://www.amazon.com/dp/B0GY9H2W2R",
    price: "$5.99",
    kindleUnlimited: true,
    hook: "She began at eighty percent. She will end at fifty-seven.",
    chapters: [
      {
        number: 1,
        title: "Chapter One",
        content: `<p>The node was screaming, and so was Seraphina.</p>
<p>Not aloud — she had learned to silence the audible screaming months ago, after the third suppression, when the Order's physicians had informed her that vocalizing the pain actually <em>increased</em> the coherence cost. The body, they explained with the detached precision of men who had never experienced what they were describing, interprets vocalization as distress. Distress accelerates fragmentation. Fragmentation is irreversible. Therefore: silence.</p>
<p>She had become very, very good at silence.</p>
<p>The node beneath the Yorkshire moors was the fifth of six. Each one was a point where the Veil — the membrane between the physical world and the vast, hungry something that existed beyond it — was anchored to reality. When a node destabilized, the Veil thinned. When the Veil thinned, things came through. When things came through, people died in ways that the official reports described as "anomalous" because the truth was too terrifying to commit to paper.</p>
<p>Seraphina's job was simple. She reached into the node, found the frequency that was causing the destabilization, and suppressed it. The process took between thirty seconds and two minutes. The cost was a fragment of who she was.</p>
<p>She had begun at eighty percent. After the fifth suppression, she was at sixty-four.</p>
<p>The mathematics were brutal and unambiguous. Six nodes. One more suppression remaining. And the trajectory of her coherence loss suggested that the final suppression would take her to approximately fifty-seven percent — a number that the Order's physicians had quietly flagged as the boundary between "functional" and "significantly impaired," a clinical euphemism for the point at which the person you were before is no longer the person you will be after.</p>
<p>She was kneeling on the moorland in the dark, her hands pressed into the cold earth, the frequency of the node vibrating through her like a second pulse. The suppression was complete. The node was stable. The Veil, at this location, would hold.</p>
<p>And Seraphina had just lost another piece of herself that she would never get back.</p>
<p>She stood slowly. The moor stretched around her in every direction — vast, dark, empty, the kind of landscape that reminds you how small you are and how indifferent the world is to your survival. The wind carried the smell of heather and rain and something else, something that didn't belong — the faint, metallic tang of the Veil, leaking through the thinned barrier like blood through a bandage.</p>
<p>Blackthorn was waiting by the carriage. He had not watched the suppression — he never did, not because he couldn't bear to see her in pain, but because his presence during the process had been shown to increase the coherence cost by two to three percent. The bond between them, involuntary and irrevocable, meant that his concern for her wellbeing actually <em>harmed</em> her during suppression, and this paradox — that the person who cared about her most could not be present when she needed care — had carved something out of both of them that no node suppression could account for.</p>
<p>She walked toward him. Each step felt lighter than the last — not because the burden had lifted, but because she was becoming less. Less weight. Less presence. Less <em>her</em>.</p>
<p>"It's done," she said.</p>
<p>He looked at her with those blade-grey eyes, and she watched him count — the quick, involuntary assessment of how much remained. She could see him doing the mathematics. Could see him calculating the distance between sixty-four percent and fifty-seven. Could see him reaching the same conclusion she had.</p>
<p>"One more," he said.</p>
<p>"One more," she agreed.</p>
<p>They did not discuss what would happen after. They had learned — the hard way, the only way they ever learned anything — that discussing the future was a luxury reserved for people who still had one. Seraphina's future was a number. Sixty-four, heading to fifty-seven. The question was not whether she would survive the final suppression. The question was whether whoever remained at the other end of it would still be someone worth saving.</p>
<p>The carriage carried them south, toward the last node, toward the number that would define whatever was left of her life. And in the silence between them — a silence that was no longer hostile, no longer defensive, but simply <em>full</em>, the way a room is full when two people have said everything that matters and are left with nothing but the weight of each other's presence — Seraphina Vale counted the remaining pieces of who she was and tried not to wonder which one she would miss the most.</p>`,
      },
    ],
  },
  {
    slug: "behind-the-veil",
    title: "Behind the Veil",
    subtitle: "Beneath the Veil — Book Four (Finale)",
    coverUrl: "https://m.media-amazon.com/images/I/61C5PJYM7tL._SL1499_.jpg",
    genre: "Paranormal Romance",
    amazonUrl: "https://www.amazon.com/dp/B0GZ72XX4W",
    price: "$5.99",
    kindleUnlimited: true,
    hook: "She diminished herself to save the world. What grew back was something the world had never seen.",
    chapters: [
      {
        number: 1,
        title: "Chapter One",
        content: `<p>Fifty-seven percent. Still dropping.</p>
<p>The number followed Seraphina like a shadow — her own shadow, the one she couldn't outrun because it was attached to the soles of her feet and the weight of her bones and the diminishing architecture of everything she had ever been. Fifty-seven percent. More than half. Less than whole. The mathematical description of a person who is still present but no longer complete, like a house with most of its rooms still standing but several of the walls beginning to bow.</p>
<p>She stood in the garden of Blackthorn Manor and watched the winter come. The solstice was three weeks away. The Veil, at this point in the year, was always at its thinnest — the old traditions had gotten that much right, even if they had misunderstood the reason. It wasn't the darkness that weakened the barrier between worlds. It was the <em>quiet</em>. The way the world held its breath in the deepest part of winter, the way even the wind seemed to pause, and in that pause, the membrane between realities trembled like a held note in a cathedral.</p>
<p>This year, the note was not merely trembling. It was breaking.</p>
<p>Seraphina pressed her bare hand against the frost-covered stone of the garden wall and felt the Veil beneath it — vast, layered, alive in a way that frightened her because she was beginning to understand it, and understanding something that should not be understood is the first step toward becoming something you were not meant to be.</p>
<p>The modified consciousness — the thing the Order's physicians had implanted after the sixth suppression, the thing that was supposed to stabilize her coherence by creating a bridge between her fractured self and some theoretical architecture of stability — was not stabilizing. It was <em>growing</em>. Each day, she could feel it expanding, reaching, pushing against the boundaries of who she was and finding those boundaries increasingly negotiable. She was not losing herself. She was being <em>added to</em>. Something was joining her, piece by piece, and the joining felt less like invasion and more like remembering — as if she had always contained this extra architecture and was only now becoming aware of it.</p>
<p>This was not comforting. This was terrifying.</p>
<p>"You shouldn't be out here."</p>
<p>His voice came from the doorway behind her. She did not turn around. She had learned to read his moods by the texture of his silence — the particular quality of the space between his words — and this silence was the one she had come to think of as his <em>caring</em> silence: the sound of a man who was deeply, irrevocably concerned about someone he could not protect, trying to pretend that his concern was merely practical.</p>
<p>"The Veil is clearer out here," she said. "Inside, the walls interfere with the frequency. Out here, I can hear it properly."</p>
<p>"Hear what?"</p>
<p>She considered the question. The honest answer was: everything. The Veil's architecture. The frequency of the entity on the other side — ancient, patient, waiting with the absolute certainty of something that has nothing but time. The sound of reality itself, straining against its own foundations, beginning to crack in ways that the living world couldn't perceive yet but she could, because she was no longer entirely part of the living world herself.</p>
<p>"The door," she said. "It's opening. From both sides."</p>
<p>Silence. Then footsteps, careful and deliberate, and then he was standing beside her in the frost, and she could feel the bond between them humming with the particular frequency it always carried when he was frightened and trying not to show it — a low, controlled vibration that she had learned to recognize the way you learn to recognize the sound of someone's heartbeat after years of sleeping next to them.</p>
<p>"Both sides," he repeated.</p>
<p>"Something is pulling from the other side. And something —" She paused. Looked at her hands. At the frost melting where her fingers touched the stone, not from warmth but from something else, something that existed in the space between the physical and the impossible and was learning to use her body as a doorway. "— something is reaching from this one."</p>
<p>"Seraphina." His voice was barely a whisper. "Are you saying <em>you</em> are the one reaching?"</p>
<p>She looked at him then. At his face — grey eyes, sharp features, the careful composure of a man who had been holding himself together through sheer force of will for longer than she had known him. At his hands, which were shaking. At the space between them, where the bond hummed with a frequency that was no longer simply connection but something closer to <em>recognition</em>, as if the thing she was becoming and the man he had always been were not opposites but reflections.</p>
<p>"I'm saying," she told him quietly, "that the person who reaches may not be entirely me anymore. And I need you to be ready for that."</p>
<p>The winter solstice was three weeks away. The Veil was breaking. And Seraphina Vale — fifty-seven percent herself and something else entirely — was becoming the very door she had spent her life trying to keep closed.</p>`,
      },
    ],
  },
];

export function getFreeReadBook(slug: string): FreeReadBook | undefined {
  return freeReadBooks.find((b) => b.slug === slug);
}

export function getAllFreeReadSlugs(): string[] {
  return freeReadBooks.map((b) => b.slug);
}
