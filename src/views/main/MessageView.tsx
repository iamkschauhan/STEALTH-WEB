import React, { useState } from 'react';

interface Conversation {
  name: string;
  flag: string;
  message: string;
  time: string;
}

export const MessageView: React.FC = () => {
  const [hasMessages] = useState(true);

  const conversations: Conversation[] = [
    { name: 'Cosima', flag: '🇩🇪', message: 'You: hiii', time: '08:26' },
    { name: 'Sarah', flag: '🇮🇹', message: 'You: hii', time: '08:25' },
    { name: 'Aastha', flag: '🇮🇳', message: 'You: Hi', time: '07:30' },
    { name: 'Lara', flag: '🇮🇳', message: 'You: Hi', time: '07:29' },
    { name: 'Anvi', flag: '🇮🇳', message: 'You: Why so', time: '07:29' },
    { name: 'Alia', flag: '🇮🇳', message: 'You: Hi', time: '07:29' },
    { name: 'Anshika', flag: '🇮🇳', message: 'You: Omg', time: '07:28' },
    { name: 'Trisha', flag: '🇮🇳', message: 'You: Really', time: '07:28' },
    { name: 'Vashu', flag: '🇮🇳', message: 'You: Hiii', time: '07:27' },
    { name: 'Pragati', flag: '🇮🇳', message: 'You: Ha ji', time: '07:26' },
    { name: 'Mahi', flag: '🇮🇳', message: 'You: Hi', time: '07:25' },
    { name: 'Priya', flag: '🇮🇳', message: 'You: Hello', time: '07:24' },
    { name: 'Riya', flag: '🇮🇳', message: 'You: Hey', time: '07:23' },
    { name: 'Sneha', flag: '🇮🇳', message: 'You: Hi there', time: '07:22' },
    { name: 'Kavya', flag: '🇮🇳', message: 'You: Hi', time: '07:21' },
  ];

  return (
    <div className="min-h-screen bg-dark-bg pt-[60px] pb-24 lg:pb-10">
      <div className="max-w-content md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto px-screen-padding md:px-6 lg:px-8">
        {/* Header */}
        <h1 className="text-[28px] font-bold text-text-primary mb-6">
          Messages
        </h1>

        {/* Messages list */}
        {hasMessages ? (
          <div className="space-y-0">
            {conversations.map((conversation, index) => (
              <div key={index}>
                <button
                  onClick={() => {
                    // Handle conversation tap
                    console.log('Open conversation with', conversation.name);
                  }}
                  className="w-full flex items-center gap-4 py-3 hover:bg-white/5 transition-colors rounded-lg"
                >
                  {/* Profile image with flag */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-[60px] h-[60px] rounded-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(to bottom right, rgb(255, ${128 + index * 5}, 0), rgb(255, ${204 + index * 5}, 0))`,
                      }}
                    >
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    {/* Flag overlay */}
                    <div className="absolute -bottom-0.5 -left-0.5 w-5 h-5 bg-surface-dark rounded-full flex items-center justify-center border-2 border-dark-bg">
                      <span className="text-xs">{conversation.flag}</span>
                    </div>
                  </div>

                  {/* Message content */}
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-semibold text-text-primary">
                        {conversation.name}
                      </h3>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-text-faded">{conversation.time}</span>
                        <svg className="w-3 h-3 text-text-faded" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary truncate">{conversation.message}</p>
                  </div>
                </button>
                {index < conversations.length - 1 && (
                  <div className="h-px bg-white/10 ml-[100px]" />
                )}
              </div>
            ))}
          </div>
        ) : (
          // Empty state
          <div className="py-24">
            <div className="text-center">
              <svg className="w-16 h-16 text-text-faded opacity-30 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
              <h2 className="text-xl font-semibold text-text-secondary mb-2">No messages yet</h2>
              <p className="text-text-faded text-sm mb-6">
                Start a conversation with someone to see your messages here
              </p>
              <button className="gradient-primary text-text-primary rounded-pill px-6 py-3 font-semibold">
                Start Chat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
