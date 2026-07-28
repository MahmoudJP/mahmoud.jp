export type WritingArticle = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  readTime: string;
  sections: Array<{ heading: string; body: string }>;
};

export const writingArticles: WritingArticle[] = [
  {
    slug: "arabic-indesign-mistakes",
    eyebrow: "Arabic DTP",
    title: "Arabic in InDesign: the 5 mistakes I see every week",
    description:
      "The recurring problems that make Arabic layouts look almost right, but fail in production.",
    readTime: "6 min read",
    sections: [
      {
        heading: "Treat Arabic as a layout system, not a translation layer",
        body:
          "Arabic changes the direction, rhythm, punctuation, and visual weight of a page. Starting with an English layout and simply pasting translated copy usually creates a document that technically works but feels wrong to read.",
      },
      {
        heading: "Check numbers and punctuation in context",
        body:
          "Mixed Arabic and Latin strings are where small problems hide. A number, percent sign, or bracket can look correct in one line and reverse in the next. Review them inside the final paragraph, not as isolated strings.",
      },
      {
        heading: "Use a production checklist before export",
        body:
          "My final pass covers shaping, line endings, mirrored elements, font embedding, and PDF output. A short checklist is faster than rebuilding a document after a client finds the problem.",
      },
    ],
  },
  {
    slug: "building-dtp-master",
    eyebrow: "Building in public",
    title: "How I’m building DTP Master",
    description:
      "Notes from shipping a signed Windows app for multilingual production teams as a solo developer.",
    readTime: "5 min read",
    sections: [
      {
        heading: "Start with the workflow, not the feature list",
        body:
          "DTP Master began with repetitive checks that slowed down real multilingual production. Every feature earns its place by removing a specific, repeatable source of friction.",
      },
      {
        heading: "Small releases protect momentum",
        body:
          "A focused release is easier to test, explain, and support. I keep the feedback loop close: one production problem, one tool improvement, then a verified update.",
      },
      {
        heading: "The product is part of the workflow",
        body:
          "Signing, updates, documentation, and support are not finishing touches. They determine whether an internal utility becomes software people can trust every day.",
      },
    ],
  },
  {
    slug: "japanese-arabic-translation-pitfalls",
    eyebrow: "Translation QC",
    title: "Japanese ↔ Arabic: the translation pitfalls nobody talks about",
    description:
      "Why literal translation breaks technical readability, and how a layout-aware review changes the result.",
    readTime: "7 min read",
    sections: [
      {
        heading: "Meaning survives, but hierarchy can disappear",
        body:
          "Japanese and Arabic organize information differently. Direct translation can preserve the words while losing the emphasis, sequence, or intent that helps a reader act on the information.",
      },
      {
        heading: "A translation needs a visual review too",
        body:
          "Line breaks, labels, tables, and callouts can change meaning when a document changes direction. Linguistic review and layout review work best as one conversation.",
      },
      {
        heading: "Clarity is the real quality signal",
        body:
          "The goal is not to mirror the source sentence by sentence. The goal is for the target reader to understand, trust, and use the document without having to decode it.",
      },
    ],
  },
];

export function getWritingArticle(slug: string) {
  return writingArticles.find((article) => article.slug === slug);
}
