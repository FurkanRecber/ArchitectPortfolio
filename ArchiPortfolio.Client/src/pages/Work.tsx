import React from 'react';
import WorkPage from '../components/WorkPage';
import Footer from '../components/Footer';

interface PageProps {
  language?: 'EN' | 'TR';
}

const Work: React.FC<PageProps> = ({ language = 'EN' }) => {
  return (
    <>
      <WorkPage language={language} />
      <Footer language={language} />
    </>
  );
};

export default Work;