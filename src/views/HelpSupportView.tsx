import React, { useState } from 'react';
import { useAppState } from '../context/AppState';

interface HelpSupportViewProps {
  onClose: () => void;
}

export const HelpSupportView: React.FC<HelpSupportViewProps> = ({ onClose }) => {
  const { currentUser } = useAppState();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [reportCategory, setReportCategory] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "To create an account, click on 'Sign Up' from the login screen. Enter your email address, create a password, and verify your email. Once verified, you can complete your profile setup."
    },
    {
      question: "How do I edit my profile?",
      answer: "Go to Account > Edit Profile. You can update your basic information, interests, and preferences. All changes are automatically saved."
    },
    {
      question: "How do I change my password?",
      answer: "Go to Account > Settings > Account > Change Password. If you've forgotten your password, use the 'Forgot Password' option on the login screen."
    },
    {
      question: "How do I manage my notifications?",
      answer: "Go to Account > Notifications to customize which notifications you receive. You can enable or disable push notifications, email notifications, and specific notification types."
    },
    {
      question: "How do I report inappropriate content?",
      answer: "You can report content by clicking the 'Report' button on any post, profile, or message. Our moderation team reviews all reports within 24 hours."
    },
    {
      question: "How do I block a user?",
      answer: "Go to the user's profile and click the 'Block' option. Blocked users cannot contact you or see your content."
    },
    {
      question: "How do I delete my account?",
      answer: "Go to Account > Privacy & Settings > Data > Delete My Account. This action is permanent and cannot be undone. All your data will be deleted."
    },
    {
      question: "How do I change my privacy settings?",
      answer: "Go to Account > Privacy & Security. You can control who can see your profile, who can contact you, and what information is visible to others."
    },
    {
      question: "What should I do if I can't log in?",
      answer: "Try using the 'Forgot Password' feature to reset your password. If you still can't access your account, contact our support team at support@stealthweb.com"
    },
    {
      question: "How do I change my email address?",
      answer: "Go to Account > Settings > Account > Change Email. You'll need to verify your new email address before the change takes effect."
    },
    {
      question: "What content is allowed on the platform?",
      answer: "StealthWeb is for friendship and cultural exchange. Content should be appropriate, respectful, and legal. Nudity, explicit content, harassment, and illegal activities are strictly prohibited. See our Community Guidelines for details."
    },
    {
      question: "How do I contact support?",
      answer: "You can contact our support team at support@stealthweb.com or use the 'Report a Problem' feature in Settings. We typically respond within 24-48 hours."
    }
  ];

  const handleSubmitReport = () => {
    // In a real app, this would send the report to a backend
    console.log('Report submitted:', { category: reportCategory, description: reportDescription });
    setReportSubmitted(true);
    setTimeout(() => {
      setShowReportForm(false);
      setReportSubmitted(false);
      setReportCategory('');
      setReportDescription('');
    }, 3000);
  };

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
          <h1 className="text-lg font-semibold text-text-primary">Help & Support</h1>
          <div className="w-6" />
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-surface-dark rounded-card p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ActionButton
                icon="envelope"
                title="Contact Support"
                description="Email us directly"
                onClick={() => window.location.href = 'mailto:support@stealthweb.com?subject=Support Request'}
              />
              <ActionButton
                icon="flag"
                title="Report a Problem"
                description="Report bugs or issues"
                onClick={() => setShowReportForm(true)}
              />
              <ActionButton
                icon="shield"
                title="Safety Center"
                description="Learn about safety"
                onClick={() => alert('Safety Center coming soon. Visit Privacy & Settings for safety options.')}
              />
              <ActionButton
                icon="book"
                title="Community Guidelines"
                description="Read our guidelines"
                onClick={() => alert('Community Guidelines coming soon. Check Privacy & Settings > Legal for policies.')}
              />
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="bg-surface-dark rounded-card p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isExpanded={expandedFAQ === index}
                  onToggle={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                />
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-surface-dark rounded-card p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Contact Us</h2>
            <div className="space-y-4">
              <ContactInfo
                icon="envelope"
                title="Email Support"
                value="support@stealthweb.com"
                description="For general inquiries and support"
                onClick={() => window.location.href = 'mailto:support@stealthweb.com'}
              />
              <ContactInfo
                icon="shield"
                title="Privacy & Data Protection"
                value="privacy@stealthweb.com"
                description="For privacy concerns and data requests"
                onClick={() => window.location.href = 'mailto:privacy@stealthweb.com'}
              />
              <ContactInfo
                icon="gavel"
                title="Grievance Officer (India)"
                value="grievance@stealthweb.com"
                description="For complaints and grievances"
                onClick={() => window.location.href = 'mailto:grievance@stealthweb.com'}
              />
              <ContactInfo
                icon="lock"
                title="Data Protection Officer"
                value="dpo@stealthweb.com"
                description="For data protection inquiries"
                onClick={() => window.location.href = 'mailto:dpo@stealthweb.com'}
              />
            </div>
          </div>

          {/* Getting Started Guide */}
          <div className="bg-surface-dark rounded-card p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Getting Started</h2>
            <div className="space-y-4">
              <GuideStep
                number={1}
                title="Create Your Account"
                description="Sign up with your email and verify it to get started"
              />
              <GuideStep
                number={2}
                title="Complete Your Profile"
                description="Add your information, interests, and preferences to help others find you"
              />
              <GuideStep
                number={3}
                title="Explore and Connect"
                description="Browse profiles, search for friends, and start conversations"
              />
              <GuideStep
                number={4}
                title="Share and Engage"
                description="Post content, share your interests, and engage with the community"
              />
            </div>
          </div>

          {/* Common Issues */}
          <div className="bg-surface-dark rounded-card p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Common Issues & Solutions</h2>
            <div className="space-y-4">
              <IssueSolution
                issue="Can't log in"
                solution="Try resetting your password using 'Forgot Password'. Make sure your email is verified."
              />
              <IssueSolution
                issue="Not receiving notifications"
                solution="Check your notification settings in Account > Notifications. Also check your device's notification permissions."
              />
              <IssueSolution
                issue="Profile not updating"
                solution="Changes are auto-saved. Try refreshing the page. If issues persist, clear your browser cache."
              />
              <IssueSolution
                issue="Can't upload images"
                solution="Check that images are in supported formats (JPG, PNG) and under 10MB. Check your internet connection."
              />
              <IssueSolution
                issue="App running slowly"
                solution="Try clearing your browser cache, closing other tabs, or using Data Saver mode in Settings."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Report Problem Modal */}
      {showReportForm && (
        <ReportProblemModal
          category={reportCategory}
          description={reportDescription}
          onCategoryChange={setReportCategory}
          onDescriptionChange={setReportDescription}
          onSubmit={handleSubmitReport}
          onClose={() => {
            setShowReportForm(false);
            setReportCategory('');
            setReportDescription('');
          }}
          submitted={reportSubmitted}
        />
      )}
    </div>
  );
};

