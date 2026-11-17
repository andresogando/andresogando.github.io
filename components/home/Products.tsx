'use client';

import { Heading } from '@astryxdesign/core/Heading';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { useLang } from '../../lib/i18n';

export function Products() {
  const { copy } = useLang();
  return (
    <section className="home-section">
      <p className="section-kicker">Products</p>
      <Heading level={2}>{copy.products.title}</Heading>
      <div className="plate-grid">
        {copy.products.items.map((item) => (
          <article key={item.name} className="ink-plate">
            <p className="ink-plate-meta">{item.meta}</p>
            <Heading level={3}>
              <Link href={item.href} isExternalLink type="inherit">
                {item.name}
              </Link>
            </Heading>
            <Text as="p">{item.description}</Text>
          </article>
        ))}
      </div>
    </section>
  );
}
