"use client";

import { useState } from "react";
import Image from "next/image";

interface ContactFormProps {
    introText: string;
    phoneNumber: string;
    emailAddress: string;
    mediaEmail: string;
    backgroundImageUrl: string;
    mapImageUrl: string;
    projectTypes: string[];
    submitButtonText: string;
}

export default function ContactForm({
    introText,
    phoneNumber,
    emailAddress,
    mediaEmail,
    backgroundImageUrl,
    mapImageUrl,
    projectTypes,
    submitButtonText
}: ContactFormProps) {
    const defaultHook = "Let's Build Something Exceptional";
    const hookToUse = introText.length < 50 ? introText : defaultHook; // Use the provided text if short, otherwise use the punchy default

    const [selectedType, setSelectedType] = useState<string>(projectTypes[0] || "Architecture");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
        }, 600);
    };

    return (
        <main className="min-h-screen grid grid-cols-1 lg:grid-cols-10 bg-[#f4f4f4] text-[#18181A] selection:bg-bronze selection:text-cream">
            
            {/* The Anchor: Left Side (40%) */}
            <div className="relative lg:col-span-4 bg-[#111] text-cream flex flex-col justify-between pt-24 lg:pt-32 pb-12 lg:pb-16 px-6 sm:px-8 lg:px-16 min-h-[55vh] lg:min-h-screen overflow-hidden">
                {/* Architectural Background Layer */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <Image 
                        src={backgroundImageUrl}
                        alt="Architectural Details"
                        fill
                        unoptimized
                        className="object-cover grayscale"
                    />
                    {/* Gradient to ensure text readability at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
                </div>

                {/* Top Section: The Hook */}
                <div className="relative z-10 flex flex-col gap-6 max-w-sm">
                    <span className="metadata-label !text-cream/50">( Contact )</span>
                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.02em]">
                        {hookToUse}
                    </h1>
                </div>

                {/* Bottom Section: Studio Details */}
                <div className="relative z-10 flex flex-col gap-10 lg:gap-16 mt-16 lg:mt-0">
                    <div className="flex flex-col gap-8">
                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <span className="metadata-label !text-cream/40 !tracking-[0.2em]">New Projects & Inquiries</span>
                            <a href={`mailto:${emailAddress}`} className="font-sans text-xl hover:text-bronze transition-colors pb-[1px] inline-block w-fit relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-cream/20 hover:after:bg-bronze after:transition-colors">
                                {emailAddress}
                            </a>
                        </div>
                        
                        {/* Phone */}
                        <div className="flex flex-col gap-2">
                            <span className="metadata-label !text-cream/40 !tracking-[0.2em]">Studio Phone</span>
                            <a href={`tel:${phoneNumber.replace(/\s+/g, '')}`} className="font-sans text-xl hover:text-bronze transition-colors w-fit">
                                {phoneNumber}
                            </a>
                        </div>
                        
                        {/* Media Inquiries - Direct Access Pattern */}
                        <div className="flex flex-col gap-2 pt-4 border-t border-cream/10">
                            <span className="metadata-label !text-cream/40 !tracking-[0.2em]">Press & Media</span>
                            <a href={`mailto:${mediaEmail}`} className="font-sans text-base text-cream/70 hover:text-cream transition-colors w-fit">
                                {mediaEmail}
                            </a>
                        </div>
                    </div>

                    {/* Highly abstracted, monochromatic map block */}
                    <div className="w-full h-[180px] bg-white relative overflow-hidden group">
                        <Image
                            src={mapImageUrl}
                            alt="Studio Location Map"
                            fill
                            unoptimized
                            className="object-cover grayscale contrast-125 opacity-70 group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        />
                        <div className="absolute inset-0 bg-[#111]/30 mix-blend-multiply" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                             <div className="w-3 h-3 bg-bronze rounded-full animate-ping absolute" />
                             <div className="w-3 h-3 bg-bronze rounded-full relative z-10" />
                        </div>
                    </div>
                </div>
            </div>

            {/* The Canvas: Right Side (60%) */}
            <div className="lg:col-span-6 bg-[#f4f4f4] pt-16 lg:pt-32 pb-16 lg:pb-24 px-6 sm:px-8 lg:px-24 xl:px-32 flex flex-col justify-center min-h-[60vh] lg:min-h-screen">
                
                {isSubmitted ? (
                    // Success View
                    <div className="w-full max-w-2xl animate-fade-in flex flex-col gap-6">
                        <h2 className="font-serif text-4xl lg:text-5xl text-[#18181A]">
                            Thank you.
                        </h2>
                        <p className="font-sans text-lg lg:text-xl text-[#18181A]/60 leading-relaxed max-w-lg">
                            Our studio has received your inquiry. One of our associates will be in touch with you shortly.
                        </p>
                    </div>
                ) : (
                    // Form View
                    <div className="w-full max-w-2xl animate-fade-in flex flex-col gap-10 md:gap-16">
                        
                        {/* The interactive "Project Type" Pill Selector */}
                        <div className="flex flex-col gap-6">
                            <span className="metadata-label !text-[#18181A]/40">What are you looking for?</span>
                            <div className="flex flex-wrap gap-3">
                                {projectTypes.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={`px-6 py-3 rounded-full text-sm font-sans whitespace-nowrap transition-all duration-300 ${
                                            selectedType === type 
                                            ? 'bg-[#18181A] text-cream' 
                                            : 'bg-transparent border border-[#18181A]/20 text-[#18181A] hover:border-[#18181A]/60'
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Minimalist Inputs */}
                        <form className="flex flex-col gap-8 md:gap-12" onSubmit={handleSubmit}>
                            {/* Row 1: Names */}
                            <div className="flex flex-col sm:flex-row gap-12">
                                <div className="flex-1 flex flex-col gap-2 relative group">
                                    <label className="text-xs font-medium text-[#18181A]/40 font-sans tracking-[0.1em] uppercase">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-transparent border-b border-[#18181A]/20 pb-3 text-lg font-sans focus:outline-none focus:border-[#18181A] hover:border-[#18181A] transition-colors"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col gap-2 relative group">
                                    <label className="text-xs font-medium text-[#18181A]/40 font-sans tracking-[0.1em] uppercase">Last Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-transparent border-b border-[#18181A]/20 pb-3 text-lg font-sans focus:outline-none focus:border-[#18181A] hover:border-[#18181A] transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Row 2: Contact Info */}
                            <div className="flex flex-col sm:flex-row gap-12">
                                <div className="flex-1 flex flex-col gap-2 relative group">
                                    <label className="text-xs font-medium text-[#18181A]/40 font-sans tracking-[0.1em] uppercase">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-transparent border-b border-[#18181A]/20 pb-3 text-lg font-sans focus:outline-none focus:border-[#18181A] hover:border-[#18181A] transition-colors"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col gap-2 relative group">
                                    <label className="text-xs font-medium text-[#18181A]/40 font-sans tracking-[0.1em] uppercase">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full bg-transparent border-b border-[#18181A]/20 pb-3 text-lg font-sans focus:outline-none focus:border-[#18181A] hover:border-[#18181A] transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Row 3: Message Canvas */}
                            <div className="flex flex-col gap-2 relative group">
                                <label className="text-xs font-medium text-[#18181A]/40 font-sans tracking-[0.1em] uppercase">Project Details ({selectedType})</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Tell us about your timeline, scope, and vision..."
                                    className="w-full bg-transparent border-b border-[#18181A]/20 pb-3 pt-2 text-lg font-sans resize-none focus:outline-none focus:border-[#18181A] hover:border-[#18181A] placeholder:text-[#18181A]/30 transition-colors"
                                />
                            </div>

                            {/* Premium Submit Button */}
                            <div className="w-full mt-8">
                                <button
                                    type="submit"
                                    className="group relative flex items-center justify-between w-full md:w-auto md:min-w-[240px] px-8 py-5 bg-[#18181A] text-cream hover:bg-bronze transition-colors duration-500 overflow-hidden"
                                >
                                    <span className="font-sans text-sm font-medium tracking-[0.15em] uppercase z-10 relative">
                                        {submitButtonText}
                                    </span>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="z-10 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="square"/></svg>
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.8s ease-out forwards;
                }
            `}} />
        </main>
    );
}
