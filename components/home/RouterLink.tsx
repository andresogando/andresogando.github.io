import NextLink from 'next/link';
import type { ComponentProps } from 'react';

export function RouterLink({ to, href, ...props }: ComponentProps<typeof NextLink> & { to?: string }) {
  return <NextLink {...props} href={href ?? to ?? '/'} />;
}
