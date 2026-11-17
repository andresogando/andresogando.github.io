export type CaseStudy = {
  slug: string;
  sector: string;
  title: string;
  summary: string;
  tags: string[];
  fictional?: boolean;
  sections: { id: string; heading: string; body: string[] }[];
  pullquote?: string;
  techNote?: string;
  nextSlug?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    "slug": "prevsi",
    "sector": "Healthcare · Product development",
    "title": "Prevsi",
    "summary": "Turning a polished demo into a secure, multilingual healthcare platform that real clinics and patients use every day.",
    "tags": [
      "Privacy-first",
      "Three languages",
      "Clinic operations"
    ],
    "sections": [
      {
        "id": "starting",
        "heading": "Protecting the vision that won people over",
        "body": [
          "When Prevsi came to us, they had something many founders dream of: a beautiful, polished demo that communicated exactly what their product could be. The problem was that behind the screens, nothing was real. Accounts didn't exist, forms didn't save, and messages went nowhere.",
          "Rather than rebuilding the experience from scratch, we treated their design as the final word. Every screen users would eventually touch was built to match what the team had already promised. That discipline paid off: when Prevsi later wanted to refresh part of the look, it took a simple adjustment instead of weeks of rework."
        ]
      },
      {
        "id": "privacy",
        "heading": "Privacy patients never have to think about",
        "body": [
          "A healthcare platform asks people to share some of the most personal details of their lives. We designed Prevsi so that every piece of patient information is locked down individually — not just stored safely, but protected at the level of each name, date of birth, and form answer. Staff only ever see what their role requires, and every sensitive access is recorded.",
          "Signing in is simple for patients — no passwords to forget, just a code sent to their email — while still being strict enough for a clinical environment. If a patient walks away mid-task, their session quietly protects itself.",
          "We also made sure nothing can be submitted twice by accident — a real concern when patients are filling out medical forms on unreliable connections. Retries, refreshes, and double-taps all return safely to the same place."
        ]
      },
      {
        "id": "operations",
        "heading": "Tools for the whole care team",
        "body": [
          "Behind the patient experience, we built everything a clinic needs to actually run: patient records, clinical notes, prescriptions, appointments, and two-way messaging between patients and their care teams — all organized so each clinic only ever sees its own patients.",
          "A separate management console lets Prevsi's own team invite staff and run operations, with sessions that intentionally forget themselves when closed. In healthcare, that's a feature, not an inconvenience.",
          "Patients get a clear view of where they stand at every step — and if they decide to leave, they can delete their own data with a grace period. Trust means making leaving as easy as joining."
        ]
      },
      {
        "id": "shipping",
        "heading": "Built to run itself",
        "body": [
          "The platform's updates and infrastructure are largely automated, so improvements ship without drama. We even added automatic visual checks that catch unwanted design changes before patients ever see them.",
          "And because Prevsi's patients don't all speak English, the entire experience — including the most sensitive intake forms — works fully in English, Spanish, and French."
        ]
      },
      {
        "id": "result",
        "heading": "The result",
        "body": [
          "Prevsi went from a convincing demo to a real, operating healthcare platform: patients manage their care in three languages, clinics run daily operations in one place, and every piece of personal information is protected by design. Most importantly, the product still looks exactly like the vision that won people over — only now, it's real."
        ]
      }
    ],
    "pullquote": "Security wasn't bolted on before launch. It's how the product was built from the first day.",
    "techNote": "TECHNOLOGY · A secure cloud platform with healthcare-grade privacy controls — the specific recipe stays with us",
    "nextSlug": "foundrylane"
  },
  {
    "slug": "foundrylane",
    "sector": "Business services · Membership platform",
    "title": "FoundryLane",
    "summary": "Turning the scattered work of running a company — filings, documents, compliance, billing — into one guided experience.",
    "tags": [
      "Guided journeys",
      "Document automation",
      "Compliance"
    ],
    "fictional": true,
    "sections": [
      {
        "id": "editor-note",
        "heading": "Editor’s note",
        "body": [
          "FoundryLane** is a fictional name used to protect the customer's identity under NDA. The work described is real; no confidential data is included."
        ]
      },
      {
        "id": "challenge",
        "heading": "The challenge: a hundred scattered tasks",
        "body": [
          "Forming a company is just the beginning. What follows is a marathon: tax registrations, registered agents, annual reports, legal documents, equity, signatures, banking, and deadlines that can't be missed. Each one typically lives with a different provider, a different form, and a different status page.",
          "Our customer wanted to give members a single place to manage all of it — without hiding the complexity in a way that would break later."
        ]
      },
      {
        "id": "portal",
        "heading": "A guided member experience",
        "body": [
          "Instead of dropping members into a collection of unrelated tools, the platform is organized around the life of their company. From one account, members can form a business, track tax registrations, stay on top of compliance deadlines, store documents, manage equity, and explore banking and member perks.",
          "The formation process feels like a friendly questionnaire rather than a government form. The answers members give automatically feed the work that follows — filings, signatures, and next steps — so nothing has to be entered twice."
        ]
      },
      {
        "id": "documents",
        "heading": "Documents that assemble themselves",
        "body": [
          "Legal documents were treated as a core feature, not an afterthought. Members answer a few guided questions and receive a properly prepared document — operating agreements, founder agreements, employment contracts, stock purchases, and more — ready to review, sign, and store.",
          "Signatures happen digitally, and the platform keeps track of where every document stands. Adding a new document type later doesn't require inventing a new process each time."
        ]
      },
      {
        "id": "backend",
        "heading": "Quiet automation behind the scenes",
        "body": [
          "Much of what the platform does can't happen instantly — filings depend on outside providers, documents take time to prepare, signatures wait on other people. The system was designed so these slow, real-world steps happen quietly in the background while members always see a clear, honest status.",
          "Security and reliability were built into the foundation: protected accounts, careful handling of sensitive company information, verified communication with outside services, and thorough automated checks on the parts of the business where mistakes would be costly."
        ]
      },
      {
        "id": "result",
        "heading": "The result",
        "body": [
          "FoundryLane** now offers members a single, calm place to run the administrative life of a company — from formation through compliance, documents, equity, and services. Members get a simpler journey, the operations team gets visibility and control, and the product has room to grow into new services without starting over."
        ]
      }
    ],
    "pullquote": "Keep the member experience simple, and let the system handle the complexity behind the scenes.",
    "techNote": "TECHNOLOGY · A modern web platform with secure cloud infrastructure and automated background processing",
    "nextSlug": "wemoverd"
  },
  {
    "slug": "wemoverd",
    "sector": "Hospitality · Rental operations",
    "title": "WeMoveRD",
    "summary": "A complete rental journey connecting the website, hotel partners, bookings, payments, and vehicle returns.",
    "tags": [
      "Bookings",
      "Hotel partners",
      "Fleet tracking"
    ],
    "sections": [
      {
        "id": "funnel",
        "heading": "A website that answers real questions",
        "body": [
          "In a destination like Punta Cana, a golf cart isn't just transportation — it's part of the vacation. WeMoveRD needed more than a pretty website; it needed a way to turn online interest into actual rentals.",
          "The site is built around the questions visitors actually ask: What carts are available? Will one fit my group? Do they serve resorts, weddings, and events? Can I buy instead of rent? Visitors can browse the fleet by category, see real details and pricing, and reach out with a clear next step — so the team starts every conversation with context instead of cold calls."
        ]
      },
      {
        "id": "booking",
        "heading": "Bookings without the chaos",
        "body": [
          "Before this project, reservations lived in scattered messages and repeated data entry. Now, staff walk through a guided booking process that collects exactly what a rental needs: customer details, ID, vehicle, dates, pickup location, and payment method. The system checks each step, so incomplete bookings are caught before they cause problems.",
          "Once a reservation is confirmed, the platform automatically produces the two things that matter most: a ready-to-use rental contract and a payment link suited to the local market. What used to take a chain of manual steps now happens in one flow."
        ]
      },
      {
        "id": "partners",
        "heading": "Hotel partners, without the risk",
        "body": [
          "Many of WeMoveRD's rentals are arranged by hotel concierges and front-desk teams helping their guests. We built them a dedicated, sign-in-protected workspace where they can create bookings on a guest's behalf — seeing only the vehicles assigned to them and only the tools they need.",
          "That separation lets WeMoveRD extend its service into premium hospitality environments while staying in full control of the fleet and the back office."
        ]
      },
      {
        "id": "lifecycle",
        "heading": "From pickup to return",
        "body": [
          "A reservation is only one moment in a rental. Staff can look up any booking by name, phone, or email; start the rental when the guest arrives; and document the return with mileage, fuel, condition notes, and photos. Vehicles come back flagged as ready, damaged, or out of service — so what happened in the field matches what's in the system."
        ]
      },
      {
        "id": "result",
        "heading": "One connected journey",
        "body": [
          "A visitor discovers the fleet online. A staff member or hotel partner turns that interest into a structured booking. The contract, payment, vehicle assignment, pickup, and return all flow through the same system. For WeMoveRD, that means fewer dropped details and a more repeatable operation. For guests, it means getting from booking to behind the wheel with less friction."
        ]
      }
    ],
    "pullquote": "The booking tool isn't just a form — it's the bridge between the front desk, the fleet, the contract, and the payment.",
    "techNote": "TECHNOLOGY · A responsive web platform connected to rental management and local payment services",
    "nextSlug": "rookiebets"
  },
  {
    "slug": "rookiebets",
    "sector": "Sports data · Responsible AI",
    "title": "RookieBets",
    "summary": "A forecasting product where AI assists but never decides alone — every prediction explains itself honestly.",
    "tags": [
      "AI-assisted",
      "Explainable",
      "Trust-first"
    ],
    "sections": [
      {
        "id": "experience",
        "heading": "Built for understanding, not overwhelm",
        "body": [
          "Most sports data products bury users in numbers. RookieBets was designed around a different idea: help people quickly understand today's opportunities without needing a statistics degree.",
          "The product organizes MLB and NFL forecasts into clear sections, lets users filter by sport, date, or team, and offers a simple way to request new forecast combinations. Games that have already started are automatically excluded — a small detail that keeps the product honest.",
          "Every state of the experience was designed deliberately: what you see when data is loading, when something is unavailable, or when the system has nothing confident to show. In a product about probability, how you handle uncertainty matters as much as the predictions themselves."
        ]
      },
      {
        "id": "architecture",
        "heading": "AI that advises, never decides",
        "body": [
          "RookieBets uses AI to research games, weigh probabilities, and draft forecasts — but here's the important part: the AI can't publish anything by itself. Every suggestion goes through a separate layer of strict rules that checks the math, the data quality, and the logic before anything reaches users.",
          "The system is also allowed to say \"I don't know.\" When data is incomplete or contradictory, it abstains rather than guessing — and tells users that's what happened. Every forecast records exactly which version of the system produced it, so results can always be traced back and audited."
        ]
      },
      {
        "id": "honesty",
        "heading": "Honest about the numbers",
        "body": [
          "A forecast is only useful if people understand what it means. The product clearly separates what the model estimates from what the market implies, and explains the difference in plain terms. When combinations depend on each other in ways that can't be priced fairly, they're flagged as experimental rather than presented as safe picks.",
          "The language throughout follows the same discipline — \"forecast,\" \"estimated probability,\" \"model abstained\" — and deliberately avoids words like \"lock,\" \"guaranteed,\" or \"risk-free.\" RookieBets is an informational product, and it communicates like one."
        ]
      },
      {
        "id": "iteration",
        "heading": "Built to grow, not just to demo",
        "body": [
          "To keep development moving before paid data providers were connected, we built a complete rehearsal mode: the entire product can run and be tested end-to-end with realistic practice data. That means new features, new leagues, and new model versions can be proven before they ever touch the live product."
        ]
      },
      {
        "id": "result",
        "heading": "The result",
        "body": [
          "RookieBets is more than a sports dashboard. It's a product people can actually trust — because every forecast explains itself, the AI operates inside clear boundaries, and the product is honest about uncertainty. For the customer, that foundation means new leagues, features, and improvements can be added without rebuilding the system or compromising the qualities that make users come back."
        ]
      }
    ],
    "pullquote": "The AI proposes. The rules decide. No prediction reaches a user without passing real checks.",
    "techNote": "TECHNOLOGY · Web, data, and AI services working behind strict verification rules — details stay with us",
    "nextSlug": "rmj-transportation"
  },
  {
    "slug": "rmj-transportation",
    "sector": "Local business · Lead generation",
    "title": "RMJ Transportation",
    "summary": "Helping a family-run school transportation business get found online and turn searches into booked routes.",
    "tags": [
      "Bilingual",
      "Google-ready",
      "Built to convert"
    ],
    "sections": [
      {
        "id": "trust",
        "heading": "Designed around trust, not trends",
        "body": [
          "Choosing who drives your child to school is a decision built on trust. RMJ Transportation had earned it the hard way — family-owned, certified drivers, background-checked, serving Lawrence and Methuen for years. But a parent searching at 9 PM wouldn't find any of that online.",
          "We built the site to lead with proof: real photos of the fleet instead of stock images, real reviews from local families, a map showing the actual business address, and the credentials that matter — family-owned, certified, background-checked — visible from the first screen.",
          "Just as important: many families in Lawrence and Methuen are more comfortable in Spanish. The entire site works in both languages, and a visitor's choice is remembered on their next visit."
        ]
      },
      {
        "id": "search",
        "heading": "Built to be found",
        "body": [
          "A beautiful website is useless if nobody finds it. We did the behind-the-scenes work that helps Google understand exactly what RMJ does and where — so searches like \"school transportation Lawrence MA\" lead to a real answer.",
          "The frequently-asked-questions section isn't decoration. Questions like \"Do you offer school transportation in Lawrence?\" are exactly what parents type into Google, and each answer is written to match."
        ]
      },
      {
        "id": "conversion",
        "heading": "Turning visits into booked routes",
        "body": [
          "The contact form was designed around what RMJ actually needs to quote a route: pickup and drop-off addresses, the child's school, the type of inquiry. Incomplete submissions are caught before they're sent, parents get an instant confirmation email, and RMJ receives a clean, organized request — even outside business hours.",
          "The same page doubles as a hiring channel for drivers, and mobile visitors always have a one-tap call button within reach. There's even a live chat that answers questions in English and Spanish."
        ]
      },
      {
        "id": "access",
        "heading": "Built for real life",
        "body": [
          "Parents visit on phones, while multitasking, often on weak connections. The site loads fast on older devices, works comfortably one-handed, and is fully usable with screen readers and keyboards — because accessibility isn't a bonus feature, it's how you respect every customer.",
          "And because the site is intentionally simple under the hood, there's no complicated system for a small business to maintain or forget to update."
        ]
      },
      {
        "id": "result",
        "heading": "The result",
        "body": [
          "RMJ now has a digital presence that matches its reputation: findable on Google, welcoming in two languages, and working around the clock to turn searches into inquiries. The phone still rings — but now the website answers too."
        ]
      }
    ],
    "pullquote": "For a local service business, the website is the first mile of every route.",
    "techNote": "TECHNOLOGY · A fast, lightweight website built to load quickly and rank well in local search",
    "nextSlug": "ledgerport"
  },
  {
    "slug": "ledgerport",
    "sector": "Fintech · Foundation work",
    "title": "LedgerPort",
    "summary": "A simple feature treated as proof that fast, secure, ready-to-grow engineering can start small.",
    "tags": [
      "Secure",
      "Fast",
      "Ready to grow"
    ],
    "fictional": true,
    "sections": [
      {
        "id": "editor-note",
        "heading": "Editor’s note",
        "body": [
          "LedgerPort** is a fictional name used to protect the customer's identity under NDA. The work described is real; no confidential data is included."
        ]
      },
      {
        "id": "challenge",
        "heading": "Simple doesn't mean careless",
        "body": [
          "On the surface, the request was straightforward: give users a short link that redirects to a longer one. But a company handling money can't afford careless code — even in a small feature. Repeated requests need to be efficient, links need to work reliably, mistakes need clear answers, and anything public-facing needs real protection.",
          "So we treated the project the way we'd treat the foundation of a much larger system — because that's exactly what it could become."
        ]
      },
      {
        "id": "speed",
        "heading": "Speed that feels instant",
        "body": [
          "The service remembers links it has already created, so repeated requests get instant answers instead of repeated work. The same approach was reused for a separate feature in the project — showing that good foundations serve the whole product, not just one corner of it."
        ]
      },
      {
        "id": "security",
        "heading": "Safety from the start",
        "body": [
          "Public-facing services attract abuse, so protection was built in rather than added on: limits on how often anyone can call the service, safeguards against common attacks, secure connections enforced by default, and controlled access for other websites. The groundwork for user accounts and private features is already in place for when the product grows.",
          "Just as importantly, sensitive credentials were kept out of the codebase entirely — a basic discipline that too many projects skip."
        ]
      },
      {
        "id": "growth",
        "heading": "Room to grow",
        "body": [
          "Everything is organized so future developers — whether that's us or the customer's own team — have obvious places to add features. Automated checks and a repeatable build process mean the project can be tested and updated with confidence, not crossed fingers.",
          "We're honest about what's prototype and what's production: the foundation is solid, and the path to a full rollout — more validation, broader testing, monitoring — is clear rather than hand-waved."
        ]
      },
      {
        "id": "result",
        "heading": "The outcome",
        "body": [
          "LedgerPort** got more than a working feature. They got a demonstration of how we work: fast where it should be fast, protected where it should be protected, and structured so the next feature doesn't require starting over. For a growing company, that's the difference between a quick fix and a real foundation."
        ]
      }
    ],
    "pullquote": "The goal wasn't a big system for a small task. It was showing exactly where the important protections belong.",
    "techNote": "TECHNOLOGY · A compact, secure web service built with proven, industry-standard tools",
    "nextSlug": "prevsi"
  },
  {
    "slug": "gatherstay",
    "sector": "Travel & events · Booking platform",
    "title": "GatherStay",
    "summary": "Turning the surge of event travel into a smooth booking experience for organizers, hotels, and guests.",
    "tags": [
      "Event bookings",
      "Payment plans",
      "Ops control room"
    ],
    "fictional": true,
    "sections": [
      {
        "id": "editor-note",
        "heading": "Editor’s note",
        "body": [
          "GatherStay** is a fictional name used to protect the customer's identity under NDA. The work described is real; no confidential data is included."
        ]
      },
      {
        "id": "problem",
        "heading": "Event travel is a surge, not a stream",
        "body": [
          "When a festival or tour announces dates, thousands of people suddenly need a room near the same venue on the same weekend. For the company behind this platform, that demand meant constant manual work: contracting hotels, tracking room blocks, answering the same questions, and reconciling bookings across disconnected tools.",
          "They needed a product that could sell hotel stays the way ticketing companies sell seats — organized around the event itself."
        ]
      },
      {
        "id": "guests",
        "heading": "For guests: find, book, done",
        "body": [
          "Guests start with the event they're attending and see a curated selection of nearby hotels — not a generic search across an entire city. Each event gets its own branded booking experience, so the journey feels like a natural extension of the event rather than a trip to a travel site.",
          "Booking is designed to remove friction: packages and add-ons for people who want more than a room, discount codes, and payment plans that let guests spread the cost instead of paying everything up front. After booking, guests can manage their reservation, make changes, and get answers without waiting on an email thread."
        ]
      },
      {
        "id": "operators",
        "heading": "For operators: one control room",
        "body": [
          "Behind the guest experience sits a full operations portal. The team can create events with their own branding and dates, contract and configure hotels, control how many rooms are available and at what price — including extra inventory for peak demand — and package everything into sellable offers.",
          "The platform watches the details so people don't have to: alerts before inventory runs out, rooming lists ready for hotels, dashboards and email reports on how sales are performing, and a complete record of every booking, payment, refund, and change."
        ]
      },
      {
        "id": "connected",
        "heading": "Connected to the wider industry",
        "body": [
          "Hotel bookings don't exist in isolation. The platform stays in sync with ticketing partners so event and travel sales can move together, and connects to hotel distribution networks so availability shown to guests reflects reality — not a spreadsheet that's already out of date.",
          "Payments, refunds, reservation changes, and automated guest emails are all handled inside the same system, so the operations team works in one place instead of five."
        ]
      },
      {
        "id": "result",
        "heading": "The result",
        "body": [
          "What was once a tangle of manual coordination became a product: organizers launch an event, hotels fill through a branded booking experience, guests pay and manage their stay on their own terms, and the operations team sees everything in one place. The business can now handle the surge of a major event announcement without the surge of manual work that used to come with it."
        ]
      }
    ],
    "pullquote": "The platform doesn't just take bookings — it runs the business side of event travel.",
    "techNote": "TECHNOLOGY · A scalable cloud platform built to handle sudden demand spikes around live events"
  }
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
