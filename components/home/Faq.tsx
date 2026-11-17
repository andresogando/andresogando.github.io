'use client';

import { Collapsible, CollapsibleGroup } from '@astryxdesign/core/Collapsible';
import { Heading } from '@astryxdesign/core/Heading';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { splitFaqAnswer } from '../../lib/faq-answer';
import { useLang } from '../../lib/i18n';

export function Faq() {
  const { copy } = useLang();
  return (
    <VStack as="section" id="faq" className="home-section" gap={4}>
      <Heading level={2}>{copy.faq.title}</Heading>
      <CollapsibleGroup type="single" hasDividers>
        {copy.faq.items.map((item, index) => {
          const answer = splitFaqAnswer(item.answerHtml);
          return (
            <Collapsible key={item.question} value={String(index)} trigger={item.question}>
              <Text as="p">
                {answer.before}
                {answer.href && answer.label ? (
                  <Link href={answer.href} type="inherit">
                    {answer.label}
                  </Link>
                ) : null}
                {answer.after}
              </Text>
            </Collapsible>
          );
        })}
      </CollapsibleGroup>
    </VStack>
  );
}
