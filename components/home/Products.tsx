'use client';

import { Card } from '@astryxdesign/core/Card';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { useLang } from '../../lib/i18n';

export function Products() {
  const { copy } = useLang();
  return (
    <VStack as="section" className="home-section" gap={4}>
      <Heading level={2}>{copy.products.title}</Heading>
      <Grid columns={{ minWidth: 280, max: 2 }} gap={4}>
        {copy.products.items.map((item) => (
          <Card key={item.name}>
            <VStack gap={2} align="start">
              <Heading level={3}>
                <Link href={item.href} isExternalLink type="inherit">
                  {item.name}
                </Link>
              </Heading>
              <Text type="supporting" color="secondary">
                {item.meta}
              </Text>
              <Text as="p">{item.description}</Text>
            </VStack>
          </Card>
        ))}
      </Grid>
    </VStack>
  );
}
