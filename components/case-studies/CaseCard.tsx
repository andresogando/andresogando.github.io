'use client';

import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { HStack } from '@astryxdesign/core/HStack';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { useLang } from '../../lib/i18n';
import { withLang } from '../../lib/nav-href';
import { RouterLink } from '../home/RouterLink';

export function CaseCard({
  slug,
  sector,
  title,
  summary,
  tags,
  fictional,
}: {
  slug: string;
  sector: string;
  title: string;
  summary: string;
  tags: string[];
  fictional?: boolean;
}) {
  const { lang } = useLang();
  const name = fictional ? `${title}**` : title;
  return (
    <Card>
      <VStack gap={2} align="start">
        <Text type="supporting" color="secondary">
          {sector}
        </Text>
        <Heading level={3}>
          <Link href={withLang(`/case-studies/${slug}`, lang)} as={RouterLink} type="inherit">
            {name}
          </Link>
        </Heading>
        <Text as="p">{summary}</Text>
        <HStack gap={2} wrap="wrap">
          {tags.map((tag) => (
            <Badge key={tag} label={tag} />
          ))}
        </HStack>
      </VStack>
    </Card>
  );
}
