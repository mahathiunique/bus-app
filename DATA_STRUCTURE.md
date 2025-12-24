# Data Structure Documentation

## Bus Data Model

### Interface Definition

```javascript
export interface Bus {
  id: number;                    // Unique identifier (1-101)
  number: string;                // Bus number (e.g., "BUS-001")
  driverName: string;            // Driver's full name
  totalSeats: number;            // Total capacity (40 or 45)
  occupiedSeats: number;         // Currently occupied seats
  route: string;                 // Route description
  currentLocation: string;       // Current location name
  coordinates: {
    latitude: number;            // GPS latitude
    longitude: number;           // GPS longitude
  };
  speed: number;                 // Current speed in km/h
  status: Status;                // Current operational status
  fuel: number;                  // Fuel percentage (0-100)
  lastUpdated: string;           // ISO 8601 timestamp
}

type Status = 'Running' | 'Stopped' | 'In Service' | 'Maintenance';
```

### Field Descriptions

#### id
- **Type**: `number`
- **Range**: 1-101
- **Purpose**: Unique identifier for each bus
- **Backend**: Should map to your database primary key

#### number
- **Type**: `string`
- **Format**: "BUS-XXX" (e.g., "BUS-001", "BUS-100")
- **Purpose**: Human-readable bus identifier
- **Display**: Shown prominently in UI
- **Searchable**: Yes

#### driverName
- **Type**: `string`
- **Format**: Full name (e.g., "Rajesh Kumar")
- **Purpose**: Display driver information
- **Backend**: Should reference driver table/collection

#### totalSeats
- **Type**: `number`
- **Values**: 40 or 45 (can be customized)
- **Purpose**: Bus capacity
- **Usage**: Calculate occupancy percentage

#### occupiedSeats
- **Type**: `number`
- **Range**: 0 to totalSeats
- **Purpose**: Real-time seat availability
- **Updates**: Should update frequently (every 30-60 seconds)

#### route
- **Type**: `string`
- **Format**: "Start - Stop1 - Stop2 - Destination"
- **Example**: "Main Campus - North Gate - Engineering Block"
- **Purpose**: Display route information
- **Searchable**: Yes

#### currentLocation
- **Type**: `string`
- **Purpose**: Named location for easy identification
- **Updates**: Changes as bus moves between stops
- **Display**: Shown in cards and detail views

#### coordinates
- **Type**: `{ latitude: number, longitude: number }`
- **Purpose**: GPS coordinates for map display
- **Format**: Decimal degrees
- **Example**: `{ latitude: 17.4485, longitude: 78.3908 }`
- **Updates**: Real-time updates (every 5-30 seconds recommended)
- **Required**: For map functionality

#### speed
- **Type**: `number`
- **Unit**: km/h
- **Range**: 0-100 (typically 0-60 for buses)
- **Purpose**: Display current speed
- **Updates**: Real-time

#### status
- **Type**: Enum/Union type
- **Values**: 
  - `'Running'`: Bus is actively moving
  - `'Stopped'`: Bus is temporarily stopped
  - `'In Service'`: Bus is available but not currently on route
  - `'Maintenance'`: Bus is under repair/maintenance
- **Purpose**: Operational status
- **Visual**: Color-coded in UI

#### fuel
- **Type**: `number`
- **Range**: 0-100
- **Unit**: Percentage
- **Purpose**: Fuel level monitoring
- **Alerts**: Consider alerts when < 25%

#### lastUpdated
- **Type**: `string`
- **Format**: ISO 8601 timestamp
- **Example**: "2024-12-23T10:30:00.000Z"
- **Purpose**: Show data freshness
- **Display**: Relative time ("2 min ago")

## Mock Data Generation

The current implementation generates 101 buses with varied data:

```javascript
export const buses: Bus[] = Array.from({ length: 101 }, (_, i) => {
  const totalSeats = i % 2 === 0 ? 45 : 40;
  const occupiedSeats = Math.floor(Math.random() * totalSeats);
  
  return {
    id: i + 1,
    number: `BUS-${String(i + 1).padStart(3, '0')}`,
    driverName: driverNames[i % driverNames.length],
    totalSeats,
    occupiedSeats,
    route: routes[i % routes.length],
    currentLocation: locations[i % locations.length],
    coordinates: {
      latitude: BASE_LAT + (Math.random() - 0.5) * 0.05,
      longitude: BASE_LNG + (Math.random() - 0.5) * 0.05,
    },
    speed: i % 4 === 0 ? 0 : Math.floor(Math.random() * 50) + 10,
    status: statusOptions[i % statusOptions.length],
    fuel: Math.floor(Math.random() * 100),
    lastUpdated: new Date(Date.now() - Math.random() * 300000).toISOString(),
  };
});
```

## Replacing Mock Data with Real API

### Step 1: Create API Service

