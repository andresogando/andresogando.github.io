'use client';

import { Button } from '@astryxdesign/core/Button';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { useLang } from '../../lib/i18n';
import { withLang } from '../../lib/nav-href';
import { RouterLink } from './RouterLink';

export function Hero() {
  const { copy, lang } = useLang();
  return (
    <VStack as="section" className="home-section hero-enter" gap={3} align="start">
      <Heading level={1}>Raven Platforms</Heading>
      <Heading level={2}>{copy.hero.title}</Heading>
      <Text as="p">{copy.hero.description}</Text>
      <Button label={copy.hero.cta} href={withLang('/#contact', lang)} as={RouterLink} variant="primary" />
    </VStack>
  );
}
