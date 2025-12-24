# 🚍 Campus Bus Tracker

A comprehensive React Native mobile application for tracking college buses in real-time. Built with Expo and React Native, this app allows students to view all buses, track their live locations, receive notifications, and manage their profiles.

## ✨ Features

### 🎯 Core Functionality
- **All Buses View**: Browse and search through 101 buses with filtering options
- **Live Location Tracking**: Track any bus by entering its number or ID
- **Real-time Maps**: View bus locations on interactive maps with route visualization
- **Bus Details**: See comprehensive information including driver, route, seats, speed, and fuel
- **Notifications**: Stay updated with arrival times, delays, and service updates
- **User Profile**: Manage personal information, favorites, and travel history

### 🎨 UI/UX Features
- Modern, clean mobile-first design
- Bottom tab navigation for easy access
- Search and filter capabilities
- Visual status indicators with color coding
- Occupancy percentage bars
- Responsive card-based layouts
- Smooth animations and transitions

## 🏗️ Architecture

### Project Structure
```
bus-app/
├── app/
│   ├── (tabs)/              # Bottom tab navigation
│   │   ├── _layout.jsx      # Tab navigator configuration
│   │   ├── index.jsx        # All Buses tab
│   │   ├── live-location.jsx # Live Location tab
│   │   ├── notifications.jsx # Notifications tab
│   │   └── profile.jsx      # Profile tab
│   ├── bus/
│   │   └── [id].jsx         # Dynamic bus detail screen
│   ├── _layout.jsx          # Root layout
│   └── index.jsx            # Login screen
├── components/
│   ├── BusCard.jsx          # Bus list item component
│   └── StatCard.jsx         # Statistics card component
├── data/
│   └── buses.js             # Mock bus data (101 buses)
├── assets/
│   └── images/              # App images and icons
├── app.json                 # Expo configuration
├── package.json             # Dependencies
└── tsconfig.json            # JavaScript config
```

### Tech Stack
- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **Maps**: react-native-maps
- **Language**: JavaScript
- **Icons**: @expo/vector-icons (Ionicons)
- **State Management**: React hooks (useState)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS) or Android Emulator (for Android)
- Expo Go app on physical device (optional)

### Installation

1. **Clone the repository**
```bash
cd bus-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Google Maps API** (Required for maps functionality)
   - Get API keys from [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps SDK for Android and iOS
   - Update the API keys in `app.json`:
```json
"android": {
  "config": {
    "googleMaps": {
      "apiKey": "YOUR_ANDROID_MAPS_API_KEY"
    }
  }
},
"ios": {
  "config": {
    "googleMapsApiKey": "YOUR_IOS_MAPS_API_KEY"
  }
}
```

4. **Start the development server**
```bash
npm start
```

5. **Run on your preferred platform**
```bash
# iOS
npm run ios

# Android
npm run android

# Web (limited functionality)
npm run web
```

## 📱 Usage

### Navigation Flow
1. **Login Screen** → Enter credentials to access the app
2. **All Buses Tab** → Browse, search, and filter buses
3. **Bus Detail** → Tap any bus card to view detailed information
4. **Live Location Tab** → Search by bus number for real-time tracking
5. **Notifications Tab** → View alerts and updates
6. **Profile Tab** → Manage account and settings

### Search & Filter
- **Text Search**: Search by bus number, driver name, or route
- **Status Filter**: Filter by Running, Stopped, or In Service
- **Quick Access**: Use predefined bus numbers for fast lookup

## 🔌 Integrating Real Data

The app is designed to easily replace mock data with real backend data:

### 1. Update the Bus Interface
The bus data structure in `data/buses.js`:
```javascript
export interface Bus {
  id: number;
  number: string;
  driverName: string;
  totalSeats: number;
  occupiedSeats: number;
  route: string;
  currentLocation: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  speed: number;
  status: 'Running' | 'Stopped' | 'In Service' | 'Maintenance';
  fuel: number;
  lastUpdated: string;
}
```

### 2. Replace Mock Data with API Calls
```javascript
// Example: Fetch buses from API
import { useState, useEffect } from 'react';

export function useBuses() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://your-api.com/buses')
      .then(res => res.json())
      .then(data => {
        setBuses(data);
        setLoading(false);
      });
  }, []);

  return { buses, loading };
}
```

### 3. Add Real-time Updates
Consider using:
- **WebSockets** for live location updates
- **Firebase Realtime Database** for instant synchronization
- **Polling** for periodic updates

### 4. Backend Integration Points
- `/api/buses` - Get all buses
- `/api/buses/:id` - Get specific bus details
- `/api/buses/:id/location` - Get live location
- `/api/notifications` - Get user notifications
- `/api/users/profile` - User profile data

## 🎨 Customization

### Colors
Update the primary color throughout the app by replacing `#0ABAB5` with your brand color.

### Routes
Add or modify routes in the mock data generator in `data/buses.js`.

### Maps
Adjust map styles and markers in the bus detail screens and live location tab.

## 📦 Dependencies

### Core
- `expo`: ~54.0.30
- `react`: 19.1.0
- `react-native`: 0.81.5

### Navigation
- `expo-router`: ~6.0.21
- `@react-navigation/bottom-tabs`: ^7.4.0
- `@react-navigation/native`: ^7.1.26

### Maps & Location
- `react-native-maps`: (installed)
- `expo-location`: (installed)

### UI Components
- `@expo/vector-icons`: ^15.0.3

## 🐛 Troubleshooting

### Maps not displaying
- Ensure Google Maps API keys are configured in `app.json`
- Check that Maps SDK is enabled in Google Cloud Console
- Verify API key restrictions allow your app bundle ID

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
expo start -c
```

### Navigation issues
- Ensure all routes are properly configured in the file system
- Check that `expo-router` is properly set up in `app.json`

## 🔄 Future Enhancements

- [ ] Real-time location tracking with WebSockets
- [ ] Push notifications for bus arrivals
- [ ] Favorite buses and routes
- [ ] Offline mode with cached data
- [ ] Dark mode support
- [ ] Multiple language support
- [ ] Advanced analytics and reporting
- [ ] QR code scanning for bus identification
- [ ] Route planning and ETA calculations
- [ ] Driver app companion

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributors

Built with ❤️ for college students

## 📧 Support

For support, email support@campusbustracker.com or open an issue in the repository.

---

**Note**: This is a prototype with mock data. Replace mock data with real backend APIs for production use.
