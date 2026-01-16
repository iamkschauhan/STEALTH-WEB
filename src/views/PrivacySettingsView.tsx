import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAppState } from '../context/AppState';
import { updateUserProfile, createUserProfile } from '../services/firestoreService';
import { TermsOfServiceView } from './legal/TermsOfServiceView';
import { PrivacyPolicyView } from './legal/PrivacyPolicyView';
import { CommunityGuidelinesView } from './legal/CommunityGuidelinesView';
import { CookiePolicyView } from './legal/CookiePolicyView';

interface PrivacySettingsViewProps {
  onClose: () => void;
}

export const PrivacySettingsView: React.FC<PrivacySettingsViewProps> = ({ onClose }) => {
  const { currentUser, userProfile, refreshUserProfile } = useAppState();
  
  // Privacy Settings State - Initialize from userProfile
  const [profileVisibility, setProfileVisibility] = useState<'public' | 'friends' | 'private'>(
    userProfile?.profileVisibility || 'public'
  );
  const [whoCanContact, setWhoCanContact] = useState<'everyone' | 'friends' | 'none'>(
    userProfile?.whoCanContact || 'everyone'
  );
  const [showEmail, setShowEmail] = useState(userProfile?.showEmail ?? false);
  const [showPhone, setShowPhone] = useState(userProfile?.showPhone ?? false);
  const [allowSearchEngines, setAllowSearchEngines] = useState(userProfile?.allowSearchEngines ?? false);
  
  // Content Moderation Settings
  const [contentFilter, setContentFilter] = useState<'strict' | 'moderate' | 'off'>(
    userProfile?.contentFilter || 'strict'
  );
  const [blockInappropriate, setBlockInappropriate] = useState(userProfile?.blockInappropriate ?? true);
  const [reportContent, setReportContent] = useState(userProfile?.reportContent ?? true);
  
  // Data Settings
  const [dataSharing, setDataSharing] = useState(userProfile?.dataSharing ?? true);
  const [analyticsTracking, setAnalyticsTracking] = useState(userProfile?.analyticsTracking ?? true);
  const [marketingEmails, setMarketingEmails] = useState(userProfile?.marketingEmails ?? false);

  // Auto-save state
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef<string>('');
  const isInitialLoad = useRef(true);

  const [activeSection, setActiveSection] = useState<'privacy' | 'content' | 'legal' | 'data'>('privacy');
  const [showLegalDocument, setShowLegalDocument] = useState<'terms' | 'privacy' | 'guidelines' | 'cookies' | null>(null);

  // Update fields when userProfile loads
  useEffect(() => {
    if (userProfile) {
      if (userProfile.profileVisibility) setProfileVisibility(userProfile.profileVisibility);
      if (userProfile.whoCanContact) setWhoCanContact(userProfile.whoCanContact);
      if (userProfile.showEmail !== undefined) setShowEmail(userProfile.showEmail);
      if (userProfile.showPhone !== undefined) setShowPhone(userProfile.showPhone);
      if (userProfile.allowSearchEngines !== undefined) setAllowSearchEngines(userProfile.allowSearchEngines);
      if (userProfile.contentFilter) setContentFilter(userProfile.contentFilter);
      if (userProfile.blockInappropriate !== undefined) setBlockInappropriate(userProfile.blockInappropriate);
      if (userProfile.reportContent !== undefined) setReportContent(userProfile.reportContent);
      if (userProfile.dataSharing !== undefined) setDataSharing(userProfile.dataSharing);
      if (userProfile.analyticsTracking !== undefined) setAnalyticsTracking(userProfile.analyticsTracking);
      if (userProfile.marketingEmails !== undefined) setMarketingEmails(userProfile.marketingEmails);
    }
  }, [userProfile]);

  // Auto-save function with debouncing
  const autoSave = useCallback(async () => {
    if (!currentUser) return;

    // Create a snapshot of current data for comparison
    const currentData = JSON.stringify({
      profileVisibility,
      whoCanContact,
      showEmail,
      showPhone,
      allowSearchEngines,
      contentFilter,
      blockInappropriate,
      reportContent,
      dataSharing,
      analyticsTracking,
      marketingEmails,
    });

    // Don't save if nothing changed
    if (currentData === lastSavedRef.current) return;

    setSaveStatus('saving');

    try {
      const settingsData = {
        profileVisibility,
        whoCanContact,
        showEmail,
        showPhone,
        allowSearchEngines,
        contentFilter,
        blockInappropriate,
        reportContent,
        dataSharing,
        analyticsTracking,
        marketingEmails,
      };

      if (userProfile) {
        await updateUserProfile(currentUser.uid, settingsData);
      } else {
        // If no profile exists, create one with just settings
        await createUserProfile(currentUser.uid, {
          email: currentUser.email || '',
          ...settingsData,
        });
      }

      lastSavedRef.current = currentData;
      setSaveStatus('saved');
      await refreshUserProfile();

      // Reset saved status after 2 seconds
      setTimeout(() => {
        setSaveStatus((prev) => prev === 'saved' ? 'idle' : prev);
      }, 2000);
    } catch (error: any) {
      console.error('Error auto-saving privacy settings:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  }, [
    currentUser,
    userProfile,
    profileVisibility,
    whoCanContact,
    showEmail,
    showPhone,
    allowSearchEngines,
    contentFilter,
    blockInappropriate,
    reportContent,
    dataSharing,
    analyticsTracking,
    marketingEmails,
    refreshUserProfile,
  ]);

  // Debounced auto-save effect
  useEffect(() => {
    // Skip auto-save on initial load
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      // Set initial saved state
      lastSavedRef.current = JSON.stringify({
        profileVisibility,
        whoCanContact,
        showEmail,
        showPhone,
        allowSearchEngines,
        contentFilter,
        blockInappropriate,
        reportContent,
        dataSharing,
        analyticsTracking,
        marketingEmails,
      });
      return;
    }

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Don't auto-save if no user
    if (!currentUser) return;

    // Set new timeout for auto-save (1.5 seconds after last change)
    saveTimeoutRef.current = setTimeout(() => {
      autoSave();
    }, 1500);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [
    profileVisibility,
    whoCanContact,
    showEmail,
    showPhone,
    allowSearchEngines,
    contentFilter,
    blockInappropriate,
    reportContent,
    dataSharing,
    analyticsTracking,
    marketingEmails,
    autoSave,
    currentUser,
  ]);

  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case 'saving':
        return (
          <div className="w-4 h-4 border-2 border-orange border-t-transparent rounded-full animate-spin" />
        );
      case 'saved':
        return (
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return 'Saved';
      case 'error':
        return 'Error saving';
      default:
        return '';
    }
  };

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
        {/* Navigation Bar with Save Status */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={onClose} className="text-orange hover:opacity-80 transition-opacity active:opacity-70">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-text-primary">Privacy & Settings</h1>
          <div className="flex items-center gap-2">
            {getSaveStatusIcon()}
            {saveStatus !== 'idle' && (
              <span className={`text-xs ${
                saveStatus === 'saved' ? 'text-green-500' :
                saveStatus === 'error' ? 'text-red-500' :
                'text-orange'
              }`}>
                {getSaveStatusText()}
              </span>
            )}
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <SectionTab
            title="Privacy"
            isActive={activeSection === 'privacy'}
            onClick={() => setActiveSection('privacy')}
          />
          <SectionTab
            title="Content"
            isActive={activeSection === 'content'}
            onClick={() => setActiveSection('content')}
          />
          <SectionTab
            title="Legal"
            isActive={activeSection === 'legal'}
            onClick={() => setActiveSection('legal')}
          />
          <SectionTab
            title="Data"
            isActive={activeSection === 'data'}
            onClick={() => setActiveSection('data')}
          />
        </div>

        <div className="space-y-6">
          {/* Privacy Settings Section */}
          {activeSection === 'privacy' && (
            <div className="space-y-6">
              <SettingsCard title="Profile Visibility" icon="eye">
                <div className="space-y-4">
                  <RadioOption
                    label="Public"
                    description="Anyone can view your profile"
                    isSelected={profileVisibility === 'public'}
                    onClick={() => setProfileVisibility('public')}
                  />
                  <RadioOption
                    label="Friends Only"
                    description="Only your friends can view your profile"
                    isSelected={profileVisibility === 'friends'}
                    onClick={() => setProfileVisibility('friends')}
                  />
                  <RadioOption
                    label="Private"
                    description="Only you can view your profile"
                    isSelected={profileVisibility === 'private'}
                    onClick={() => setProfileVisibility('private')}
                  />
                </div>
              </SettingsCard>

              <SettingsCard title="Who Can Contact You" icon="message">
                <div className="space-y-4">
                  <RadioOption
                    label="Everyone"
                    description="Anyone can send you messages"
                    isSelected={whoCanContact === 'everyone'}
                    onClick={() => setWhoCanContact('everyone')}
                  />
                  <RadioOption
                    label="Friends Only"
                    description="Only your friends can message you"
                    isSelected={whoCanContact === 'friends'}
                    onClick={() => setWhoCanContact('friends')}
                  />
                  <RadioOption
                    label="No One"
                    description="Disable all messages"
                    isSelected={whoCanContact === 'none'}
                    onClick={() => setWhoCanContact('none')}
                  />
                </div>
              </SettingsCard>

              <SettingsCard title="Contact Information" icon="phone">
                <div className="space-y-4">
                  <ToggleOption
                    label="Show Email Address"
                    description="Allow others to see your email"
                    isEnabled={showEmail}
                    onChange={setShowEmail}
                  />
                  <ToggleOption
                    label="Show Phone Number"
                    description="Allow others to see your phone number"
                    isEnabled={showPhone}
                    onChange={setShowPhone}
                  />
                </div>
              </SettingsCard>

              <SettingsCard title="Search & Discovery" icon="magnifyingglass">
                <div className="space-y-4">
                  <ToggleOption
                    label="Allow Search Engines"
                    description="Let search engines index your public profile"
                    isEnabled={allowSearchEngines}
                    onChange={setAllowSearchEngines}
                  />
                </div>
              </SettingsCard>
            </div>
          )}

          {/* Content Moderation Section */}
          {activeSection === 'content' && (
            <div className="space-y-6">
              <SettingsCard title="Content Filter" icon="shield">
                <div className="space-y-4">
                  <RadioOption
                    label="Strict"
                    description="Block all inappropriate content automatically"
                    isSelected={contentFilter === 'strict'}
                    onClick={() => setContentFilter('strict')}
                  />
                  <RadioOption
                    label="Moderate"
                    description="Warn about potentially inappropriate content"
                    isSelected={contentFilter === 'moderate'}
                    onClick={() => setContentFilter('moderate')}
                  />
                  <RadioOption
                    label="Off"
                    description="No automatic filtering (not recommended)"
                    isSelected={contentFilter === 'off'}
                    onClick={() => setContentFilter('off')}
                  />
                </div>
              </SettingsCard>

              <SettingsCard title="Content Policy" icon="document">
                <div className="space-y-4">
                  <InfoBox
                    type="warning"
                    title="Community Guidelines"
                    content="This platform is designed for friendship and content sharing. Nudity, explicit content, harassment, and illegal activities are strictly prohibited. Violations may result in account suspension or termination."
                  />
                  <InfoBox
                    type="info"
                    title="What's Allowed"
                    content="✓ Friendly conversations and cultural exchange\n✓ Sharing photos of travel, hobbies, and interests\n✓ Language learning and practice\n✓ Educational and informative content\n✓ Respectful discussions and debates"
                  />
                  <InfoBox
                    type="error"
                    title="What's Not Allowed"
                    content="✗ Nudity, sexual content, or explicit material\n✗ Harassment, bullying, or hate speech\n✗ Spam, scams, or fraudulent activities\n✗ Illegal content or activities\n✗ Impersonation or fake accounts"
                  />
                </div>
              </SettingsCard>

              <SettingsCard title="Reporting" icon="flag">
                <div className="space-y-4">
                  <ToggleOption
                    label="Enable Content Reporting"
                    description="Allow users to report inappropriate content"
                    isEnabled={reportContent}
                    onChange={setReportContent}
                  />
                  <InfoBox
                    type="info"
                    title="How Reporting Works"
                    content="When content is reported, our moderation team reviews it within 24 hours. Repeated violations may result in account restrictions or bans."
                  />
                </div>
              </SettingsCard>
            </div>
          )}

          {/* Legal Compliance Section */}
          {activeSection === 'legal' && (
            <div className="space-y-6">
              <SettingsCard title="Indian Law Compliance" icon="gavel">
                <div className="space-y-4">
                  <InfoBox
                    type="info"
                    title="Information Technology Act, 2000"
                    content="We comply with the IT Act 2000 and its amendments. We implement reasonable security practices and procedures to protect your data. We may be required to disclose information to law enforcement agencies as per legal requirements."
                  />
                  <InfoBox
                    type="info"
                    title="Right to Privacy (Puttaswamy Judgment)"
                    content="We respect your fundamental right to privacy. Your personal data is collected only with your consent and used solely for the purposes stated in our Privacy Policy. You have the right to access, correct, or delete your personal data."
                  />
                  <InfoBox
                    type="info"
                    title="Digital Personal Data Protection Act, 2023"
                    content="We comply with the DPDPA 2023. We process your personal data lawfully and transparently. You have rights to access, correction, erasure, and grievance redressal. We have implemented data protection measures and appointed a Data Protection Officer."
                  />
                  <InfoBox
                    type="warning"
                    title="Content Liability"
                    content="Users are responsible for the content they post. We may remove content that violates our terms or applicable laws. We cooperate with law enforcement agencies when required by law."
                  />
                </div>
              </SettingsCard>

              <SettingsCard title="Global Law Compliance" icon="globe">
                <div className="space-y-4">
                  <InfoBox
                    type="info"
                    title="GDPR (General Data Protection Regulation)"
                    content="For users in the European Union, we comply with GDPR. You have the right to access, rectify, erase, restrict processing, data portability, and object to processing of your personal data. Contact our Data Protection Officer for GDPR-related requests."
                  />
                  <InfoBox
                    type="info"
                    title="CCPA (California Consumer Privacy Act)"
                    content="For California residents, we comply with CCPA. You have the right to know what personal information we collect, delete your personal information, opt-out of the sale of personal information, and non-discrimination for exercising your rights."
                  />
                  <InfoBox
                    type="info"
                    title="Other Jurisdictions"
                    content="We strive to comply with data protection laws in all jurisdictions where we operate. If you have questions about your rights in your jurisdiction, please contact our support team."
                  />
                </div>
              </SettingsCard>

              <SettingsCard title="Terms & Policies" icon="document.text">
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
              </SettingsCard>

              <SettingsCard title="Grievance Redressal" icon="exclamationmark.triangle">
                <div className="space-y-4">
                  <InfoBox
                    type="info"
                    title="Contact Information"
                    content="For any privacy concerns, data protection requests, or legal inquiries:\n\nEmail: privacy@stealthweb.com\nData Protection Officer: dpo@stealthweb.com\nGrievance Officer: grievance@stealthweb.com\n\nWe respond to all inquiries within 30 days as per legal requirements."
                  />
                  <InfoBox
                    type="info"
                    title="Indian Grievance Officer"
                    content="As required by the IT Act 2000, we have appointed a Grievance Officer for India:\n\nName: [Name]\nEmail: grievance-india@stealthweb.com\nAddress: [Address]\n\nYou can file complaints about content or privacy violations with our Grievance Officer."
                  />
                </div>
              </SettingsCard>
            </div>
          )}

          {/* Data Protection Section */}
          {activeSection === 'data' && (
            <div className="space-y-6">
              <SettingsCard title="Data Sharing" icon="square.and.arrow.up">
                <div className="space-y-4">
                  <ToggleOption
                    label="Allow Data Sharing"
                    description="Share anonymized data with partners for service improvement"
                    isEnabled={dataSharing}
                    onChange={setDataSharing}
                  />
                  <InfoBox
                    type="info"
                    title="What Data is Shared"
                    content="We only share anonymized, aggregated data that cannot identify you personally. We never sell your personal information to third parties."
                  />
                </div>
              </SettingsCard>

              <SettingsCard title="Analytics & Tracking" icon="chart.bar">
                <div className="space-y-4">
                  <ToggleOption
                    label="Analytics Tracking"
                    description="Help us improve the app by sharing usage analytics"
                    isEnabled={analyticsTracking}
                    onChange={setAnalyticsTracking}
                  />
                  <InfoBox
                    type="info"
                    title="What We Track"
                    content="We track app usage, feature interactions, and performance metrics. This data is anonymized and used only to improve user experience."
                  />
                </div>
              </SettingsCard>

              <SettingsCard title="Marketing Communications" icon="envelope">
                <div className="space-y-4">
                  <ToggleOption
                    label="Marketing Emails"
                    description="Receive emails about new features and updates"
                    isEnabled={marketingEmails}
                    onChange={setMarketingEmails}
                  />
                  <InfoBox
                    type="info"
                    title="Email Preferences"
                    content="You can opt-out of marketing emails at any time. We will still send you important account-related notifications."
                  />
                </div>
              </SettingsCard>

              <SettingsCard title="Your Data Rights" icon="lock.shield">
                <div className="space-y-4">
                  <InfoBox
                    type="info"
                    title="Access Your Data"
                    content="You can request a copy of all personal data we have about you. This includes your profile information, posts, messages, and activity logs."
                  />
                  <ActionButton
                    title="Download My Data"
                    description="Get a copy of all your data"
                    onClick={() => alert('Data export feature coming soon. Contact support for immediate data access.')}
                  />
                  <ActionButton
                    title="Delete My Account"
                    description="Permanently delete your account and all data"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                        alert('Account deletion feature coming soon. Contact support for immediate account deletion.');
                      }
                    }}
                    variant="danger"
                  />
                </div>
              </SettingsCard>

              <SettingsCard title="Data Security" icon="lock">
                <div className="space-y-4">
                  <InfoBox
                    type="info"
                    title="Security Measures"
                    content="We use industry-standard encryption, secure authentication, and regular security audits to protect your data. Your passwords are hashed and never stored in plain text."
                  />
                  <ActionButton
                    title="Change Password"
                    description="Update your account password"
                    onClick={() => alert('Password change feature coming soon. Use Forgot Password for now.')}
                  />
                  <ActionButton
                    title="Two-Factor Authentication"
                    description="Add an extra layer of security"
                    onClick={() => alert('Two-factor authentication coming soon.')}
                  />
                </div>
              </SettingsCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Section Tab Component
interface SectionTabProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const SectionTab: React.FC<SectionTabProps> = ({ title, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-pill text-sm font-medium transition-colors whitespace-nowrap ${
        isActive
          ? 'bg-orange text-text-primary'
          : 'bg-surface-dark text-text-secondary hover:bg-surface-dark/80'
      }`}
    >
      {title}
    </button>
  );
};

// Settings Card Component
interface SettingsCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ title, icon, children }) => {
  const getIcon = () => {
    const iconClass = "w-5 h-5";
    switch (icon) {
      case 'eye':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        );
      case 'message':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'phone':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        );
      case 'magnifyingglass':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      case 'shield':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
          </svg>
        );
      case 'document':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'flag':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
          </svg>
        );
      case 'gavel':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'globe':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'document.text':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'exclamationmark.triangle':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'square.and.arrow.up':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        );
      case 'chart.bar':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'envelope':
        return (
          <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'lock.shield':
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
    <div className="bg-surface-dark rounded-card p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-dark-bg rounded-xl flex items-center justify-center text-orange">
          {getIcon()}
        </div>
        <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
      </div>
      {children}
    </div>
  );
};

// Radio Option Component
interface RadioOptionProps {
  label: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

const RadioOption: React.FC<RadioOptionProps> = ({ label, description, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-3 p-3 rounded-card hover:bg-dark-bg/50 transition-colors text-left"
    >
      <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
        isSelected ? 'border-orange' : 'border-text-faded'
      }`}>
        {isSelected && <div className="w-3 h-3 rounded-full bg-orange" />}
      </div>
      <div className="flex-1">
        <div className="text-base font-medium text-text-primary">{label}</div>
        <div className="text-sm text-text-secondary mt-1">{description}</div>
      </div>
    </button>
  );
};

// Toggle Option Component
interface ToggleOptionProps {
  label: string;
  description: string;
  isEnabled: boolean;
  onChange: (enabled: boolean) => void;
}

const ToggleOption: React.FC<ToggleOptionProps> = ({ label, description, isEnabled, onChange }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-card hover:bg-dark-bg/50 transition-colors">
      <div className="flex-1">
        <div className="text-base font-medium text-text-primary">{label}</div>
        <div className="text-sm text-text-secondary mt-1">{description}</div>
      </div>
      <button
        onClick={() => onChange(!isEnabled)}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
          isEnabled ? 'bg-orange' : 'bg-text-faded'
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
            isEnabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

// Info Box Component
interface InfoBoxProps {
  type: 'info' | 'warning' | 'error';
  title: string;
  content: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ type, title, content }) => {
  const colors = {
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
    error: 'bg-red-500/10 border-red-500/30 text-red-400',
  };

  return (
    <div className={`p-4 rounded-card border ${colors[type]}`}>
      <div className="font-semibold mb-2">{title}</div>
      <div className="text-sm whitespace-pre-line leading-relaxed">{content}</div>
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

// Action Button Component
interface ActionButtonProps {
  title: string;
  description: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

const ActionButton: React.FC<ActionButtonProps> = ({ title, description, onClick, variant = 'default' }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-card hover:opacity-90 transition-opacity active:opacity-75 ${
        variant === 'danger'
          ? 'bg-red-500/10 border border-red-500/30'
          : 'bg-dark-bg'
      }`}
    >
      <div className="text-left">
        <div className={`text-base font-medium ${variant === 'danger' ? 'text-red-400' : 'text-text-primary'}`}>
          {title}
        </div>
        <div className="text-sm text-text-secondary mt-1">{description}</div>
      </div>
      <svg className={`w-4 h-4 flex-shrink-0 ${variant === 'danger' ? 'text-red-400' : 'text-text-faded'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
};
