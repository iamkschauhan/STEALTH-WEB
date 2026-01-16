/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        'dark-bg': '#000000',
        'surface-dark': 'rgba(51, 51, 56, 1)', // rgb(0.2, 0.2, 0.22) = rgba(51, 51, 56, 1)
        
        // Theme colors
        'orange': 'rgb(255, 128, 0)', // rgb(1.0, 0.5, 0.0)
        'yellow': 'rgb(255, 204, 0)', // rgb(1.0, 0.8, 0.0)
        'accent-blue': 'rgb(51, 153, 255)', // rgb(0.2, 0.6, 1.0)
        'accent-blue-light': 'rgb(77, 179, 255)', // rgb(0.3, 0.7, 1.0)
        
        // Text colors with opacity
        'text-primary': '#FFFFFF',
        'text-label': 'rgba(255, 255, 255, 0.9)',
        'text-secondary': 'rgba(255, 255, 255, 0.8)',
        'text-helper': 'rgba(255, 255, 255, 0.7)',
        'text-icon': 'rgba(255, 255, 255, 0.6)',
        'text-faded': 'rgba(255, 255, 255, 0.5)',
      },
      borderRadius: {
        'pill': '35px',
        'card': '16px',
        'image': '22px',
      },
      spacing: {
        'screen-padding': '24px',
        'field-spacing': '20px',
        'button-spacing': '16px',
        'label-input-spacing': '8px',
        'title-subtitle-spacing': '8px',
        'link-spacing': '4px',
      },
      fontSize: {
        'title': ['36px', { fontWeight: '700', lineHeight: '1.2' }],
        'subtitle': ['16px', { fontWeight: '400', lineHeight: '1.5' }],
        'label': ['14px', { fontWeight: '500', lineHeight: '1.4' }],
        'input': ['16px', { fontWeight: '400', lineHeight: '1.5' }],
        'button': ['18px', { fontWeight: '600', lineHeight: '1.4' }],
        'link-helper': ['14px', { fontWeight: '400', lineHeight: '1.4' }],
        'link-action': ['14px', { fontWeight: '600', lineHeight: '1.4' }],
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      maxWidth: {
        'content': '448px', // Mobile max width
        'container': '1280px', // Desktop container max width
      },
    },
  },
  plugins: [],
}
