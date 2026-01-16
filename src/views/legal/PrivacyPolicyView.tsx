import React from 'react';

interface PrivacyPolicyViewProps {
  onClose: () => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({ onClose }) => {
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
          <h1 className="text-lg font-semibold text-text-primary">Privacy Policy</h1>
          <div className="w-6" />
        </div>

        <div className="bg-surface-dark rounded-card p-6 space-y-6">
          <div>
            <p className="text-sm text-text-secondary mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
            <p className="text-base text-text-secondary leading-relaxed">
              This Privacy Policy describes how StealthWeb ("we", "us", "our") collects, uses, stores, and protects your personal information. We are committed to protecting your privacy and complying with applicable data protection laws, including the Information Technology Act, 2000 (India), Digital Personal Data Protection Act, 2023 (India), GDPR (EU), and CCPA (California).
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">1. Information We Collect</h2>
            <h3 className="text-lg font-semibold text-text-primary mb-3 mt-4">1.1 Information You Provide</h3>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              We collect information that you voluntarily provide when you:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li><strong>Create an Account:</strong> Name, email address, phone number, date of birth, profile photo</li>
              <li><strong>Complete Your Profile:</strong> Location, interests, languages, education, occupation, relationship status</li>
              <li><strong>Post Content:</strong> Text, images, videos, and other content you share on the Platform</li>
              <li><strong>Communicate:</strong> Messages, comments, and other communications with other users</li>
              <li><strong>Contact Us:</strong> Information you provide when contacting our support team</li>
            </ul>

            <h3 className="text-lg font-semibold text-text-primary mb-3 mt-6">1.2 Automatically Collected Information</h3>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              We automatically collect certain information when you use the Platform:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li><strong>Device Information:</strong> Device type, operating system, browser type, IP address</li>
              <li><strong>Usage Data:</strong> Pages visited, features used, time spent on the Platform, interactions with content</li>
              <li><strong>Location Data:</strong> General location information (city, country) based on your IP address or profile settings</li>
              <li><strong>Cookies and Tracking:</strong> Information collected through cookies and similar technologies (see Cookie Policy)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">2. How We Use Your Information</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li><strong>Provide and Improve Services:</strong> To operate, maintain, and improve the Platform</li>
              <li><strong>User Communication:</strong> To send you notifications, updates, and respond to your inquiries</li>
              <li><strong>Personalization:</strong> To customize your experience and show you relevant content</li>
              <li><strong>Safety and Security:</strong> To detect, prevent, and address fraud, abuse, and security issues</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
              <li><strong>Analytics:</strong> To analyze usage patterns and improve our services (with your consent)</li>
              <li><strong>Marketing:</strong> To send you promotional communications (only with your explicit consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">3. Legal Basis for Processing (GDPR)</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              For users in the European Union, we process your personal data based on:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li><strong>Consent:</strong> When you provide explicit consent for specific processing activities</li>
              <li><strong>Contract Performance:</strong> To fulfill our contractual obligations to provide the Platform</li>
              <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
              <li><strong>Legitimate Interests:</strong> To ensure Platform security, prevent fraud, and improve services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              We do NOT sell your personal information. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
              <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating the Platform (e.g., cloud hosting, analytics) under strict confidentiality agreements</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
              <li><strong>Safety and Security:</strong> To protect the rights, property, or safety of StealthWeb, our users, or others</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (with notice to users)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">5. Data Storage and Security</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li><strong>Encryption:</strong> Data is encrypted in transit (SSL/TLS) and at rest</li>
              <li><strong>Access Controls:</strong> Limited access to personal data on a need-to-know basis</li>
              <li><strong>Regular Audits:</strong> Security audits and vulnerability assessments</li>
              <li><strong>Data Retention:</strong> We retain your data only as long as necessary for the purposes stated in this policy</li>
            </ul>
            <p className="text-base text-text-secondary leading-relaxed mt-4">
              Your data is stored on secure servers. While we strive to protect your information, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">6. Your Rights (DPDPA 2023 & GDPR)</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li><strong>Right to Access:</strong> Request a copy of all personal data we hold about you</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete personal data</li>
              <li><strong>Right to Erasure:</strong> Request deletion of your personal data (subject to legal requirements)</li>
              <li><strong>Right to Restrict Processing:</strong> Request limitation of how we process your data</li>
              <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
              <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time (where processing is based on consent)</li>
              <li><strong>Right to Grievance Redressal:</strong> File a complaint with our Grievance Officer or data protection authority</li>
            </ul>
            <p className="text-base text-text-secondary leading-relaxed mt-4">
              To exercise these rights, please contact us at privacy@stealthweb.com or use the settings in your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">7. California Privacy Rights (CCPA)</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              If you are a California resident, you have additional rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li><strong>Right to Know:</strong> Request disclosure of what personal information we collect, use, and share</li>
              <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
              <li><strong>Right to Opt-Out:</strong> Opt-out of the sale of personal information (we do not sell personal information)</li>
              <li><strong>Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">8. Children's Privacy</h2>
            <p className="text-base text-text-secondary leading-relaxed">
              The Platform is not intended for users under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected information from a child under 16, we will take steps to delete such information immediately. If you believe we have collected information from a child under 16, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">9. International Data Transfers</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              Your information may be transferred to and processed in countries other than your country of residence. We ensure that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li>Data transfers comply with applicable data protection laws</li>
              <li>Appropriate safeguards are in place (e.g., Standard Contractual Clauses for EU transfers)</li>
              <li>Your data receives the same level of protection as in your home country</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">10. Cookies and Tracking Technologies</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              We use cookies and similar technologies to enhance your experience. For detailed information, please see our Cookie Policy.
            </p>
            <p className="text-base text-text-secondary leading-relaxed">
              You can control cookies through your browser settings. However, disabling cookies may limit certain features of the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">11. Data Protection Officer</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              In accordance with DPDPA 2023 and GDPR, we have appointed a Data Protection Officer (DPO). For data protection inquiries, please contact:
            </p>
            <div className="bg-dark-bg rounded-card p-4 mt-4">
              <p className="text-base text-text-primary font-medium">Data Protection Officer</p>
              <p className="text-sm text-text-secondary mt-2">Email: dpo@stealthweb.com</p>
              <p className="text-sm text-text-secondary">We respond to all inquiries within 30 days as required by law.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">12. Grievance Redressal (India)</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              As required by the Information Technology Act, 2000, we have appointed a Grievance Officer for India:
            </p>
            <div className="bg-dark-bg rounded-card p-4 mt-4">
              <p className="text-base text-text-primary font-medium">Grievance Officer</p>
              <p className="text-sm text-text-secondary mt-2">Name: [Name]</p>
              <p className="text-sm text-text-secondary">Email: grievance@stealthweb.com</p>
              <p className="text-sm text-text-secondary">Address: [Your Address]</p>
              <p className="text-sm text-text-secondary mt-2">We will respond to your grievance within 30 days as required by law.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">13. Changes to This Privacy Policy</h2>
            <p className="text-base text-text-secondary leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of material changes by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4 mt-4">
              <li>Posting a notice on the Platform</li>
              <li>Sending an email to your registered email address</li>
              <li>Updating the "Last Updated" date at the top of this policy</li>
            </ul>
            <p className="text-base text-text-secondary leading-relaxed mt-4">
              Your continued use of the Platform after such changes constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">14. Contact Us</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:
            </p>
            <div className="bg-dark-bg rounded-card p-4">
              <p className="text-base text-text-primary font-medium">StealthWeb Privacy Team</p>
              <p className="text-sm text-text-secondary mt-2">Email: privacy@stealthweb.com</p>
              <p className="text-sm text-text-secondary">Data Protection Officer: dpo@stealthweb.com</p>
              <p className="text-sm text-text-secondary">Website: www.stealthweb.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
