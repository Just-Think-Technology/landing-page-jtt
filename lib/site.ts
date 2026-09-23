export const site = {
  name: "Just Think Technology",
  shortName: "JTT",
  slogan: "Think Smarter. Build Better.",
  description:
    "JTT builds reliable, scalable and evolvable software for real business problems through structured engineering.",
  // TODO: replace with authoritative JTT contact channels.
  contact: {
    email: "justhinktechnology@gmail.com",
    whatsapp: "https://wa.me/5511996556155",
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "Products", href: "#products" },
    { label: "Cases", href: "#cases" },
    { label: "About", href: "#about" },
  ] as const,
} as const;

export type SiteNavItem = (typeof site.nav)[number];
