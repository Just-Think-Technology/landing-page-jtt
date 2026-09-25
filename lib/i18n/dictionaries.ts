export type Locale = "pt" | "en";

/**
 * Homepage dictionaries. pt-BR is the default locale.
 * Content-integrity rule: translations must carry the same verified
 * claims as the source — no invented metrics, quotes or capabilities.
 */
export const dictionaries = {
  pt: {
    skipLink: "Pular para o conteúdo",
    nav: [
      { label: "Serviços", href: "#services" },
      { label: "Produtos", href: "#products" },
      { label: "Cases", href: "#cases" },
      { label: "Sobre", href: "#about" },
    ],
    getInTouch: "Fale conosco",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    backToTop: "Just Think Technology · voltar ao topo",
    languageLabel: "Trocar idioma",
    hero: {
      eyebrow: "Just Think Technology · Engenharia de Software",
      sub: "Projetamos e construímos software confiável, escalável e evolutivo para problemas reais de negócio: tecnologia estruturada, engenharia sólida, impacto real.",
      primaryCta: "Iniciar um projeto",
      secondaryCta: "Nosso trabalho",
      scroll: "Role",
      scrollAria: "Rolar para a seção sobre",
    },
    positioning: {
      eyebrow: "Posicionamento",
      body: "Somos uma empresa de tecnologia focada em",
      bodyHighlight1: "software que resolve problemas reais de negócio",
      bodyMiddle: ", planejado com rigor, construído com",
      bodyHighlight2: "engenharia sólida",
      bodyEnd: ", e desenhado para",
      bodyHighlight3: "evoluir",
      items: [
        {
          title: "Pensamento estruturado",
          text: "Todo sistema parte do problema de negócio. Depois arquitetura, depois código.",
        },
        {
          title: "Engenharia sólida",
          text: "Soluções confiáveis e escaláveis, construídas para durar além da primeira entrega.",
        },
        {
          title: "Evolução contínua",
          text: "Software que cresce com o negócio em vez de virar legado.",
        },
      ],
    },
    services: {
      eyebrow: "Serviços",
      title: "O que construímos",
      description:
        "Quatro frentes focadas, tratadas com precisão editorial e orientadas a resultado.",
      items: [
        {
          n: "01",
          tag: "Software",
          title: "Software sob medida",
          text: "Sistemas web e aplicações desenhadas para a sua operação, de ferramentas internas a produtos para o cliente final.",
        },
        {
          n: "02",
          tag: "Plataformas",
          title: "Plataformas e sistemas",
          text: "Plataformas robustas com arquitetura limpa, prontas para escala, novas features e manutenção de longo prazo.",
        },
        {
          n: "03",
          tag: "Integrações",
          title: "Integrações",
          text: "Conecte sua stack: APIs, serviços terceiros e fluxos de dados funcionando como um sistema coerente.",
        },
        {
          n: "04",
          tag: "Soluções personalizadas",
          title: "Soluções sob medida",
          text: "Quando o pronto não basta: soluções focadas em restrições e objetivos específicos do negócio.",
        },
      ],
    },
    process: {
      eyebrow: "Processo",
      title: "Como trabalhamos",
      description:
        "Um processo, cinco etapas. Continue rolando. A jornada anda para o lado, do entender ao comunicar.",
      scrollHint: "Continue rolando",
      outroTitle: "Vamos aplicar no seu projeto?",
      outroText: "O mesmo rigor, do primeiro entendimento à evolução contínua.",
      steps: [
        {
          n: "01",
          title: "Entender",
          text: "Mergulhamos no contexto do negócio: operação, restrições, usuários e objetivos. Nada é decidido no achismo. Cada escolha técnica nasce de um problema real, mapeado antes de qualquer solução.",
        },
        {
          n: "02",
          title: "Planejar",
          text: "Arquitetura, escopo e prioridades definidos com clareza antes da primeira linha de código. Você sabe o que será construído, em que ordem e por quê. Sem improviso no meio do caminho.",
        },
        {
          n: "03",
          title: "Construir",
          text: "Desenvolvimento com engenharia sólida, validação contínua e comunicação aberta. Cada entrega é testada, revisada e apresentada. Você acompanha a evolução de perto, sem surpresas.",
        },
        {
          n: "04",
          title: "Evoluir",
          text: "Lançar é o meio, não o fim: medimos, aprendemos e melhoramos em ciclos. Os sistemas nascem preparados para a próxima iteração. Nunca como legado.",
        },
        {
          n: "05",
          title: "Comunicar",
          text: "Diálogo técnico direto do início ao fim, sem intermediários nem caixa-preta. Dúvidas, riscos e decisões tratados às claras, com quem realmente constrói o sistema.",
        },
      ],
    },
    cases: {
      eyebrow: "Cases",
      title: "O que já construímos",
      description:
        "Trabalho verificado com clientes. Métricas e depoimentos só aparecem quando verificados.",
      live: "No ar",
      project: "Julãos Burger",
      context: "Cliente · Alimentação · Mauá, SP",
      text: "E-commerce próprio construído para a operação do Julãos Burger. Pedidos estruturados para o dia a dia do restaurante, no ar em produção.",
      tags: ["Cliente", "E-commerce", "Software"],
      previewTitle: "Preview do site Julãos Burger (site no ar)",
      previewAria: "Abrir o site do Julãos Burger em nova aba",
      visit: "Visitar site",
    },
    products: {
      eyebrow: "Produtos",
      title: "Nossos produtos",
      description:
        "Nossos sistemas próprios, em desenvolvimento. A mesma engenharia estruturada de cada entrega que fazemos.",
      inDevelopment: "Em desenvolvimento",
      getNotified: "Avise-me",
      items: [
        {
          name: "Vendono",
          tagline: "Operação comercial",
          text: "Nosso produto para operação comercial. Fluxos claros e dados confiáveis, desenhado para evoluir com o negócio.",
        },
        {
          name: "Pode Deixar",
          tagline: "Marketplace de serviços",
          text: "Plataforma que conecta clientes a prestadores. Orçamentos, propostas, pagamento intermediado, acompanhamento e reputação em um só lugar.",
          stack: ["NestJS", "Next.js", "PostgreSQL", "JWT"],
        },
        {
          name: "sapiens.ai",
          tagline: "Facilitador de reuniões com IA",
          text: "Facilitador ativo de reuniões corporativas. Transcrição em tempo real, intervenções controladas e resumos pós-reunião com decisões, tarefas e responsáveis.",
          stack: ["FastAPI", "Next.js", "Whisper", "PostgreSQL"],
        },
      ],
    },
    why: {
      eyebrow: "Por que nós",
      title: "Motivos concretos, não jargão",
      items: [
        {
          title: "Engenharia orientada a negócio",
          text: "Cada decisão técnica serve a um resultado do negócio.",
        },
        {
          title: "Envolvimento técnico direto",
          text: "Você fala direto com quem projeta e constrói o sistema, sem camadas nem caixa-preta.",
        },
        {
          title: "Sistemas feitos para evoluir",
          text: "Arquitetura limpa que aceita mudança em vez de resistir a ela.",
        },
        {
          title: "Parceria de longo prazo",
          text: "Ficamos depois do lançamento: manutenção, iteração e melhoria contínua.",
        },
      ],
    },
    team: {
      eyebrow: "Equipe",
      title: "Quem somos",
      description:
        "Dois sócios, envolvimento direto. Cultura é como trabalhamos, e ela aparece na equipe, não em seção separada.",
      members: [
        {
          name: "Thiago Canato de Azevedo",
          role: "CTO",
          line: "Liderança técnica e engenharia sólida. Sistemas construídos para evoluir.",
        },
        {
          name: "Júlio Francisco Bernardino",
          role: "CEO",
          line: "Visão de negócio e proximidade com o cliente. Tecnologia a serviço de resultado real.",
        },
      ],
    },
    contact: {
      eyebrow: "Contato",
      title: "Como começo?",
      description:
        "Conte seu problema. A resposta é uma visão estruturada, sem papo genérico de vendas.",
      emailLabel: "E-mail ·",
      whatsappLabel: "WhatsApp ·",
      startConversation: "Iniciar conversa",
      name: "Nome",
      namePlaceholder: "Seu nome",
      email: "E-mail",
      company: "Empresa",
      companyPlaceholder: "Empresa (opcional)",
      message: "Mensagem",
      messagePlaceholder: "Qual problema você quer resolver?",
      submit: "Iniciar um projeto",
      sending: "Enviando…",
      successTitle: "Mensagem enviada.",
      successText: "Obrigado pelo contato. Respondemos em breve.",
      errorTitle: "Não foi possível enviar.",
      errorText: "Tente de novo ou fale direto pelo WhatsApp ou e-mail.",
    },
    manifesto: {
      trailing: "Problemas reais, pensamento estruturado, sistemas duradouros.",
    },
    finalCta: {
      title: "Tem um problema real? Vamos construir o sistema certo.",
      primary: "Iniciar um projeto",
      whatsapp: "WhatsApp",
    },
    footer: {
      tagline: "Think Smarter. Build Better.",
      location: "BRASIL · REMOTE FIRST",
      navigate: "Navegação",
      contact: "Contato",
      rights: "Just Think Technology.",
      bottom: "Tecnologia estruturada. Impacto real no negócio.",
    },
  },
  en: {
    skipLink: "Skip to content",
    nav: [
      { label: "Services", href: "#services" },
      { label: "Products", href: "#products" },
      { label: "Cases", href: "#cases" },
      { label: "About", href: "#about" },
    ],
    getInTouch: "Get in touch",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    backToTop: "Just Think Technology · back to top",
    languageLabel: "Switch language",
    hero: {
      eyebrow: "Just Think Technology · Software Engineering",
      sub: "We design and build reliable, scalable and evolvable software for real business problems: structured technology, solid engineering, real impact.",
      primaryCta: "Start a project",
      secondaryCta: "Our work",
      scroll: "Scroll",
      scrollAria: "Scroll to about section",
    },
    positioning: {
      eyebrow: "Positioning",
      body: "We are a technology company focused on",
      bodyHighlight1: "software that solves real business problems",
      bodyMiddle: ", planned with rigor, built with",
      bodyHighlight2: "solid engineering",
      bodyEnd: ", and designed to",
      bodyHighlight3: "evolve",
      items: [
        {
          title: "Structured thinking",
          text: "Every system starts from the business problem, then architecture, then code.",
        },
        {
          title: "Solid engineering",
          text: "Reliable, scalable solutions built to last beyond the first release.",
        },
        {
          title: "Long-term evolution",
          text: "Software that grows with the business instead of becoming legacy.",
        },
      ],
    },
    services: {
      eyebrow: "Services",
      title: "What we build",
      description:
        "Four focused areas, treated with editorial precision and built for business outcomes.",
      items: [
        {
          n: "01",
          tag: "Software",
          title: "Custom software",
          text: "Web systems and applications designed around your operation, from internal tools to customer-facing products.",
        },
        {
          n: "02",
          tag: "Platforms",
          title: "Platforms & systems",
          text: "Robust platforms with clean architecture, prepared for scale, new features and long-term maintenance.",
        },
        {
          n: "03",
          tag: "Integrations",
          title: "Integrations",
          text: "Connect your stack: APIs, third-party services and data flows working as one coherent system.",
        },
        {
          n: "04",
          tag: "Custom Solutions",
          title: "Tailored solutions",
          text: "When off-the-shelf is not enough: focused solutions for specific business constraints and goals.",
        },
      ],
    },
    process: {
      eyebrow: "Process",
      title: "How we work",
      description:
        "One process, five steps. Keep scrolling. The journey moves sideways, from understanding to communicating.",
      scrollHint: "Keep scrolling",
      outroTitle: "Let's apply it to your project?",
      outroText: "The same rigor, from first understanding to continuous evolution.",
      steps: [
        {
          n: "01",
          title: "Understand",
          text: "We dive into the business context: operations, constraints, users and goals. Nothing is decided on gut feeling. Every technical choice comes from a real problem, mapped before any solution.",
        },
        {
          n: "02",
          title: "Plan",
          text: "Architecture, scope and priorities defined with clarity before the first line of code. You know what will be built, in which order and why. No improvisation halfway through.",
        },
        {
          n: "03",
          title: "Build",
          text: "Development with solid engineering, continuous validation and open communication. Every delivery is tested, reviewed and presented. You follow progress up close, with no surprises.",
        },
        {
          n: "04",
          title: "Evolve",
          text: "Launch is the middle, not the end: we measure, learn and improve in cycles. Systems are born ready for the next iteration. Never as legacy.",
        },
        {
          n: "05",
          title: "Communicate",
          text: "Direct technical dialogue from start to finish, with no middlemen and no black box. Questions, risks and decisions handled openly, with the people actually building the system.",
        },
      ],
    },
    cases: {
      eyebrow: "Cases",
      title: "What we've built",
      description:
        "Verified client work only. Detailed metrics and client quotes appear only when verified.",
      live: "Live",
      project: "Julãos Burger",
      context: "Client · Food & beverage · Mauá, SP",
      text: "A custom e-commerce built for Julãos Burger's own operation. Ordering structured around the restaurant's day-to-day, live in production.",
      tags: ["Client", "E-commerce", "Software"],
      previewTitle: "Julãos Burger website preview (live site)",
      previewAria: "Open Julãos Burger live site in a new tab",
      visit: "Visit live site",
    },
    products: {
      eyebrow: "Products",
      title: "Our products",
      description:
        "Our own systems, currently in development. The same structured engineering behind every delivery we make.",
      inDevelopment: "In development",
      getNotified: "Get notified",
      items: [
        {
          name: "Vendono",
          tagline: "Commercial operations",
          text: "Our product for commercial operations. Clear workflows and reliable data, designed to evolve with the business.",
        },
        {
          name: "Pode Deixar",
          tagline: "Services marketplace",
          text: "A platform connecting clients who need tasks done with professional service providers. Quotes, proposals, intermediated payments, tracking and reputation in one place.",
          stack: ["NestJS", "Next.js", "PostgreSQL", "JWT"],
        },
        {
          name: "sapiens.ai",
          tagline: "AI meeting facilitator",
          text: "An active AI facilitator for corporate meetings. Real-time transcription, controlled interventions and structured post-meeting summaries with decisions, tasks and owners.",
          stack: ["FastAPI", "Next.js", "Whisper", "PostgreSQL"],
        },
      ],
    },
    why: {
      eyebrow: "Why us",
      title: "Concrete reasons, not buzzwords",
      items: [
        {
          title: "Business-focused engineering",
          text: "Every technical decision serves a business outcome.",
        },
        {
          title: "Direct technical involvement",
          text: "You talk directly with the people who design and build the system, with no layers and no black box.",
        },
        {
          title: "Systems built for evolution",
          text: "Clean architecture that accepts change instead of resisting it.",
        },
        {
          title: "Long-term partnership",
          text: "We stay after launch: maintenance, iteration and continuous improvement.",
        },
      ],
    },
    team: {
      eyebrow: "Team",
      title: "Who we are",
      description:
        "Two partners, direct involvement. Culture is how we work, and it shows in the team, not in a separate section.",
      members: [
        {
          name: "Thiago Canato de Azevedo",
          role: "CTO",
          line: "Technical leadership and solid engineering. Systems built to evolve.",
        },
        {
          name: "Júlio Francisco Bernardino",
          role: "CEO",
          line: "Business vision and client proximity. Technology serving real outcomes.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "How do I start?",
      description:
        "Tell us about your problem. The answer is a structured view, with no generic sales pitch.",
      emailLabel: "Email ·",
      whatsappLabel: "WhatsApp ·",
      startConversation: "Start a conversation",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      company: "Company",
      companyPlaceholder: "Company (optional)",
      message: "Message",
      messagePlaceholder: "What problem are you trying to solve?",
      submit: "Start a project",
      sending: "Sending…",
      successTitle: "Message sent.",
      successText: "Thanks for reaching out. We'll reply shortly.",
      errorTitle: "Couldn't send it.",
      errorText: "Try again or reach us directly via WhatsApp or email.",
    },
    manifesto: {
      trailing: "Real problems, structured thinking, lasting systems.",
    },
    finalCta: {
      title: "Have a real problem? Let's build the right system.",
      primary: "Start a project",
      whatsapp: "WhatsApp",
    },
    footer: {
      tagline: "Think Smarter. Build Better.",
      location: "BRAZIL · REMOTE FIRST",
      navigate: "Navigate",
      contact: "Contact",
      rights: "Just Think Technology.",
      bottom: "Structured technology. Real business impact.",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];
