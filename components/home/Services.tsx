'use client';

import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { useLang } from '../../lib/i18n';

export function Services() {
  const { copy } = useLang();
  return (
    <section id="services" className="home-section">
      <p className="section-kicker">Capabilities</p>
      <Heading level={2}>{copy.services.title}</Heading>
      <div className="service-grid">
        {copy.services.items.map((item) => (
          <article key={item.id} className="service-item">
            <Heading level={3}>{item.title}</Heading>
            <Text as="p">{item.description}</Text>
          </article>
        ))}
      </div>
    </section>
  );
}
