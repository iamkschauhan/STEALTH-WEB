# STEALTH Web App - Complete Project Structure

## 📁 Project Organization

### Application Flow Sequence

```
1. App Launch
   └─> App.tsx (Main Entry Point)
       └─> AppStateProvider (Global State Management)
           └─> AppContent (Routes based on state)
```

### Authentication Flow (Sequential)

```
1. SplashView
   └─> Auto-transitions to SignUpView after delay

2. SignUpView
   ├─> Navigate to LoginView
   └─> Submit → EmailVerificationView

3. LoginView
   ├─> Navigate to SignUpView
   ├─> Navigate to ForgotPasswordView
   └─> Submit → MainTabView (via login())

4. EmailVerificationView
   ├─> Back to SignUpView
   └─> Verify → AccountView (via verifyEmail())

5. ForgotPasswordView
   └─> Back to LoginView

6. AccountView (Account Setup)
   ├─> Edit Profile → EditProfileView
   └─> Complete Setup → MainTabView (via completeAccountSetup())
```

### Main App Flow

```
MainTabView (Tab Navigation)
├─> Tab 0: HomeView
│   ├─> Profile Header Section
│   ├─> Recent Guests Section
│   ├─> What's New Input (opens NewPostView)
│   ├─> Global Friends Toggle
│   ├─> Content Filter Bar
│   └─> Feed Posts
│
├─> Tab 1: SearchView
│   ├─> Filter Buttons
│   ├─> Search Bar with Filter Icon
│   └─> User Profile Cards
│
├─> Tab 2: MessageView
│   └─> Conversation List
│
├─> Tab 3: NotificationView
│   ├─> "All" Tab
│   └─> "Views" Tab (4-column grid)
│
└─> Tab 4: AccountView
    ├─> Profile Section
    ├─> Menu Items
    │   └─> Edit Profile → EditProfileView
    └─> Logout Button
```

### Profile & Settings Flow

```
EditProfileView
├─> Basic Info → BasicInfoView
│   ├─> Form Fields (Name, Username, Cities, etc.)
│   ├─> Sex Selection
│   ├─> Birthday Pickers (Day, Month, Year)
│   ├─> Education & Relationship Pickers
│   └─> Language Selection (Spoken & Learning)
│
├─> Interests → InterestsView
│   ├─> About Textarea
│   ├─> Requests Input
│   ├─> Interests Tags
│   └─> Music, Books, Movies, Quotes
│
└─> I Want to Meet → IWantToMeetView
    ├─> Sex Selection
    ├─> Age Range Slider
    ├─> Country & Language Pickers
    ├─> Goals Multi-Selection
    └─> Contact Preference
```

## 📂 File Structure

```
stealth-web/
├── src/
│   ├── App.tsx                          # Main app router & state management
│   ├── main.tsx                         # React entry point
│   │
│   ├── context/
│   │   └── AppState.tsx                 # Global state (auth, navigation)
│   │
│   ├── components/                      # Reusable UI Components
│   │   ├── Button.tsx                   # Primary, Secondary, Outline, Icon variants
│   │   ├── Input.tsx                    # Text input with label & password toggle
│   │   ├── TabBar.tsx                   # Bottom tab navigation
│   │   ├── PickerSheetView.tsx          # Bottom sheet picker modal
│   │   ├── EmptyStateView.tsx           # Empty state with icon & message
│   │   └── FilterDropdownField.tsx      # Dropdown field for filters
│   │
│   ├── views/
│   │   ├── MainTabView.tsx              # Main tab container
│   │   │
│   │   ├── auth/                        # Authentication Views
│   │   │   ├── SplashView.tsx           # Initial splash screen
│   │   │   ├── SignUpView.tsx           # Registration form
│   │   │   ├── LoginView.tsx            # Login form
│   │   │   ├── EmailVerificationView.tsx # 6-digit code verification
│   │   │   └── ForgotPasswordView.tsx   # Password reset
│   │   │
│   │   ├── main/                        # Main App Views
│   │   │   ├── HomeView.tsx             # Home feed with posts
│   │   │   ├── SearchView.tsx           # User search with filters
│   │   │   ├── MessageView.tsx          # Conversations list
│   │   │   ├── NotificationView.tsx    # Notifications (All/Views tabs)
│   │   │   └── AccountView.tsx          # Account settings & profile
│   │   │
│   │   ├── NewPostView.tsx              # Create new post modal
│   │   ├── FiltersView.tsx              # Filter modal
│   │   ├── EditProfileView.tsx         # Profile edit menu
│   │   ├── BasicInfoView.tsx           # Basic info form
│   │   ├── InterestsView.tsx           # Interests form
│   │   ├── IWantToMeetView.tsx         # Preferences form
│   │   │
│   │   └── Selection Views              # Location/Language Pickers
│   │       ├── CountrySelectionView.tsx
│   │       ├── ContinentSelectionView.tsx
│   │       ├── CitySelectionView.tsx
│   │       └── MultiLanguageSelectionView.tsx
│   │
│   ├── styles/
│   │   └── index.css                    # Global styles & Tailwind config
│   │
│   └── constants/
│       └── AuthStyle.ts                 # Auth styling constants
│
├── package.json
├── tailwind.config.js                   # Tailwind CSS configuration
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Design System

### Colors (from UI_GUIDELINES.md)
- **Dark Background**: `#000000`
- **Surface Dark**: `rgba(51, 51, 56, 1)`
- **Orange Gradient**: `rgb(255, 128, 0)` → `rgb(255, 204, 0)`
- **Blue Gradient**: `rgb(51, 153, 255)` → `rgb(77, 179, 255)`
- **Text Colors**: Primary, Label, Secondary, Helper, Icon, Faded

