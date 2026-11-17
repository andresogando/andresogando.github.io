'use client';

import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { useLang } from '../../lib/i18n';

export function Services() {
  const { copy } = useLang();
  return (
    <VStack as="section" id="services" className="home-section" gap={4}>
      <Heading level={2}>{copy.services.title}</Heading>
      <Grid columns={{ minWidth: 220, max: 2 }} gap={4}>
        {copy.services.items.map((item) => (
          <VStack key={item.id} gap={1}>
            <Heading level={3}>{item.title}</Heading>
            <Text as="p">{item.description}</Text>
          </VStack>
        ))}
      </Grid>
    </VStack>
  );
}
