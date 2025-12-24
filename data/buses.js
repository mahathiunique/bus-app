// Driver names pool
const driverNames = [
    'Rajesh Kumar', 'Amit Singh', 'Suresh Reddy', 'Vijay Sharma', 'Prakash Rao',
    'Ramesh Patel', 'Mahesh Gupta', 'Anil Kumar', 'Dinesh Verma', 'Santosh Singh',
    'Kiran Kumar', 'Ravi Shankar', 'Mohan Das', 'Gopal Krishna', 'Ashok Kumar',
    'Sanjay Mehta', 'Rakesh Jain', 'Deepak Nair', 'Manoj Desai', 'Vinod Thakur'
];

// Route names pool
const routes = [
    'Main Campus - North Gate - Engineering Block',
    'Admin Block - Library - Science Block',
    'South Campus - Hostel - Sports Complex',
    'East Gate - Medical Center - Arts Block',
    'West Wing - Cafeteria - Central Plaza',
    'Research Park - IT Block - Commerce Block',
    'Auditorium - Conference Hall - Admin Office',
    'Student Center - Gym - Playground',
    'Faculty Housing - Guest House - Main Entrance',
    'Parking Lot A - Academic Block - Lab Complex'
];

// Location names pool
const locations = [
    'Main Campus', 'North Gate', 'Engineering Block', 'Admin Block', 'Library',
    'Science Block', 'South Campus', 'Hostel Area', 'Sports Complex', 'East Gate',
    'Medical Center', 'Arts Block', 'West Wing', 'Cafeteria', 'Central Plaza',
    'Research Park', 'IT Block', 'Commerce Block', 'Auditorium', 'Conference Hall'
];

// Generate realistic GPS coordinates around a central campus location
// Using a base coordinate and adding small variations
const BASE_LAT = 17.4485; // Example: Hyderabad area
const BASE_LNG = 78.3908;

export const buses = Array.from({ length: 101 }, (_, i) => {
    const totalSeats = i % 2 === 0 ? 45 : 40; // Mix of 45 and 40 seater buses
    const occupiedSeats = Math.floor(Math.random() * totalSeats);
    const statusOptions = ['Running', 'Stopped', 'In Service', 'Maintenance'];

    return {
        id: i + 1,
        number: `BUS-${String(i + 1).padStart(3, '0')}`,
        driverName: driverNames[i % driverNames.length],
        totalSeats,
        occupiedSeats,
        route: routes[i % routes.length],
        currentLocation: locations[i % locations.length],
        coordinates: {
            latitude: BASE_LAT + (Math.random() - 0.5) * 0.05, // ~5km radius variation
            longitude: BASE_LNG + (Math.random() - 0.5) * 0.05,
        },
        speed: i % 4 === 0 ? 0 : Math.floor(Math.random() * 50) + 10, // 0-60 km/h
        status: statusOptions[i % statusOptions.length],
        fuel: Math.floor(Math.random() * 100),
        lastUpdated: new Date(Date.now() - Math.random() * 300000).toISOString(), // Last 5 minutes
    };
});
