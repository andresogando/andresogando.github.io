import { JsonLd } from '../components/JsonLd';
import { Clients } from '../components/home/Clients';
import { ContactForm } from '../components/home/ContactForm';
import { Faq } from '../components/home/Faq';
import { Hero } from '../components/home/Hero';
import { Products } from '../components/home/Products';
import { SelectedWork } from '../components/home/SelectedWork';
import { Services } from '../components/home/Services';
import { homeGraph } from '../lib/jsonld';

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeGraph} />
      <Hero />
      <Clients />
      <Products />
      <Services />
      <SelectedWork />
      <Faq />
      <ContactForm />
    </>
  );
}