### Typography
- **Title**: 36px, Bold (700)
- **Subtitle**: 16px, Regular (400)
- **Label**: 14px, Medium (500)
- **Input**: 16px, Regular (400)
- **Button**: 18px, Semibold (600)

### Spacing
- **Screen Padding**: 24px
- **Field Spacing**: 20px
- **Button Spacing**: 16px
- **Label-Input Spacing**: 8px

### Border Radius
- **Pill**: 35px
- **Card**: 16px
- **Image**: 22px

## 🔄 State Management

### AppState Context
```typescript
- isAuthenticated: boolean
- hasVerifiedEmail: boolean
- currentAuthView: AuthView (SPLASH | SIGNUP | LOGIN | EMAIL_VERIFICATION | FORGOT_PASSWORD)
- showMainTabView: boolean
- showAccountView: boolean

Methods:
- login()
- signUp()
- showEmailVerification()
- verifyEmail()
- completeAccountSetup()
- logout()
- setCurrentAuthView()
```

## 🧩 Component Dependencies

### Reusable Components Used Across Views
1. **Button** - Used in: All auth views, AccountView, FiltersView
2. **Input** - Used in: SignUpView, LoginView, ForgotPasswordView
3. **PickerSheetView** - Used in: BasicInfoView, IWantToMeetView, FiltersView, NewPostView
4. **EmptyStateView** - Used in: HomeView, SearchView, MessageView, NotificationView
5. **FilterDropdownField** - Used in: FiltersView
6. **TabBar** - Used in: MainTabView

### Selection Views Used Across Forms
1. **CountrySelectionView** - Used in: FiltersView, IWantToMeetView
2. **ContinentSelectionView** - Used in: FiltersView
3. **CitySelectionView** - Used in: BasicInfoView, FiltersView
4. **MultiLanguageSelectionView** - Used in: BasicInfoView, IWantToMeetView

## ✅ Implementation Checklist

### Authentication Flow ✅
- [x] SplashView
- [x] SignUpView (with validation)
- [x] LoginView (with validation)
- [x] EmailVerificationView (6-digit code)
- [x] ForgotPasswordView

### Main App Views ✅
- [x] HomeView (with feed, profile header, recent guests)
- [x] SearchView (with filters)
- [x] MessageView (conversations list)
- [x] NotificationView (All/Views tabs)
- [x] AccountView (profile & settings)

### Profile & Settings ✅
- [x] EditProfileView
- [x] BasicInfoView
- [x] InterestsView
- [x] IWantToMeetView

### Selection Views ✅
- [x] CountrySelectionView
- [x] ContinentSelectionView
- [x] CitySelectionView
- [x] MultiLanguageSelectionView

### Modals & Sheets ✅
- [x] NewPostView
- [x] FiltersView
- [x] PickerSheetView

### Reusable Components ✅
- [x] Button
- [x] Input
- [x] TabBar
- [x] EmptyStateView
- [x] FilterDropdownField

### State Management ✅
- [x] AppState Context
- [x] Navigation flow
- [x] Authentication state

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Notes

- All views match iOS design system from UI_GUIDELINES.md
- SVG icons replace SF Symbols for web compatibility
- Tailwind CSS used for styling with custom configuration
- TypeScript for type safety
- React Context API for global state management
- All forms include client-side validation
- Bottom sheet modals for pickers (iOS sheet presentation style)
- Glass morphism effects on tab bar
- Gradient backgrounds for profile images and buttons
