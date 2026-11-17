'use client';

import { Heading } from '@astryxdesign/core/Heading';
import { useLang } from '../../lib/i18n';

export function Clients() {
  const { copy } = useLang();
  return (
    <section id="work" className="home-section">
      <p className="section-kicker">Trusted by</p>
      <Heading level={2}>{copy.clients.label}</Heading>
      <div className="client-strip">
        {copy.clients.names.map((name) => (
          <p key={name} className="client-chip">
            {name}
          </p>
        ))}
      </div>
    </section>
  );
}
