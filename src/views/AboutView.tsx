import React, { useState } from 'react';
import { useAppState } from '../context/AppState';
import { TermsOfServiceView } from './legal/TermsOfServiceView';
import { PrivacyPolicyView } from './legal/PrivacyPolicyView';
import { CommunityGuidelinesView } from './legal/CommunityGuidelinesView';
import { CookiePolicyView } from './legal/CookiePolicyView';

interface AboutViewProps {
  onClose: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onClose }) => {
  const { currentUser } = useAppState();
  const [showLegalDocument, setShowLegalDocument] = useState<'terms' | 'privacy' | 'guidelines' | 'cookies' | null>(null);

  // Show legal document views
  if (showLegalDocument === 'terms') {
    return <TermsOfServiceView onClose={() => setShowLegalDocument(null)} />;
  }
  if (showLegalDocument === 'privacy') {
    return <PrivacyPolicyView onClose={() => setShowLegalDocument(null)} />;
  }
  if (showLegalDocument === 'guidelines') {
    return <CommunityGuidelinesView onClose={() => setShowLegalDocument(null)} />;
  }
  if (showLegalDocument === 'cookies') {
    return <CookiePolicyView onClose={() => setShowLegalDocument(null)} />;
  }

  return (
    <div className="min-h-screen bg-dark-bg pt-[60px] pb-24">
      <div className="max-w-content md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-screen-padding md:px-6 lg:px-8">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onClose} className="text-orange hover:opacity-80 transition-opacity active:opacity-70">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-text-primary">About</h1>
          <div className="w-6" />
        </div>

        <div className="space-y-6">
          {/* App Information */}
          <div className="bg-surface-dark rounded-card p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange to-yellow-500 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">StealthWeb</h2>
              <p className="text-base text-text-secondary text-center">
                Connect with friends worldwide. Share experiences, learn languages, and explore cultures.
              </p>
            </div>
          </div>

          {/* App Details */}
          <div className="bg-surface-dark rounded-card p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">App Information</h2>
            <div className="space-y-3">
              <InfoRow label="Version" value="1.0.0" />
              <InfoRow label="Platform" value="Web" />
              <InfoRow label="Build" value="2024.01.15" />
              <InfoRow label="Release Date" value="January 2024" />
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="bg-surface-dark rounded-card p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Our Mission</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              StealthWeb is a social networking platform designed to bring people together from around the world. We believe in the power of friendship, cultural exchange, and meaningful connections.
            </p>
            <h3 className="text-base font-semibold text-text-primary mb-2 mt-4">What We Stand For</h3>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-2">
              <li>Building genuine friendships across cultures</li>
              <li>Promoting respectful and meaningful conversations</li>
              <li>Creating a safe and welcoming community</li>
              <li>Supporting language learning and cultural exchange</li>
              <li>Protecting user privacy and data</li>
            </ul>
          </div>

          {/* Features */}
          <div className="bg-surface-dark rounded-card p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FeatureItem icon="users" title="Global Connections" description="Connect with people worldwide" />
              <FeatureItem icon="language" title="Language Learning" description="Practice languages with native speakers" />
              <FeatureItem icon="globe" title="Cultural Exchange" description="Share and learn about different cultures" />
              <FeatureItem icon="shield" title="Safe & Secure" description="Privacy-focused with robust security" />
              <FeatureItem icon="heart" title="Friendship Focus" description="Designed for genuine friendships" />
              <FeatureItem icon="sparkles" title="Rich Content" description="Share photos, posts, and experiences" />
            </div>
          </div>

          {/* Technology */}
          <div className="bg-surface-dark rounded-card p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Built With</h2>
            <div className="space-y-3">
              <TechItem name="React.js" description="Modern UI framework" />
              <TechItem name="TypeScript" description="Type-safe development" />
              <TechItem name="Firebase" description="Authentication, database, and storage" />
              <TechItem name="Tailwind CSS" description="Utility-first styling" />
              <TechItem name="Vite" description="Fast build tooling" />
            </div>
          </div>

          {/* Legal & Policies */}
          <div className="bg-surface-dark rounded-card p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Legal & Policies</h2>
            <div className="space-y-3">
              <LinkButton
                title="Terms of Service"
                description="Read our terms and conditions"
                onClick={() => setShowLegalDocument('terms')}
              />
              <LinkButton
                title="Privacy Policy"
                description="Learn how we protect your data"
                onClick={() => setShowLegalDocument('privacy')}
              />
              <LinkButton
                title="Community Guidelines"
                description="Understand our community standards"
                onClick={() => setShowLegalDocument('guidelines')}
              />
              <LinkButton
                title="Cookie Policy"
                description="Learn about our use of cookies"
                onClick={() => setShowLegalDocument('cookies')}
              />
            </div>
          </div>

          {/* Contact & Support */}
          <div className="bg-surface-dark rounded-card p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Contact Us</h2>
            <div className="space-y-3">
              <ContactItem
                icon="envelope"
                label="General Inquiries"
                value="support@stealthweb.com"
                onClick={() => window.location.href = 'mailto:support@stealthweb.com'}
              />
              <ContactItem
                icon="globe"
                label="Website"
                value="www.stealthweb.com"
                onClick={() => window.open('https://www.stealthweb.com', '_blank')}
              />
              <ContactItem
                icon="map"
                label="Location"
                value="India"
                onClick={() => {}}
              />
            </div>
          </div>

          {/* Credits */}
          <div className="bg-surface-dark rounded-card p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Credits</h2>
            <div className="space-y-3">
              <p className="text-base text-text-secondary">
                StealthWeb is developed with ❤️ by our team. We're committed to creating a positive and safe environment for everyone.
              </p>
              <p className="text-sm text-text-secondary mt-4">
                © 2024 StealthWeb. All rights reserved.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-surface-dark rounded-card p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Follow Us</h2>
            <div className="flex gap-4">
              <SocialButton
                icon="twitter"
                label="Twitter"
                onClick={() => window.open('https://twitter.com/stealthweb', '_blank')}
              />
              <SocialButton
                icon="facebook"
                label="Facebook"
                onClick={() => window.open('https://facebook.com/stealthweb', '_blank')}
              />
              <SocialButton
                icon="instagram"
                label="Instagram"
                onClick={() => window.open('https://instagram.com/stealthweb', '_blank')}
              />
              <SocialButton
                icon="linkedin"
                label="LinkedIn"
                onClick={() => window.open('https://linkedin.com/company/stealthweb', '_blank')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Info Row Component
interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
      <span className="text-base text-text-secondary">{label}</span>
      <span className="text-base font-medium text-text-primary">{value}</span>
    </div>
  );
};

