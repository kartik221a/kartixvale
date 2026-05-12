"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What genre does Kartix Vale write?",
    answer:
      "Dark romance, including dark fae romance, paranormal romance, gothic romance, fantasy romance, and mystery/thriller romance. Every story explores the shadowy edges of love.",
  },
  {
    question: "Are the books suitable for all readers?",
    answer:
      "Kartix Vale's books are intended for mature readers (18+). They explore dark themes, complex relationships, and intense emotional experiences. Please check individual book descriptions for specific content guidance.",
  },
  {
    question: "Where can I buy the books?",
    answer:
      "All books are available on Amazon in both ebook and paperback formats. Links are provided on each book's page.",
  },
  {
    question: "How often are new books released?",
    answer:
      "Kartix publishes regularly. Subscribe to the newsletter to be the first to know about new releases, exclusive previews, and special offers.",
  },
  {
    question: "Can I get a free preview?",
    answer:
      "Yes! Subscribe to the newsletter and receive an exclusive free chapter from the latest release delivered straight to your inbox.",
  },
  {
    question: "Does Kartix Vale have social media?",
    answer:
      "Stay connected through the newsletter for now. Social media links coming soon!",
  },
];

export function FaqSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
            Questions from the Shadows
          </h2>
          <div className="divider-gold w-24 mx-auto" />
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="card-dark rounded-xl px-6 border-none data-[state=open]:border-blood/30 data-[state=open]:shadow-[0_0_20px_rgba(139,0,0,0.1)] transition-all duration-300"
            >
              <AccordionTrigger className="text-left font-serif text-base md:text-lg text-foreground hover:text-blood-light transition-colors py-5 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm md:text-base leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
