import { client } from "@/sanity/lib/client";
import { contactPageQuery } from "@/sanity/lib/queries";
import ContactForm from "@/components/ContactForm";

export const revalidate = 0;

export default async function ContactPage() {
    // Fetch Contact page data from Sanity
    const data = await client.fetch(contactPageQuery).catch((err) => {
        console.error("CONTACT FETCH ERROR:", err);
        return null;
    });

    console.log("SANITY SYNC CHECK (Contact):", { hasData: !!data });

    // Fallbacks
    const introText = data?.introText || "Contact us directly or submit a form enquiry and a member of the team will be in touch.";
    const phoneNumber = data?.phoneNumber || "07983 149354";
    const emailAddress = data?.emailAddress || "HELLO@CREATIVEGIANTS.ART";
    const mediaEmail = data?.mediaEmail || "media@guruvells.com";
    const backgroundImageUrl = data?.backgroundImageUrl || "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop";
    const mapImageUrl = data?.mapImageUrl || "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop";
    const submitButtonText = data?.submitButtonText || "Submit Enquiry";
    const projectTypes = data?.projectTypes || [
        "Architecture",
        "Master Planning",
        "Interior Design",
        "Landscape",
        "General Inquiry"
    ];

    return (
        <ContactForm 
            introText={introText}
            phoneNumber={phoneNumber}
            emailAddress={emailAddress}
            mediaEmail={mediaEmail}
            backgroundImageUrl={backgroundImageUrl}
            mapImageUrl={mapImageUrl}
            projectTypes={projectTypes}
            submitButtonText={submitButtonText}
        />
    );
}
