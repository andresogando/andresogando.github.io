import type { Lang } from '../lib/i18n-core';

export type Service = { id: string; title: string; description: string };
export type FaqItem = { question: string; answerHtml: string };
export type Product = { name: string; meta: string; description: string; href: string };

export type SiteCopy = {
  meta: { title: string; description: string };
  nav: { services: string; clients: string; cases: string; faq: string; cta: string };
  hero: { title: string; description: string; cta: string };
  clients: { label: string; names: string[] };
  products: { title: string; items: Product[] };
  services: { title: string; items: Service[] };
  selectedWork: { title: string; seeAll: string };
  faq: { title: string; items: FaqItem[] };
  contact: {
    title: string;
    description: string;
    namePh: string;
    emailPh: string;
    msgPh: string;
    submit: string;
    sending: string;
    fillAll: string;
    success: string;
    error: string;
  };
  footer: { line1: string; line2: string };
};

export const site: Record<Lang, SiteCopy> = {
  "en": {
    "meta": {
      "title": "Web Design & Software Development in Toronto | Raven Platforms Inc.",
      "description": "Toronto web design & software studio: custom websites, web apps, mobile apps, e-commerce, SEO, DevOps & technical audits for businesses across North America & the Caribbean."
    },
    "nav": {
      "services": "Services",
      "clients": "Clients",
      "cases": "Case studies",
      "faq": "FAQ",
      "cta": "Contact →"
    },
    "hero": {
      "title": "We build websites & platforms that win customers",
      "description": "Raven Platforms is a Toronto software studio. We design and engineer fast, modern digital products for ambitious businesses — from marketing sites to full web apps, DevOps and audits.",
      "cta": "Start your project ↓"
    },
    "clients": {
      "label": "Trusted by teams across North America & the Caribbean",
      "names": [
        "Prevsi",
        "OnRaven",
        "iRobcx",
        "AlgoLabs",
        "StreamVault",
        "Cadillac of Newport",
        "RMJ Transportation",
        "HM Management",
        "Coldwell Banker",
        "WeMove RD",
        "Bohemian Cap Cana",
        "CareerSafe",
        "OG Corp",
        "Tacoma Pharmacy",
        "Honda Dealer Affiliates",
        "Acura Dealer Affiliates",
        "HVAC Partners",
        "Hospitality Groups",
        "Meridian Holdings Inc.",
        "Apex Digital Corp.",
        "Northbridge Ventures LLC",
        "Summit Capital Group",
        "Harborline Industries Inc.",
        "Sterling & Co.",
        "Vanguard Systems Corp.",
        "Clearview Financial Group",
        "Atlas Property Management Inc."
      ]
    },
    "products": {
      "title": "Products we own",
      "items": [
        {
          "name": "OnRaven",
          "meta": "Comms platform · onraven.com",
          "description": "Our AI-powered customer communication platform — web chat, messaging, and engagement tools built for modern businesses.",
          "href": "https://onraven.com"
        },
        {
          "name": "Prevsi",
          "meta": "Health platform · prevsi.com",
          "description": "Our at-home HIV prevention platform for Florida — free STI testing, licensed physicians, and PrEP delivered discreetly, always at no cost to the patient.",
          "href": "https://prevsi.com"
        }
      ]
    },
    "services": {
      "title": "Services",
      "items": [
        {
          "id": "s1",
          "title": "Custom Websites",
          "description": "Conversion-focused marketing sites, designed and built from scratch."
        },
        {
          "id": "s2",
          "title": "Web Apps & Platforms",
          "description": "Dashboards, portals and SaaS products that scale with you."
        },
        {
          "id": "s3",
          "title": "E-Commerce",
          "description": "Storefronts engineered to sell and simple to manage."
        },
        {
          "id": "s4",
          "title": "Mobile Apps",
          "description": "iOS and Android experiences your customers keep using."
        },
        {
          "id": "s5",
          "title": "SEO & Performance",
          "description": "Speed and search visibility that compound over time."
        },
        {
          "id": "s6",
          "title": "Branding & Design",
          "description": "Identity and interfaces that look the part."
        },
        {
          "id": "s7",
          "title": "Automation & Integrations",
          "description": "Connect your tools and remove the busywork."
        },
        {
          "id": "s8",
          "title": "Maintenance & Support",
          "description": "We keep everything fast, secure and online."
        },
        {
          "id": "s9",
          "title": "Technical Audits",
          "description": "Code, security and performance reviews with a prioritized fix list."
        },
        {
          "id": "s10",
          "title": "DevOps & Cloud",
          "description": "Hosting, CI/CD pipelines and infrastructure that just works."
        }
      ]
    },
    "selectedWork": {
      "title": "Selected client work",
      "seeAll": "See all"
    },
    "faq": {
      "title": "Frequently asked",
      "items": [
        {
          "question": "What does Raven Platforms do?",
          "answerHtml": "We are a Toronto-based digital product studio. We design and build custom websites, web apps, mobile apps, e-commerce stores, and automation systems for businesses across North America and the Caribbean."
        },
        {
          "question": "Where is Raven Platforms located?",
          "answerHtml": "Raven Platforms Inc. is registered in Toronto, Ontario, Canada. We serve clients in Canada, the United States, and the Caribbean."
        },
        {
          "question": "What services do you offer?",
          "answerHtml": "Custom websites, web apps and SaaS platforms, e-commerce, iOS and Android mobile apps, SEO and performance, branding and design, automation and integrations, and ongoing maintenance and support."
        },
        {
          "question": "How do I start a project?",
          "answerHtml": "Email <a href=\"mailto:contact@onraven.ca\">contact@onraven.ca</a> or use the contact form below. We typically reply within one business day."
        },
        {
          "question": "Do you take on audits, DevOps or freelance projects?",
          "answerHtml": "Yes, alongside full product builds we take on technical audits, DevOps and cloud infrastructure, and focused freelance engagements, in Toronto or fully remote."
        }
      ]
    },
    "contact": {
      "title": "Get in touch",
      "description": "Tell us what you’re working on. We’ll reply within one business day.",
      "namePh": "Your name",
      "emailPh": "Email address",
      "msgPh": "What do you need built?",
      "submit": "Send message →",
      "sending": "Sending…",
      "fillAll": "Please fill in all fields.",
      "success": "Message sent - check your inbox for a confirmation.",
      "error": "Unable to send - email contact@onraven.ca."
    },
    "footer": {
      "line1": "Raven Platforms Inc. · Toronto",
      "line2": "© 2026"
    }
  },
  "es": {
    "meta": {
      "title": "Diseño web y desarrollo de software en Toronto | Raven Platforms Inc.",
      "description": "Estudio de diseño web y software en Toronto: sitios web a medida, apps web y móviles, comercio electrónico, SEO, DevOps y auditorías técnicas para empresas en América del Norte y el Caribe."
    },
    "nav": {
      "services": "Servicios",
      "clients": "Clientes",
      "cases": "Casos de estudio",
      "faq": "Preguntas",
      "cta": "Contacto →"
    },
    "hero": {
      "title": "Construimos sitios web y plataformas que conquistan clientes",
      "description": "Raven Platforms es un estudio de software de Toronto. Diseñamos y desarrollamos productos digitales modernos y rápidos para empresas ambiciosas — desde sitios de marketing hasta apps web, DevOps y auditorías.",
      "cta": "Inicia tu proyecto ↓"
    },
    "clients": {
      "label": "Con la confianza de equipos en América del Norte y el Caribe",
      "names": [
        "Prevsi",
        "OnRaven",
        "iRobcx",
        "AlgoLabs",
        "StreamVault",
        "Cadillac of Newport",
        "RMJ Transportation",
        "HM Management",
        "Coldwell Banker",
        "WeMove RD",
        "Bohemian Cap Cana",
        "CareerSafe",
        "OG Corp",
        "Tacoma Pharmacy",
        "Honda Dealer Affiliates",
        "Acura Dealer Affiliates",
        "HVAC Partners",
        "Hospitality Groups",
        "Meridian Holdings Inc.",
        "Apex Digital Corp.",
        "Northbridge Ventures LLC",
        "Summit Capital Group",
        "Harborline Industries Inc.",
        "Sterling & Co.",
        "Vanguard Systems Corp.",
        "Clearview Financial Group",
        "Atlas Property Management Inc."
      ]
    },
    "products": {
      "title": "Productos propios",
      "items": [
        {
          "name": "OnRaven",
          "meta": "Plataforma de comunicación · onraven.com",
          "description": "Nuestra plataforma de comunicación con clientes impulsada por IA — chat web, mensajería y herramientas de engagement para empresas modernas.",
          "href": "https://onraven.com"
        },
        {
          "name": "Prevsi",
          "meta": "Plataforma de salud · prevsi.com",
          "description": "Nuestra plataforma de prevención del VIH en casa para Florida — pruebas de ITS, médicos licenciados y PrEP a domicilio, siempre a costo cero para el paciente.",
          "href": "https://prevsi.com"
        }
      ]
    },
    "services": {
      "title": "Servicios",
      "items": [
        {
          "id": "s1",
          "title": "Sitios web a medida",
          "description": "Sitios de marketing enfocados en conversión, diseñados y desarrollados desde cero."
        },
        {
          "id": "s2",
          "title": "Apps web y plataformas",
          "description": "Paneles, portales y productos SaaS que escalan contigo."
        },
        {
          "id": "s3",
          "title": "Comercio electrónico",
          "description": "Tiendas online optimizadas para vender y fáciles de administrar."
        },
        {
          "id": "s4",
          "title": "Apps móviles",
          "description": "Experiencias iOS y Android que tus clientes siguen usando."
        },
        {
          "id": "s5",
          "title": "SEO y rendimiento",
          "description": "Velocidad y visibilidad en buscadores que crecen con el tiempo."
        },
        {
          "id": "s6",
          "title": "Branding y diseño",
          "description": "Identidad e interfaces que transmiten profesionalismo."
        },
        {
          "id": "s7",
          "title": "Automatización e integraciones",
          "description": "Conecta tus herramientas y elimina el trabajo repetitivo."
        },
        {
          "id": "s8",
          "title": "Mantenimiento y soporte",
          "description": "Mantenemos todo rápido, seguro y en línea."
        },
        {
          "id": "s9",
          "title": "Auditorías técnicas",
          "description": "Revisiones de código, seguridad y rendimiento con una lista de correcciones priorizada."
        },
        {
          "id": "s10",
          "title": "DevOps y nube",
          "description": "Hosting, pipelines CI/CD e infraestructura que simplemente funciona."
        }
      ]
    },
    "selectedWork": {
      "title": "Trabajo seleccionado",
      "seeAll": "Ver todos"
    },
    "faq": {
      "title": "Preguntas frecuentes",
      "items": [
        {
          "question": "¿Qué hace Raven Platforms?",
          "answerHtml": "Somos un estudio de productos digitales con sede en Toronto. Diseñamos y desarrollamos sitios web, aplicaciones web, apps móviles, tiendas de comercio electrónico y sistemas de automatización para empresas en América del Norte y el Caribe."
        },
        {
          "question": "¿Dónde está ubicada Raven Platforms?",
          "answerHtml": "Raven Platforms Inc. está registrada en Toronto, Ontario, Canadá. Atendemos clientes en Canadá, Estados Unidos y el Caribe."
        },
        {
          "question": "¿Qué servicios ofrecen?",
          "answerHtml": "Sitios web a medida, aplicaciones web y plataformas SaaS, comercio electrónico, apps móviles iOS y Android, SEO y rendimiento, branding y diseño, automatización e integraciones, y mantenimiento y soporte continuo."
        },
        {
          "question": "¿Cómo inicio un proyecto?",
          "answerHtml": "Escríbenos a <a href=\"mailto:contact@onraven.ca\">contact@onraven.ca</a> o usa el formulario de contacto. Normalmente respondemos en un día hábil."
        },
        {
          "question": "¿Hacen auditorías, DevOps o proyectos freelance?",
          "answerHtml": "Sí, además de proyectos completos, realizamos auditorías técnicas, trabajo de DevOps e infraestructura cloud, y colaboraciones freelance puntuales, en Toronto o 100% remoto."
        }
      ]
    },
    "contact": {
      "title": "Hablemos",
      "description": "Cuéntanos en qué estás trabajando. Respondemos en un día hábil.",
      "namePh": "Tu nombre",
      "emailPh": "Correo electrónico",
      "msgPh": "¿Qué necesitas construir?",
      "submit": "Enviar mensaje →",
      "sending": "Enviando…",
      "fillAll": "Por favor completa todos los campos.",
      "success": "Mensaje enviado - revisa tu bandeja de entrada.",
      "error": "No se pudo enviar - escríbenos a contact@onraven.ca."
    },
    "footer": {
      "line1": "Raven Platforms Inc. · Toronto",
      "line2": "© 2026"
    }
  }
};
