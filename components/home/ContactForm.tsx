'use client';

import { useState } from 'react';
import { Button } from '@astryxdesign/core/Button';
import { Heading } from '@astryxdesign/core/Heading';
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
    <VStack as="section" id="contact" className="home-section" gap={2}>
      <Heading level={2}>{copy.contact.title}</Heading>
      <Text as="p">{copy.contact.description}</Text>
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
            width="100%"
          />
          <TextArea
            label={copy.contact.msgPh}
            value={message}
            onChange={setMessage}
            placeholder={copy.contact.msgPh}
            htmlName="message"
            isRequired
            width="100%"
          />
          <Button
            label={copy.contact.submit}
            type="submit"
            variant="primary"
            isDisabled={status === 'sending'}
          />
          {statusText ? (
            <Text as="p" role="status">
              {statusText}
            </Text>
          ) : null}
        </VStack>
      </form>
    </VStack>
  );
}
