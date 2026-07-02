import Nav from './Nav';
import Hero from './Hero';
import Ticker from './Ticker';
import Wall from './Wall';
import Quote from './Quote';
import Story from './Story';
import Team from './Team';
import Values from './Values';
import Programmes from './Programmes';
import Plan from './Plan';
import Gallery from './Gallery';
import Voices from './Voices';
import SkyOverlay from './SkyOverlay';
import ArriveOverlay from './ArriveOverlay';
import ShareOverlay from './ShareOverlay';
import CheckoutOverlay from './CheckoutOverlay';
import Dock from './Dock';
import Footer from './Footer';
import Boot from './Boot';

export default function Site({ starId = null }) {
  return (
    <>
      <Nav />
      <Hero />
      <Ticker />
      <Wall />
      <Quote />
      <Story />
      <Team />
      <Values />
      <Programmes />
      <Plan />
      <Gallery />
      <Voices />
      <SkyOverlay />
      <ArriveOverlay />
      <ShareOverlay />
      <CheckoutOverlay />
      <Dock />
      <Footer />
      <Boot starId={starId} />
    </>
  );
}
