'use client';

import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { useLang } from '../../lib/i18n';

export function ContactForm() {
  const { copy } = useLang();
  return (
    <VStack as="section" id="contact" className="home-section" gap={2}>
      <Heading level={2}>{copy.contact.title}</Heading>
      <Text as="p">{copy.contact.description}</Text>
    </VStack>
  );
}
