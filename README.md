# Sabeh Group - React Native Mobile App

A cross-platform React Native mobile application for Sabeh Group, a cargo shipping company. The app allows customers to log in, sign up, and track their shipment orders easily.

## Features

### 🔐 Authentication
- **Login Screen**: Email and password authentication with form validation
- **Signup Screen**: User registration with comprehensive form validation
- **Session Management**: Secure token storage using AsyncStorage
- **Demo Credentials**: 
  - Email: `demo@sabehgroup.com`
  - Password: `password`

### 🏠 Home Screen
- **Statement Balance**: Display current balance in USD and Yen
- **Quick Actions**: Create orders, shipments, check exchange rates, freight estimation
- **Latest News**: Company announcements and updates
- **Shipment Tracking**: Search and track shipments by tracking number
- **Current Orders**: List of recent shipments with filtering (All, Sea, Air, FCL)

### 📊 Shipment Tracking
- **Detailed Shipment Info**: Complete shipment details including status, pricing, and logistics
- **Inventory Photos**: View shipment photos and documentation
- **Real-time Status**: Track shipment progress and delivery status

### 💰 Freight Estimation
- **Transportation Types**: Sea Freight and Air Freight options
- **Cost Calculation**: Automatic freight cost estimation based on weight and volume
- **Breakdown Details**: Detailed cost breakdown for transparency

### 👤 Profile Management
- **User Information**: Display and manage user profile details
- **Account Settings**: Language preferences and notification settings
- **Logout Functionality**: Secure session termination

### ℹ️ About Us
- **Company Information**: Detailed company description and services
- **Interactive Options**: Guiders, FAQ, Privacy Policy, Contact Us, Feedback

## Tech Stack

- **React Native**: Latest version for cross-platform development
- **Expo**: Development platform and build tools
- **React Navigation**: Navigation and bottom tabs
- **Axios**: HTTP client for API requests
- **AsyncStorage**: Secure token and session handling
- **Context API**: Global state management
- **Expo Vector Icons**: Icon library

## Color Palette

- **Primary**: `#002B5B` (Berkeley Blue)
- **Accent**: `#D72638` (Crimson Red)
- **Secondary**: `#00A6ED` (Picton Blue)
- **Background**: `#f8f9fa` (Light Gray)
- **Text**: `#333333` (Dark Gray)

## Project Structure

```
sabeh-group-app/
├── App.js                          # Main app component
├── app.json                        # Expo configuration
├── package.json                    # Dependencies and scripts
├── assets/                         # App icons and images
├── src/
│   ├── components/                 # Reusable components
│   │   ├── CustomButton.js
│   │   ├── CustomInput.js
│   │   └── ShipmentCard.js
│   ├── context/                    # Global state management
│   │   └── AuthContext.js
│   ├── screens/                    # App screens
│   │   ├── LoginScreen.js
│   │   ├── SignupScreen.js
│   │   ├── HomeScreen.js
│   │   ├── AboutUsScreen.js
│   │   ├── ProfileScreen.js
│   │   ├── ShipmentTrackingScreen.js
│   │   └── FreightEstimationScreen.js
│   └── services/                   # API services
│       └── api.js
└── README.md                       # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sabeh-group-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## API Integration

The app includes dummy API services that simulate real backend functionality:

- **Authentication**: Login and signup with JWT tokens
- **Shipment Tracking**: Mock shipment data with detailed information
- **Freight Estimation**: Cost calculation based on weight and volume
- **News Feed**: Company announcements and updates

### Demo Data

The app includes sample shipment data:
- `AIR5114`: Air shipment (Signed status)
- `AIR5076`: Air shipment (In Transit status)
- `YW5023`: Sea shipment (Delivered status)

## Navigation Structure

```
Authentication Stack
├── Login Screen
└── Signup Screen

Main App Stack
├── Bottom Tab Navigator
│   ├── Sabeh Group (About Us)
│   ├── Home
│   └── Me (Profile)
└── Modal Screens
    ├── Shipment Tracking
    └── Freight Estimation
```

## Features in Detail

### Authentication Flow
- Form validation with error messages
- Secure token storage
- Automatic session restoration
- Logout functionality

### Home Screen Features
- Real-time balance display
- Quick action buttons for common tasks
- News feed with company updates
- Shipment tracking with QR code support
- Filterable shipment list

### Shipment Tracking
- Detailed shipment information
- Status tracking with visual indicators
- Inventory photos
- Pricing breakdown
- Delivery timeline

### Freight Estimation
- Multiple transportation options
- Weight and volume calculations
- Cost breakdown
- Contact integration

## Development Notes

### State Management
- Uses React Context API for authentication state
- Local state for form data and UI interactions
- AsyncStorage for persistent data

### Error Handling
- Comprehensive error messages
- Network error handling
- Form validation
- User-friendly alerts

### Performance
- Optimized re-renders
- Efficient list rendering
- Image optimization
- Memory management

## Future Enhancements

- [ ] Real API integration
- [ ] Push notifications
- [ ] Offline support
- [ ] Multi-language support
- [ ] Advanced filtering
- [ ] Payment integration
- [ ] Real-time tracking
- [ ] Document upload
- [ ] Chat support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.

---

**Sabeh Group** - Logistics & Trading Excellence