// Feature Item Component
interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => {
  const getIcon = () => {
    const iconClass = "w-5 h-5";
    switch (icon) {
      case 'users':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'language':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'globe':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      case 'shield':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
          </svg>
        );
      case 'heart':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      case 'sparkles':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 bg-dark-bg rounded-card">
      <div className="w-10 h-10 bg-orange/20 rounded-xl flex items-center justify-center text-orange flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1">
        <div className="text-base font-medium text-text-primary">{title}</div>
        <div className="text-sm text-text-secondary mt-1">{description}</div>
      </div>
    </div>
  );
};

// Tech Item Component
interface TechItemProps {
  name: string;
  description: string;
}

const TechItem: React.FC<TechItemProps> = ({ name, description }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
      <div>
        <span className="text-base font-medium text-text-primary">{name}</span>
        <span className="text-sm text-text-secondary ml-2">— {description}</span>
      </div>
    </div>
  );
};

// Link Button Component
interface LinkButtonProps {
  title: string;
  description: string;
  onClick: () => void;
}

const LinkButton: React.FC<LinkButtonProps> = ({ title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-dark-bg rounded-card hover:opacity-90 transition-opacity active:opacity-75"
    >
      <div className="text-left">
        <div className="text-base font-medium text-text-primary">{title}</div>
        <div className="text-sm text-text-secondary mt-1">{description}</div>
      </div>
      <svg className="w-4 h-4 text-text-faded flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

// Contact Item Component
interface ContactItemProps {
  icon: string;
  label: string;
  value: string;
  onClick: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, label, value, onClick }) => {
  const getIcon = () => {
    const iconClass = "w-5 h-5";
    switch (icon) {
      case 'envelope':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'globe':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      case 'map':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 bg-dark-bg rounded-card hover:opacity-90 transition-opacity active:opacity-75 text-left"
    >
      <div className="w-10 h-10 bg-orange/20 rounded-xl flex items-center justify-center text-orange flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1">
        <div className="text-sm text-text-secondary">{label}</div>
        <div className="text-base font-medium text-text-primary mt-1">{value}</div>
      </div>
    </button>
  );
};

// Social Button Component
interface SocialButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, label, onClick }) => {
  const getIcon = () => {
    const iconClass = "w-6 h-6";
    switch (icon) {
      case 'twitter':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
          </svg>
        );
      case 'facebook':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
          </svg>
        );
      case 'instagram':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 bg-dark-bg rounded-card hover:opacity-90 transition-opacity active:opacity-75"
    >
      <div className="w-12 h-12 bg-orange/20 rounded-xl flex items-center justify-center text-orange">
        {getIcon()}
      </div>
      <span className="text-xs text-text-secondary">{label}</span>
    </button>
  );
};