// Action Button Component
interface ActionButtonProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, title, description, onClick }) => {
  const getIcon = () => {
    const iconClass = "w-5 h-5";
    switch (icon) {
      case 'envelope':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'flag':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
          </svg>
        );
      case 'shield':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
          </svg>
        );
      case 'book':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-3 p-4 bg-dark-bg rounded-card hover:opacity-90 transition-opacity active:opacity-75 text-left"
    >
      <div className="w-10 h-10 bg-orange/20 rounded-xl flex items-center justify-center text-orange flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1">
        <div className="text-base font-medium text-text-primary">{title}</div>
        <div className="text-sm text-text-secondary mt-1">{description}</div>
      </div>
    </button>
  );
};

// FAQ Item Component
interface FAQItemProps {
  question: string;
  answer: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isExpanded, onToggle }) => {
  return (
    <div className="border border-white/10 rounded-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-dark-bg/50 transition-colors"
      >
        <span className="text-base font-medium text-text-primary text-left pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-text-faded flex-shrink-0 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isExpanded && (
        <div className="px-4 pb-4">
          <p className="text-sm text-text-secondary leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

// Contact Info Component
interface ContactInfoProps {
  icon: string;
  title: string;
  value: string;
  description: string;
  onClick: () => void;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, title, value, description, onClick }) => {
  const getIcon = () => {
    const iconClass = "w-5 h-5";
    switch (icon) {
      case 'envelope':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'shield':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
          </svg>
        );
      case 'gavel':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'lock':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-3 p-4 bg-dark-bg rounded-card hover:opacity-90 transition-opacity active:opacity-75 text-left"
    >
      <div className="w-10 h-10 bg-orange/20 rounded-xl flex items-center justify-center text-orange flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1">
        <div className="text-base font-medium text-text-primary">{title}</div>
        <div className="text-sm text-orange mt-1">{value}</div>
        <div className="text-xs text-text-secondary mt-1">{description}</div>
      </div>
      <svg className="w-4 h-4 text-text-faded flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};

// Guide Step Component
interface GuideStepProps {
  number: number;
  title: string;
  description: string;
}

const GuideStep: React.FC<GuideStepProps> = ({ number, title, description }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 bg-orange rounded-full flex items-center justify-center text-text-primary font-bold flex-shrink-0">
        {number}
      </div>
      <div className="flex-1">
        <div className="text-base font-medium text-text-primary">{title}</div>
        <div className="text-sm text-text-secondary mt-1">{description}</div>
      </div>
    </div>
  );
};

// Issue Solution Component
interface IssueSolutionProps {
  issue: string;
  solution: string;
}

const IssueSolution: React.FC<IssueSolutionProps> = ({ issue, solution }) => {
  return (
    <div className="p-4 bg-dark-bg rounded-card">
      <div className="text-base font-medium text-text-primary mb-2">❌ {issue}</div>
      <div className="text-sm text-text-secondary">✅ {solution}</div>
    </div>
  );
};

// Report Problem Modal Component
interface ReportProblemModalProps {
  category: string;
  description: string;
  onCategoryChange: (category: string) => void;
  onDescriptionChange: (description: string) => void;
  onSubmit: () => void;
  onClose: () => void;
  submitted: boolean;
}

const ReportProblemModal: React.FC<ReportProblemModalProps> = ({
  category,
  description,
  onCategoryChange,
  onDescriptionChange,
  onSubmit,
  onClose,
  submitted,
}) => {
  const categories = [
    'Bug or Technical Issue',
    'Account Problem',
    'Content Issue',
    'Privacy Concern',
    'Feature Request',
    'Other',
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[50]" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-[60] bg-dark-bg rounded-t-[24px] shadow-2xl max-h-[90vh] flex flex-col animate-slide-up">
        <div className="flex justify-center pt-3 pb-5">
          <div className="w-9 h-1 bg-white/30 rounded-full" />
        </div>
        <div className="flex items-center justify-between px-screen-padding pb-5">
          <h2 className="text-xl font-bold text-text-primary">Report a Problem</h2>
          <button onClick={onClose} className="text-text-icon">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.64c.39.39.39 1.02 0 1.41L13.41 12l3.23 3.23c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0L12 13.41l-3.23 3.23c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 7.36 8.77c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L12 10.59l3.23-3.23c.39-.39 1.02-.39 1.41 0z" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-screen-padding pb-5">
          {submitted ? (
            <div className="text-center py-8">
              <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              <p className="text-lg font-medium text-text-primary mb-2">Report Submitted!</p>
              <p className="text-sm text-text-secondary">Thank you for your feedback. We'll review your report and get back to you soon.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-base font-medium text-text-primary mb-2 block">Category</label>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => onCategoryChange(cat)}
                      className={`w-full text-left p-3 rounded-card transition-colors ${
                        category === cat
                          ? 'bg-orange text-text-primary'
                          : 'bg-surface-dark text-text-primary hover:bg-dark-bg'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-base font-medium text-text-primary mb-2 block">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => onDescriptionChange(e.target.value)}
                  placeholder="Please describe the problem in detail..."
                  className="w-full min-h-[120px] bg-surface-dark rounded-card p-4 text-input text-text-primary outline-none resize-none focus:ring-2 focus:ring-orange/30 transition-all placeholder:text-text-faded"
                />
              </div>
              <button
                onClick={onSubmit}
                disabled={!category || !description.trim()}
                className="w-full gradient-primary text-text-primary rounded-pill py-4 text-button font-semibold hover:opacity-90 transition-opacity active:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Report
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
