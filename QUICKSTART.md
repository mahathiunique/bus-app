# 🚀 Quick Start Guide

## Setup in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Maps (Optional for development)
- For production, get Google Maps API keys from [Google Cloud Console](https://console.cloud.google.com/)
- Update `app.json` with your API keys
- For development, the app will work without maps (using fallback UI)

### 3. Start the App
```bash
npm start
```

### 4. Choose Your Platform
```bash
# Press 'i' for iOS simulator
# Press 'a' for Android emulator
# Press 'w' for web browser
# Scan QR code with Expo Go app on your phone
```

## 📱 First Run

1. **Login Screen**: Use any credentials (mock authentication)
2. **All Buses Tab**: Browse 101 pre-loaded buses
3. **Search**: Try searching for "BUS-001" or a driver name
4. **View Details**: Tap any bus card to see full details
5. **Live Location**: Enter a bus number (e.g., "BUS-001" or just "1")
6. **Explore Tabs**: Check out Notifications and Profile

## 🎯 Quick Test Scenarios

### Test Search Functionality
```
Search for: "BUS-025"
Expected: Shows BUS-025 details
```

### Test Filters
```
1. Click "Running" filter
2. Only running buses should display
```

### Test Live Location
```
1. Go to Live Location tab
2. Enter "1" or "BUS-001"
3. View bus on map
```

### Test Navigation
```
1. From All Buses, tap a bus card
2. View details with map
3. Press back button
4. Should return to list at same scroll position
```

## 🔧 Development Tips

### Hot Reload
- Save any file to see changes instantly
- Shake device or press Cmd+D (iOS) / Cmd+M (Android) for dev menu

### Debugging
```bash
# View logs
npm start
# Then press 'j' to open debugger
```

### Clear Cache
```bash
npm start -- --clear
```

## 📊 Mock Data Overview

- **Total Buses**: 101 (BUS-001 to BUS-101)
- **Drivers**: 20 unique drivers (rotated)
- **Routes**: 10 different routes
- **Locations**: 20 different stops
- **Coordinates**: Clustered around Hyderabad (17.4485, 78.3908)

## 🎨 Customization Quick Tips

### Change Primary Color
Find and replace `#0ABAB5` with your color in:
- `app/(tabs)/_layout.jsx`
- All tab files
- Component files

### Modify Bus Count
In `data/buses.js`, change:
```javascript
Array.from({ length: 101 }, ...) // Change 101 to desired number
```

### Add New Route
In `data/buses.js`, add to routes array:
```javascript
const routes = [
  'Main Campus - North Gate - Engineering Block',
  'Your New Route Here', // Add here
  // ...
];
```

## 🐛 Common Issues

### Issue: Maps not showing
**Solution**: Maps require Google API keys. For development, the app still works - you just won't see the map tiles.

### Issue: Expo Go connection failed
**Solution**: 
```bash
# Make sure phone and computer are on same WiFi
# Or use tunnel mode:
npm start -- --tunnel
```

### Issue: Cannot find module
**Solution**:
```bash
rm -rf node_modules
npm install
```

### Issue: Port already in use
**Solution**:
```bash
# Kill process on port 8081
lsof -ti:8081 | xargs kill -9
# Or use different port
npm start -- --port 8082
```

## 📱 Testing on Real Device

### iOS (Physical)
1. Install Expo Go from App Store
2. Open Expo Go
3. Scan QR code from terminal
4. App loads on your device

### Android (Physical)
1. Install Expo Go from Play Store
2. Open Expo Go
3. Scan QR code from terminal
4. App loads on your device

## 🚀 Next Steps

1. **Test All Features**: Go through each tab and feature
2. **Review Code**: Check the component structure
3. **Plan Backend**: Review `DATA_STRUCTURE.md` for API integration
4. **Customize UI**: Adjust colors, fonts, and layouts
5. **Add Features**: Implement additional functionality as needed

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Navigation](https://reactnavigation.org/)

## 💡 Pro Tips

1. **Keep the app running**: Hot reload makes development fast
2. **Use the debugger**: It's built into Chrome DevTools
3. **Test on real devices**: Simulators don't show real performance
4. **Read the logs**: They tell you what's happening
5. **Start simple**: Get one feature working before adding more

## 🎉 You're Ready!

Your bus tracking app is now set up and ready for development. Start exploring the code and customizing it to your needs!

---

**Need Help?** Check the main README.md or create an issue in the repository.
