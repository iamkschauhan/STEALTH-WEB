import React from 'react';

interface EmptyStateViewProps {
  icon: string;
  title: string;
  message?: string;
  actionTitle?: string;
  action?: () => void;
}

export const EmptyStateView: React.FC<EmptyStateViewProps> = ({
  icon,
  title,
  message,
  actionTitle,
  action,
}) => {
  const getIcon = () => {
    // Map SF Symbols to SVG icons
    const iconMap: Record<string, React.ReactNode> = {
      'person.2.fill': (
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
      'camera.fill': (
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 15.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm6.5-6.5v-2c0-.83-.67-1.5-1.5-1.5h-3l-1.5-1.5H9L7.5 5.5H4.5c-.83 0-1.5.67-1.5 1.5v2H1v10h20V9h-2.5zm-1 0H4.5v-2h3l1.5 1.5h5l1.5-1.5h3v2z" />
        </svg>
      ),
      'location.fill': (
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      ),
      'square.grid.2x2': (
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
        </svg>
      ),
      'bell.fill': (
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
        </svg>
      ),
      'message.fill': (
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      ),
      'eye.fill': (
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>
      ),
      'magnifyingglass': (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    };

    return iconMap[icon] || (
      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-12 space-y-6">
      {/* Icon */}
      <div className="text-text-faded opacity-30">{getIcon()}</div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-text-secondary">{title}</h2>

      {/* Message */}
      {message && (
        <p className="text-[15px] text-text-faded text-center leading-relaxed max-w-md">
          {message}
        </p>
      )}

      {/* Action Button */}
      {actionTitle && action && (
        <button
          onClick={action}
          className="px-8 py-3.5 bg-orange rounded-full text-base font-semibold text-text-primary mt-2"
        >
          {actionTitle}
        </button>
      )}
    </div>
  );
};
