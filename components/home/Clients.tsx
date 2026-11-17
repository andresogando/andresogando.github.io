'use client';

import { Heading } from '@astryxdesign/core/Heading';
import { HStack } from '@astryxdesign/core/HStack';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { useLang } from '../../lib/i18n';

export function Clients() {
  const { copy } = useLang();
  return (
    <VStack as="section" id="work" className="home-section" gap={3}>
      <Heading level={2}>{copy.clients.label}</Heading>
      <HStack wrap="wrap" gap={3} align="center">
        {copy.clients.names.map((name) => (
          <Text key={name} weight="medium">
            {name}
          </Text>
        ))}
      </HStack>
    </VStack>
  );
}
