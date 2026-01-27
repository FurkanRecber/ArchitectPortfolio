import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import SelectedProjects from '../components/SelectedProjects';
import TheStudio from '../components/TheStudio';
import CallToAction from '../components/CallToAction';
import Clients from '../components/Clients';
import Footer from '../components/Footer';
import { siteSettingService } from '../services/siteSettingService';
import type { SiteSetting } from '../types';

interface HomeProps {
  language?: string;
}

const Home: React.FC<HomeProps> = ({ language = 'en' }) => {
  const [settings, setSettings] = useState<SiteSetting | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        // Parametre olarak gelen "EN"/"TR" yi "en"/"tr" ye çevirip gönderelim
        const langCode = language.toLowerCase();
        const data = await siteSettingService.getSettings(langCode);
        setSettings(data);
      } catch (error) {
        console.error('Failed to load site settings:', error);
      }
    };
    loadSettings();
  }, [language]);

  return (
    <>
      <Hero
        title={language.toUpperCase() === 'TR' ? settings?.heroTitleTr : settings?.heroTitle}
        subtitle={language.toUpperCase() === 'TR' ? settings?.heroSubtitleTr : settings?.heroSubtitle}
        imageUrl={settings?.heroImageUrl}
        buttonText={language.toUpperCase() === 'TR' ? settings?.heroButtonTextTr : settings?.heroButtonText}
      />
      <SelectedProjects language={language.toUpperCase() === 'TR' ? 'TR' : 'EN'} />
      <TheStudio
        title={language.toUpperCase() === 'TR' ? settings?.aboutTitleTr : settings?.aboutTitle}
        description={language.toUpperCase() === 'TR' ? settings?.aboutDescriptionTr : settings?.aboutDescription}
        imageUrl={settings?.aboutImageUrl}
        metric1Value={settings?.metric1Value}
        metric1Title={language.toUpperCase() === 'TR' ? settings?.metric1TitleTr : settings?.metric1Title}
        metric2Value={settings?.metric2Value}
        metric2Title={language.toUpperCase() === 'TR' ? settings?.metric2TitleTr : settings?.metric2Title}
        language={language.toUpperCase() === 'TR' ? 'TR' : 'EN'}
      />
      <Clients language={language.toUpperCase() === 'TR' ? 'TR' : 'EN'} />
      <CallToAction
        title={settings?.ctaTitle}
        description={settings?.ctaDescription}
        buttonText={settings?.ctaButtonText}
        email={settings?.email}
      />
      <Footer language={language} />
    </>
  );
};

export default Home;