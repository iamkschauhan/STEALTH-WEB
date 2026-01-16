import React from 'react';

interface CommunityGuidelinesViewProps {
  onClose: () => void;
}

export const CommunityGuidelinesView: React.FC<CommunityGuidelinesViewProps> = ({ onClose }) => {
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
          <h1 className="text-lg font-semibold text-text-primary">Community Guidelines</h1>
          <div className="w-6" />
        </div>

        <div className="bg-surface-dark rounded-card p-6 space-y-6">
          <div>
            <p className="text-sm text-text-secondary mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
            <p className="text-base text-text-secondary leading-relaxed">
              Welcome to StealthWeb! Our Community Guidelines are designed to create a safe, respectful, and positive environment for friendship, cultural exchange, and content sharing. By using our Platform, you agree to follow these guidelines.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Our Platform Purpose</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              StealthWeb is a social networking platform designed for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li>Building genuine friendships and connections across cultures</li>
              <li>Sharing experiences, interests, and educational content</li>
              <li>Language learning and practice</li>
              <li>Cultural exchange and understanding</li>
              <li>Respectful conversations and discussions</li>
            </ul>
            <p className="text-base text-text-secondary leading-relaxed mt-4 font-semibold text-orange">
              This platform is NOT intended for dating, explicit content, nudity, harassment, or any illegal activities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">✓ What's Allowed</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">1. Friendly Conversations</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Engage in respectful, friendly conversations. Share your thoughts, experiences, and learn from others. Be open to different perspectives and cultures.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">2. Content Sharing</h3>
                <p className="text-base text-text-secondary leading-relaxed mb-2">
                  Share appropriate content including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-base text-text-secondary ml-4">
                  <li>Travel photos and experiences</li>
                  <li>Hobbies and interests</li>
                  <li>Educational and informative content</li>
                  <li>Cultural celebrations and traditions</li>
                  <li>Food, music, art, and literature</li>
                  <li>Nature, landscapes, and architecture</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">3. Language Learning</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Practice languages with native speakers, ask questions, and help others learn. Create a supportive learning environment.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">4. Cultural Exchange</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Share your culture, traditions, and customs. Ask respectful questions about other cultures. Celebrate diversity and promote understanding.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">5. Respectful Debates</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Engage in respectful discussions and debates. Disagree politely and focus on ideas, not personal attacks.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">✗ What's NOT Allowed</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">1. Nudity and Explicit Content</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  <strong>STRICTLY PROHIBITED:</strong> Nudity, sexual content, explicit images, pornographic material, or any content of a sexual nature. This platform is for friendship and cultural exchange, not for adult content.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">2. Harassment and Bullying</h3>
                <p className="text-base text-text-secondary leading-relaxed mb-2">
                  Do NOT engage in:
                </p>
                <ul className="list-disc list-inside space-y-1 text-base text-text-secondary ml-4">
                  <li>Harassment, stalking, or unwanted advances</li>
                  <li>Bullying, intimidation, or threats</li>
                  <li>Hate speech, discrimination, or prejudice</li>
                  <li>Personal attacks or insults</li>
                  <li>Doxxing or sharing private information without consent</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">3. Spam and Scams</h3>
                <p className="text-base text-text-secondary leading-relaxed mb-2">
                  Do NOT:
                </p>
                <ul className="list-disc list-inside space-y-1 text-base text-text-secondary ml-4">
                  <li>Send unsolicited messages or spam</li>
                  <li>Promote scams, fraud, or phishing</li>
                  <li>Share misleading or false information</li>
                  <li>Use the Platform for commercial solicitation without permission</li>
                  <li>Create fake accounts or impersonate others</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">4. Illegal Activities</h3>
                <p className="text-base text-text-secondary leading-relaxed mb-2">
                  Do NOT use the Platform for:
                </p>
                <ul className="list-disc list-inside space-y-1 text-base text-text-secondary ml-4">
                  <li>Any illegal activities or content</li>
                  <li>Drug trafficking or substance abuse promotion</li>
                  <li>Violence, terrorism, or extremism</li>
                  <li>Copyright infringement or intellectual property theft</li>
                  <li>Violation of any applicable laws</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">5. Inappropriate Behavior</h3>
                <p className="text-base text-text-secondary leading-relaxed mb-2">
                  Do NOT:
                </p>
                <ul className="list-disc list-inside space-y-1 text-base text-text-secondary ml-4">
                  <li>Use the Platform primarily for dating or romantic purposes</li>
                  <li>Send unsolicited romantic or sexual messages</li>
                  <li>Post graphic or disturbing content</li>
                  <li>Share content that promotes self-harm or suicide</li>
                  <li>Engage in trolling or disruptive behavior</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Content Moderation</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              We use automated systems and human moderators to review content and ensure compliance with these guidelines. Content that violates our guidelines may be:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li>Removed immediately</li>
              <li>Hidden from public view pending review</li>
              <li>Reported to law enforcement if illegal</li>
            </ul>
            <p className="text-base text-text-secondary leading-relaxed mt-4">
              We review reported content within 24 hours. Repeated violations may result in account restrictions or permanent bans.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Reporting Violations</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              If you encounter content or behavior that violates these guidelines, please report it immediately:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li>Use the "Report" button on posts, profiles, or messages</li>
              <li>Contact our support team at support@stealthweb.com</li>
              <li>Report to our Grievance Officer at grievance@stealthweb.com</li>
            </ul>
            <p className="text-base text-text-secondary leading-relaxed mt-4">
              All reports are reviewed confidentially. We take appropriate action against violators, which may include warnings, temporary suspensions, or permanent bans.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Consequences of Violations</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              Violations of these guidelines may result in:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li><strong>Warning:</strong> First-time minor violations may result in a warning</li>
              <li><strong>Temporary Suspension:</strong> Repeated violations may lead to temporary account suspension (7-30 days)</li>
              <li><strong>Permanent Ban:</strong> Severe violations, repeated offenses, or illegal activities may result in permanent account termination</li>
              <li><strong>Legal Action:</strong> Illegal activities may be reported to law enforcement authorities</li>
            </ul>
            <p className="text-base text-text-secondary leading-relaxed mt-4">
              We reserve the right to take immediate action against any violation, especially those involving illegal activities, harassment, or explicit content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Age Restrictions</h2>
            <p className="text-base text-text-secondary leading-relaxed">
              The Platform is intended for users aged 16 and above. Users under 16 are not permitted to use the Platform. We may verify age and remove accounts of users who do not meet the age requirement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Intellectual Property</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              Respect intellectual property rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li>Only post content that you own or have permission to share</li>
              <li>Do not infringe on copyrights, trademarks, or other intellectual property</li>
              <li>Respect the creative work of others</li>
              <li>Report copyright violations if you believe your work has been used without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Privacy and Safety</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              Protect your privacy and safety:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li>Do not share personal information (address, phone number, financial details) publicly</li>
              <li>Be cautious when meeting people in person (if you choose to do so)</li>
              <li>Report suspicious behavior or accounts</li>
              <li>Use privacy settings to control who can see your content</li>
              <li>Block users who make you uncomfortable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Appeal Process</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              If you believe your account was suspended or content was removed in error, you may appeal:
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-text-secondary ml-4">
              <li>Contact support@stealthweb.com with your appeal</li>
              <li>Provide relevant information and context</li>
              <li>We will review your appeal within 7 business days</li>
              <li>Our decision is final, but you may contact our Grievance Officer for further review</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Contact Us</h2>
            <p className="text-base text-text-secondary leading-relaxed mb-4">
              For questions about these guidelines or to report violations:
            </p>
            <div className="bg-dark-bg rounded-card p-4">
              <p className="text-base text-text-primary font-medium">StealthWeb Support</p>
              <p className="text-sm text-text-secondary mt-2">Email: support@stealthweb.com</p>
              <p className="text-sm text-text-secondary">Grievance Officer: grievance@stealthweb.com</p>
              <p className="text-sm text-text-secondary">We respond to all inquiries within 24-48 hours.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Thank You</h2>
            <p className="text-base text-text-secondary leading-relaxed">
              Thank you for being part of the StealthWeb community! By following these guidelines, you help create a positive, safe, and welcoming environment for everyone. Let's build meaningful connections and celebrate our diverse world together.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