```javascript
// services/busApi.js
const API_BASE_URL = 'https://your-api.com/api';

export const busApi = {
  // Get all buses
  getAllBuses: async (): Promise<Bus[]> => {
    const response = await fetch(`${API_BASE_URL}/buses`);
    return response.json();
  },

  // Get single bus
  getBusById: async (id: number): Promise<Bus> => {
    const response = await fetch(`${API_BASE_URL}/buses/${id}`);
    return response.json();
  },

  // Search buses
  searchBuses: async (query: string): Promise<Bus[]> => {
    const response = await fetch(`${API_BASE_URL}/buses/search?q=${query}`);
    return response.json();
  },

  // Get live location
  getLiveLocation: async (busId: number): Promise<Bus['coordinates']> => {
    const response = await fetch(`${API_BASE_URL}/buses/${busId}/location`);
    return response.json();
  },
};
```

### Step 2: Create React Hook

```javascript
// hooks/useBuses.js
import { useState, useEffect } from 'react';
import { busApi } from '../services/busApi';
import { Bus } from '../data/buses';

export function useBuses() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBuses();
  }, []);

  const loadBuses = async () => {
    try {
      setLoading(true);
      const data = await busApi.getAllBuses();
      setBuses(data);
      setError(null);
    } catch (err) {
      setError('Failed to load buses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const refreshBuses = () => {
    loadBuses();
  };

  return { buses, loading, error, refreshBuses };
}
```

### Step 3: Use in Components

```javascript
// app/(tabs)/index.jsx
import { useBuses } from '../../hooks/useBuses';

export default function AllBusesScreen() {
  const { buses, loading, error, refreshBuses } = useBuses();

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} onRetry={refreshBuses} />;

  return (
    <FlatList
      data={buses}
      renderItem={({ item }) => <BusCard bus={item} />}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refreshBuses} />
      }
    />
  );
}
```

## Real-time Updates

### Using WebSockets

```javascript
// services/busWebSocket.js
import { Bus } from '../data/buses';

class BusWebSocketService {
  private ws: WebSocket | null = null;
  private listeners: ((buses: Bus[]) => void)[] = [];

  connect() {
    this.ws = new WebSocket('wss://your-api.com/ws/buses');
    
    this.ws.onmessage = (event) => {
      const buses = JSON.parse(event.data);
      this.listeners.forEach(listener => listener(buses));
    };
  }

  subscribe(callback: (buses: Bus[]) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  disconnect() {
    this.ws?.close();
  }
}

export const busWebSocket = new BusWebSocketService();
```

## Backend API Endpoints

### Recommended Endpoints

```
GET    /api/buses                      - Get all buses
GET    /api/buses/:id                  - Get specific bus
GET    /api/buses/:id/location         - Get live location
GET    /api/buses/search?q=:query      - Search buses
POST   /api/buses                      - Create new bus (admin)
PUT    /api/buses/:id                  - Update bus info (admin)
DELETE /api/buses/:id                  - Delete bus (admin)
GET    /api/routes                     - Get all routes
GET    /api/notifications              - Get user notifications
POST   /api/notifications/subscribe    - Subscribe to bus alerts
```

### Response Formats

#### GET /api/buses
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "number": "BUS-001",
      "driverName": "Rajesh Kumar",
      "totalSeats": 45,
      "occupiedSeats": 23,
      "route": "Main Campus - North Gate - Engineering Block",
      "currentLocation": "Main Campus",
      "coordinates": {
        "latitude": 17.4485,
        "longitude": 78.3908
      },
      "speed": 35,
      "status": "Running",
      "fuel": 75,
      "lastUpdated": "2024-12-23T10:30:00.000Z"
    }
  ],
  "count": 101,
  "timestamp": "2024-12-23T10:30:15.000Z"
}
```

## Performance Considerations

### Caching Strategy
- Cache bus list for 30-60 seconds
- Update live locations every 5-30 seconds
- Cache routes and stops indefinitely

### Optimization Tips
- Use pagination for large bus lists
- Implement virtual scrolling for 100+ items
- Lazy load bus details
- Compress API responses
- Use CDN for static map tiles

### Error Handling
- Implement retry logic
- Show cached data when offline
- Display meaningful error messages
- Log errors for debugging

## Security Considerations

### API Authentication
- Use JWT tokens or API keys
- Implement rate limiting
- Validate all inputs
- Use HTTPS only

### Data Privacy
- Don't expose driver personal information
- Limit location precision if needed
- Implement role-based access control
- Audit sensitive operations

## Testing Data

For testing, you can create specific scenarios:

```javascript
export const testBuses: Bus[] = [
  // Full bus
  {
    id: 999,
    number: "TEST-001",
    occupiedSeats: 45,
    totalSeats: 45,
    status: "Running",
    // ... other fields
  },
  // Empty bus
  {
    id: 998,
    number: "TEST-002",
    occupiedSeats: 0,
    totalSeats: 45,
    status: "In Service",
    // ... other fields
  },
  // Maintenance bus
  {
    id: 997,
    number: "TEST-003",
    status: "Maintenance",
    // ... other fields
  },
];
```

This documentation should help you understand the data structure and integrate real backend APIs into the app.