import { type SchemaTypeDefinition } from 'sanity';

// Content Types
import portfolio from './portfolio';
import page from './page';

// Global Singletons
import globalSettings from './globalSettings';
import navigation from './navigation';
import footer from './footer';

// Individual Page Singletons
import aboutPage from './aboutPage';
import servicesPage from './servicesPage';
import contactPage from './contactPage';

// Homepage Section Singletons
import heroSection from './heroSection';
import philosophySection from './philosophySection';
import sustainabilitySection from './sustainabilitySection';
import ctaSection from './ctaSection';
import footerSection from './footerSection';

// Page Builder Blocks
import blockHero from './blocks/blockHero';
import blockTextParallax from './blocks/blockTextParallax';
import blockProjectSlider from './blocks/blockProjectSlider';
import blockEditorial from './blocks/blockEditorial';
import blockContact from './blocks/blockContact';

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        // Globals
        globalSettings,
        navigation,
        footer,

        // Homepage Sections
        heroSection,
        philosophySection,
        sustainabilitySection,
        ctaSection,
        footerSection,
        
        // Page Singletons
        aboutPage,
        servicesPage,
        contactPage,

        // Documents
        page,
        portfolio,
        
        // Modular Blocks
        blockHero,
        blockTextParallax,
        blockProjectSlider,
        blockEditorial,
        blockContact,
    ],
};
