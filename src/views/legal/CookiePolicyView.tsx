import React from 'react';

interface CookiePolicyViewProps {
  onClose: () => void;
}

export const CookiePolicyView: React.FC<CookiePolicyViewProps> = ({ onClose }) => {
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
          <h1 className="text-lg font-semibold text-text-primary">Cookie Policy</h1>
          <div className="w-6" />
        </div>

        <div className="bg-surface-dark rounded-card p-6 space-y-6">
          <div>
            <p className="text-sm text-text-secondary mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
            <p className="text-base text-text-secondary leading-relaxed">
              This Cookie Policy explains how StealthWeb ("we", "us", "our") uses cookies and similar tracking technologies on our Platform. This policy should be read alongside our Privacy Policy.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">1. What Are Cookies?</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p className="text-base text-text-secondary leading-relaxed">
              Cookies allow websites to recognize your device and store some information about your preferences or past actions. This helps improve your browsing experience and allows websites to provide personalized content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">2. Types of Cookies We Use</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">2.1 Essential Cookies</h3>
                <p className="text-base text-text-secondary leading-relaxed mb-2">
                  These cookies are necessary for the Platform to function properly. They enable core functionality such as:
                </p>
                <ul className="list-disc list-inside space-y-1 text-base text-text-secondary ml-4">
                  <li>User authentication and login sessions</li>
                  <li>Security and fraud prevention</li>
                  <li>Remembering your preferences and settings</li>
                  <li>Load balancing and performance optimization</li>
                </ul>
                <p className="text-base text-text-secondary leading-relaxed mt-2">
                  <strong>Duration:</strong> Session cookies (deleted when you close your browser) or persistent cookies (stored for up to 1 year)
                </p>
                <p className="text-base text-text-secondary leading-relaxed">
                  <strong>Can you opt-out?</strong> No, these cookies are essential for the Platform to work.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">2.2 Functional Cookies</h3>
                <p className="text-base text-text-secondary leading-relaxed mb-2">
                  These cookies enhance functionality and personalization:
                </p>
                <ul className="list-disc list-inside space-y-1 text-base text-text-secondary ml-4">
                  <li>Remembering your language preferences</li>
                  <li>Storing your theme settings (dark/light mode)</li>
                  <li>Maintaining your chat history and preferences</li>
                  <li>Remembering your content filter settings</li>
                </ul>
                <p className="text-base text-text-secondary leading-relaxed mt-2">
                  <strong>Duration:</strong> Up to 1 year
                </p>
                <p className="text-base text-text-secondary leading-relaxed">
                  <strong>Can you opt-out?</strong> Yes, but this may limit certain features.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">2.3 Analytics Cookies</h3>
                <p className="text-base text-text-secondary leading-relaxed mb-2">
                  These cookies help us understand how users interact with the Platform:
                </p>
                <ul className="list-disc list-inside space-y-1 text-base text-text-secondary ml-4">
                  <li>Page views and navigation patterns</li>
                  <li>Feature usage and popularity</li>
                  <li>Error tracking and performance monitoring</li>
                  <li>User demographics (anonymized)</li>
                </ul>
                <p className="text-base text-text-secondary leading-relaxed mt-2">
                  <strong>Duration:</strong> Up to 2 years
                </p>
                <p className="text-base text-text-secondary leading-relaxed">
                  <strong>Can you opt-out?</strong> Yes, you can disable analytics cookies in your Privacy Settings.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">2.4 Advertising Cookies (Third-Party)</h3>
                <p className="text-base text-text-secondary leading-relaxed mb-2">
                  We may use third-party advertising cookies to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-base text-text-secondary ml-4">
                  <li>Show relevant advertisements (if we implement advertising)</li>
                  <li>Measure ad effectiveness</li>
                  <li>Prevent showing the same ad repeatedly</li>
                </ul>
                <p className="text-base text-text-secondary leading-relaxed mt-2">
                  <strong>Duration:</strong> Up to 1 year
                </p>
                <p className="text-base text-text-secondary leading-relaxed">
                  <strong>Can you opt-out?</strong> Yes, you can opt-out in your Privacy Settings or through third-party opt-out tools.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">3. Third-Party Cookies</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              We may use services from third parties that set their own cookies:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li><strong>Analytics Providers:</strong> Google Analytics, Firebase Analytics (for usage statistics)</li>
              <li><strong>Cloud Services:</strong> Firebase, AWS (for Platform infrastructure)</li>
              <li><strong>Content Delivery Networks:</strong> For faster content delivery</li>
            </ul>
            <p className="text-base text-text-secondary leading-relaxed mt-4">
              These third parties have their own privacy policies and cookie practices. We encourage you to review their policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">4. How to Control Cookies</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              You have several options to control or limit how cookies are used:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">4.1 Browser Settings</h3>
                <p className="text-base text-text-secondary leading-relaxed mb-2">
                  Most browsers allow you to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-base text-text-secondary ml-4">
                  <li>Block all cookies</li>
                  <li>Block third-party cookies only</li>
                  <li>Delete existing cookies</li>
                  <li>Set cookies to expire when you close your browser</li>
                </ul>
                <p className="text-base text-text-secondary leading-relaxed mt-2">
                  <strong>Note:</strong> Blocking essential cookies may prevent the Platform from functioning properly.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">4.2 Platform Settings</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  You can control certain cookies through your Privacy Settings in the Platform:
                </p>
                <ul className="list-disc list-inside space-y-1 text-base text-text-secondary ml-4 mt-2">
                  <li>Analytics Tracking: Enable/disable analytics cookies</li>
                  <li>Marketing Cookies: Opt-out of marketing and advertising cookies</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">4.3 Do Not Track (DNT)</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Some browsers have a "Do Not Track" feature. We respect DNT signals and will not use cookies for tracking when DNT is enabled, except for essential cookies required for Platform functionality.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">5. Cookie Consent (GDPR & DPDPA)</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              In accordance with GDPR (EU) and DPDPA 2023 (India), we obtain your consent before using non-essential cookies:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li>We show a cookie consent banner when you first visit the Platform</li>
              <li>You can accept, reject, or customize your cookie preferences</li>
              <li>You can change your preferences at any time in Privacy Settings</li>
              <li>Essential cookies do not require consent as they are necessary for the Platform to function</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">6. Local Storage and Similar Technologies</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              In addition to cookies, we may use similar technologies:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li><strong>Local Storage:</strong> Stores data on your device (e.g., user preferences, draft content)</li>
              <li><strong>Session Storage:</strong> Temporary data stored during your session</li>
              <li><strong>Web Beacons/Pixels:</strong> Small images used to track email opens and page views</li>
              <li><strong>Fingerprinting:</strong> We do not use device fingerprinting for tracking</li>
            </ul>
            <p className="text-base text-text-secondary leading-relaxed mt-4">
              These technologies are subject to the same privacy protections as cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">7. Cookie Retention</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              We retain cookies for different periods depending on their purpose:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Stored for a specific period (ranging from 1 day to 2 years)</li>
              <li><strong>Essential Cookies:</strong> Retained as long as necessary for Platform functionality</li>
              <li><strong>Analytics Cookies:</strong> Typically retained for up to 2 years</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">8. Impact of Disabling Cookies</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              If you disable cookies, some features of the Platform may not work properly:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li>You may need to log in every time you visit</li>
              <li>Your preferences and settings may not be saved</li>
              <li>Some features may be unavailable or limited</li>
              <li>Personalization may be reduced</li>
            </ul>
            <p className="text-base text-text-secondary leading-relaxed mt-4">
              We recommend allowing essential cookies for the best experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">9. Updates to This Cookie Policy</h2>
            <p className="text-base text-text-secondary leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of material changes by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4 mt-4">
              <li>Posting a notice on the Platform</li>
              <li>Updating the "Last Updated" date</li>
              <li>Sending an email notification for significant changes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">10. Contact Us</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              If you have questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="bg-dark-bg rounded-card p-4">
              <p className="text-base text-text-primary font-medium">StealthWeb Privacy Team</p>
              <p className="text-sm text-text-secondary mt-2">Email: privacy@stealthweb.com</p>
              <p className="text-sm text-text-secondary">Data Protection Officer: dpo@stealthweb.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
