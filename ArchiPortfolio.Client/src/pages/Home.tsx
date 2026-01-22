import React from 'react';
import Hero from '../components/Hero';
import SelectedProjects from '../components/SelectedProjects';
import TheStudio from '../components/TheStudio';
import CallToAction from '../components/CallToAction';
import Clients from '../components/Clients';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <SelectedProjects />
      <TheStudio />
      <Clients />
      <CallToAction />
      <Footer />
    </>
  );
};

export default Home;