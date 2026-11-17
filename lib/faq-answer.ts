export type FaqAnswer = {
  before: string;
  href?: string;
  label?: string;
  after?: string;
};

const KNOWN_MAILTO_ANCHOR = '<a href="mailto:contact@onraven.ca">contact@onraven.ca</a>';

export function splitFaqAnswer(answerHtml: string): FaqAnswer {
  const at = answerHtml.indexOf(KNOWN_MAILTO_ANCHOR);
  if (at === -1) return { before: answerHtml };
  return {
    before: answerHtml.slice(0, at),
    href: 'mailto:contact@onraven.ca',
    label: 'contact@onraven.ca',
    after: answerHtml.slice(at + KNOWN_MAILTO_ANCHOR.length),
  };
}
