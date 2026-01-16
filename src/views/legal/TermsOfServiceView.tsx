import React from 'react';

interface TermsOfServiceViewProps {
  onClose: () => void;
}

export const TermsOfServiceView: React.FC<TermsOfServiceViewProps> = ({ onClose }) => {
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
          <h1 className="text-lg font-semibold text-text-primary">Terms of Service</h1>
          <div className="w-6" />
        </div>

        <div className="bg-surface-dark rounded-card p-6 space-y-6">
          <div>
            <p className="text-sm text-text-secondary mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">1. Acceptance of Terms</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              By accessing and using StealthWeb ("the Platform", "we", "us", "our"), you accept and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not use the Platform.
            </p>
            <p className="text-base text-text-secondary leading-relaxed">
              These Terms constitute a legally binding agreement between you and StealthWeb. We may update these Terms from time to time, and your continued use of the Platform after such changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">2. Description of Service</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              StealthWeb is a social networking platform designed for friendship, cultural exchange, language learning, and content sharing. The Platform enables users to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li>Connect with people from around the world for friendship and cultural exchange</li>
              <li>Share content related to travel, hobbies, interests, and educational topics</li>
              <li>Practice languages and learn about different cultures</li>
              <li>Engage in respectful conversations and discussions</li>
            </ul>
            <p className="text-base text-text-secondary leading-relaxed mt-4">
              The Platform is NOT intended for dating, explicit content, nudity, harassment, or any illegal activities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">3. User Accounts and Registration</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              To use certain features of the Platform, you must create an account. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain and update your account information to keep it accurate</li>
              <li>Maintain the security of your account credentials</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Be at least 16 years of age (or the age of majority in your jurisdiction)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">4. Acceptable Use Policy</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              You agree NOT to use the Platform to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li>Post, share, or transmit any content that is illegal, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or pornographic</li>
              <li>Share nudity, explicit sexual content, or any material that violates community standards</li>
              <li>Impersonate any person or entity or falsely represent your affiliation with any person or entity</li>
              <li>Engage in spamming, phishing, or any fraudulent activities</li>
              <li>Violate any applicable local, state, national, or international law</li>
              <li>Infringe upon the intellectual property rights of others</li>
              <li>Collect or store personal data about other users without their consent</li>
              <li>Use automated systems (bots, scrapers) to access the Platform without authorization</li>
              <li>Interfere with or disrupt the Platform's servers or networks</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">5. Content Ownership and License</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              You retain ownership of all content you post on the Platform. However, by posting content, you grant StealthWeb a worldwide, non-exclusive, royalty-free license to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li>Use, reproduce, modify, adapt, publish, and distribute your content on the Platform</li>
              <li>Display your content to other users as intended by the Platform's functionality</li>
              <li>Remove or modify your content if it violates these Terms or our Community Guidelines</li>
            </ul>
            <p className="text-base text-text-secondary leading-relaxed mt-4">
              You represent and warrant that you own or have the necessary rights to all content you post and that such content does not infringe upon the rights of any third party.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">6. Privacy and Data Protection</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              Your privacy is important to us. Our collection and use of your personal information is governed by our Privacy Policy, which complies with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li>Information Technology Act, 2000 (India) and its amendments</li>
              <li>Digital Personal Data Protection Act, 2023 (India)</li>
              <li>General Data Protection Regulation (GDPR) for EU users</li>
              <li>California Consumer Privacy Act (CCPA) for California residents</li>
              <li>Other applicable data protection laws</li>
            </ul>
            <p className="text-base text-text-secondary leading-relaxed mt-4">
              By using the Platform, you consent to the collection and use of your information as described in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">7. Intellectual Property Rights</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              The Platform, including its design, features, logos, and software, is owned by StealthWeb and protected by copyright, trademark, and other intellectual property laws. You may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li>Copy, modify, or create derivative works of the Platform</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Platform</li>
              <li>Use our trademarks, logos, or branding without prior written permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">8. Termination</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              We reserve the right to suspend or terminate your account and access to the Platform at any time, with or without notice, for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li>Violation of these Terms or our Community Guidelines</li>
              <li>Engaging in illegal activities</li>
              <li>Posting inappropriate or prohibited content</li>
              <li>Harassment or abuse of other users</li>
              <li>Any other reason we deem necessary to protect the Platform and its users</li>
            </ul>
            <p className="text-base text-text-secondary leading-relaxed mt-4">
              You may terminate your account at any time by contacting us or using the account deletion feature in your settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">9. Disclaimers and Limitation of Liability</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li>The Platform will be uninterrupted, secure, or error-free</li>
              <li>Any defects will be corrected</li>
              <li>The Platform is free of viruses or other harmful components</li>
            </ul>
            <p className="text-base text-text-secondary leading-relaxed mt-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, STEALTHWEB SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE PLATFORM.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">10. Indemnification</h2>
            <p className="text-base text-text-secondary leading-relaxed">
              You agree to indemnify and hold harmless StealthWeb, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4 mt-4">
              <li>Your use of the Platform</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another user or third party</li>
              <li>Any content you post on the Platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">11. Governing Law and Dispute Resolution</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              Any disputes arising from these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of the courts in [Your City], India.
            </p>
            <p className="text-base text-text-secondary leading-relaxed">
              For users outside India, these Terms shall be governed by the laws of your jurisdiction, and any disputes shall be resolved in accordance with applicable local laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">12. Grievance Redressal</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              In accordance with the Information Technology Act, 2000, we have appointed a Grievance Officer. If you have any complaints or concerns regarding:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li>Content posted on the Platform</li>
              <li>Privacy violations</li>
              <li>Terms of Service violations</li>
            </ul>
            <p className="text-base text-text-secondary leading-relaxed mt-4">
              Please contact our Grievance Officer at:
            </p>
            <div className="bg-dark-bg rounded-card p-4 mt-4">
              <p className="text-base text-text-primary font-medium">Grievance Officer</p>
              <p className="text-sm text-text-secondary mt-2">Email: grievance@stealthweb.com</p>
              <p className="text-sm text-text-secondary">Address: [Your Address]</p>
              <p className="text-sm text-text-secondary">We will respond to your grievance within 30 days as required by law.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">13. Contact Information</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="bg-dark-bg rounded-card p-4">
              <p className="text-base text-text-primary font-medium">StealthWeb Support</p>
              <p className="text-sm text-text-secondary mt-2">Email: support@stealthweb.com</p>
              <p className="text-sm text-text-secondary">Website: www.stealthweb.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">14. Changes to Terms</h2>
            <p className="text-base text-text-secondary leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of material changes via email or through a notice on the Platform. Your continued use of the Platform after such modifications constitutes acceptance of the updated Terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
