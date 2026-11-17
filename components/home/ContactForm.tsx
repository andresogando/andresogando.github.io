'use client';

import { useState } from 'react';
import { Heading } from '@astryxdesign/core/Heading';
import { Link } from '@astryxdesign/core/Link';
import { Text } from '@astryxdesign/core/Text';
import { TextArea } from '@astryxdesign/core/TextArea';
import { TextInput } from '@astryxdesign/core/TextInput';
import { VStack } from '@astryxdesign/core/VStack';
import { useLang } from '../../lib/i18n';

type Status = 'idle' | 'sending' | 'success' | 'error' | 'incomplete';

export function ContactForm() {
  const { copy } = useLang();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('incomplete');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) {
        setStatus('error');
        return;
      }
      setName('');
      setEmail('');
      setMessage('');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const isSending = status === 'sending';

  const statusText =
    status === 'sending'
      ? copy.contact.sending
      : status === 'success'
        ? copy.contact.success
        : status === 'incomplete'
          ? copy.contact.fillAll
          : status === 'error'
            ? copy.contact.error
            : '';

  return (
    <section id="contact" className="home-section">
      <p className="section-kicker">Contact</p>
      <Heading level={2}>{copy.contact.title}</Heading>
      <div className="contact-panel">
        <div className="contact-aside">
          <p className="section-lead">{copy.contact.description}</p>
          <Link href="mailto:contact@onraven.ca" isStandalone>
            contact@onraven.ca
          </Link>
        </div>
        <form onSubmit={onSubmit}>
          <VStack gap={2}>
            <TextInput
              label={copy.contact.namePh}
              value={name}
              onChange={setName}
              placeholder={copy.contact.namePh}
              htmlName="name"
              autoComplete="name"
              isRequired
              isDisabled={isSending}
              width="100%"
            />
            <TextInput
              label={copy.contact.emailPh}
              type="email"
              value={email}
              onChange={setEmail}
              placeholder={copy.contact.emailPh}
              htmlName="email"
              autoComplete="email"
              isRequired
              isDisabled={isSending}
              width="100%"
            />
            <TextArea
              label={copy.contact.msgPh}
              value={message}
              onChange={setMessage}
              placeholder={copy.contact.msgPh}
              htmlName="message"
              isRequired
              isDisabled={isSending}
              width="100%"
            />
            <button className="cta cta-primary" type="submit" disabled={isSending}>
              {copy.contact.submit}
            </button>
            {statusText ? (
              <Text as="p" role="status">
                {statusText}
              </Text>
            ) : null}
          </VStack>
        </form>
      </div>
    </section>
  );
}
