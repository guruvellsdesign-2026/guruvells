import { groq } from 'next-sanity';

// ─── Global Singletons ────────────────────────────────────────────────────────

export const globalSettingsQuery = groq`
  *[_type == "globalSettings"][0] {
    siteTitle,
    siteDescription,
    "seoImageUrl": seoImage.asset->url
  }
`;

export const navigationQuery = groq`
  *[_type == "navigation"][0] {
    links[]{ label, href },
    contactButtonText,
    contactButtonHref
  }
`;

export const footerQuery = groq`
  *[_type == "footer"][0] {
    phoneNumber,
    emailAddress,
    socialLinks[]{ platform, url },
    copyrightText
  }
`;

// ─── Homepage Section Singletons ──────────────────────────────────────────────

export const heroSectionQuery = groq`
  *[_type == "heroSection"][0] {
    line1,
    subtitle,
    line2,
    buttonText,
    titleColor,
    titleSize,
    animationStyle,
    "backgroundImageUrl": backgroundImage.asset->url
  }
`;

export const philosophySectionQuery = groq`
  *[_type == "philosophySection"][0] {
    textLayers,
    "floatingImageUrls": floatingImages[].asset->url
  }
`;

export const sustainabilitySectionQuery = groq`
  *[_type == "sustainabilitySection"][0] {
    sectionLabel,
    headingLines,
    bodyParagraphs,
    "imageUrl": image.asset->url,
    buttonText
  }
`;

export const ctaSectionQuery = groq`
  *[_type == "ctaSection"][0] {
    label,
    heading,
    buttonText,
    "columnImageUrls": columnImages[].asset->url
  }
`;

export const footerSectionQuery = groq`
  *[_type == "footerSection"][0] {
    navLinks[]{ label, number, href },
    email,
    phone,
    socialLinks[]{ platform, url },
    studioName,
    studioLocation,
    copyrightText
  }
`;

// ─── Dynamic Page Builder ─────────────────────────────────────────────────────

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    seoDescription,
    pageBuilder[]{
      ...,
      _type == "blockProjectSlider" => {
        "projects": projects[]->{
          title,
          "slug": slug.current,
          location,
          year,
          discipline,
          "imageUrl": imageUrl,
          status
        }
      },
      _type == "blockHero" => {
        ...,
        "backgroundUrls": backgroundImages[].asset->url
      },
      _type == "blockEditorial" => {
        ...,
        "imageUrl": image.asset->url
      },
      _type == "blockContact" => {
        ...,
        "mapUrl": mapImage.asset->url
      },
      _type == "blockTextParallax" => {
        ...,
        "imageUrls": floatingImages[].asset->url
      }
    }
  }
`;

// ─── Individual Page Singletons ───────────────────────────────────────────────

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    seoDescription,
    "heroImageUrl": heroImage.asset->url,
    introHeading,
    introHeadingSize,
    introParagraphs,
    introParagraphSize,
    "secondaryImageUrl": secondaryImage.asset->url,
    commitmentHeading,
    commitmentHeadingSize,
    commitmentText,
    commitmentTextSize
  }
`;

export const servicesPageQuery = groq`
  *[_type == "servicesPage"][0] {
    seoDescription,
    heroLabel,
    heroHeading,
    disciplines[]{
      number,
      title,
      description,
      "imageUrl": image.asset->url
    }
  }
`;

export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    seoDescription,
    introText,
    phoneNumber,
    emailAddress,
    mediaEmail,
    "backgroundImageUrl": backgroundImage.asset->url,
    "mapImageUrl": mapImage.asset->url,
    projectTypes,
    submitButtonText,
    submissionEmail
  }
`;

// ─── Portfolio Projects ───────────────────────────────────────────────────────

export const portfolioProjectsQuery = groq`
  *[_type == "portfolio"] | order(_createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    location,
    year,
    discipline,
    status,
    size,
    description,
    "heroImageUrl": image.asset->url,
    imageUrl
  }
`;

export const projectDetailQuery = groq`
  *[_type == "portfolio" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    location,
    year,
    discipline,
    status,
    size,
    description,
    "heroImageUrl": image.asset->url,
    imageUrl,
    "galleryUrls": gallery[].asset->url,
    titleFontSize,
    descriptionFontSize
  }
`;
