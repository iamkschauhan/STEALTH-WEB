# STEALTH Web App

A React.js web version of the STEALTH iOS app, maintaining the same design system, theme, and user experience.

## Features

- 🎨 **Same Design System**: Matches the iOS app's dark theme with orange/yellow gradient accents
- 🔐 **Authentication Flow**: Splash, Sign Up, Login, Email Verification, Forgot Password
- 📱 **Main App**: Home, Search, Messages, Notifications, Account views
- 🎯 **Glass Morphism**: Modern glass effect tab bar matching iOS design
- 📦 **TypeScript**: Fully typed for better development experience
- ⚡ **Vite**: Fast development and build tooling

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Navigate to the project directory:
```bash
cd stealth-web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Project Structure

```
stealth-web/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── TabBar.tsx
│   ├── constants/        # Design system constants
│   │   └── AuthStyle.ts
│   ├── context/          # State management
│   │   └── AppState.tsx
│   ├── views/           # Page components
│   │   ├── auth/        # Authentication views
│   │   ├── main/        # Main app views
│   │   └── MainTabView.tsx
│   ├── styles/          # Global styles
│   │   └── index.css
│   ├── App.tsx          # Main app component
│   └── main.tsx         # Entry point
├── package.json
├── tailwind.config.js   # Tailwind configuration
└── vite.config.ts       # Vite configuration
```

## Design System

The app follows the exact design system from the iOS app:

- **Colors**: Dark background (#000000), surface dark (rgba(51, 51, 56, 1)), orange/yellow gradient
- **Typography**: System fonts with specific sizes and weights
- **Spacing**: Consistent padding and margins matching iOS app
- **Components**: Buttons, inputs, and UI elements styled to match iOS design

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation (ready for future use)

## Notes

- This is a web adaptation of the iOS app, maintaining the same visual design and user flow
- The app uses React Context for state management (similar to iOS AppState)
- All views are implemented to match the iOS app structure
- The tab bar uses glass morphism effects to match the iOS design

## Future Enhancements

- Add React Router for proper navigation
- Implement backend integration
- Add form validation
- Enhance animations and transitions
- Add more interactive features
