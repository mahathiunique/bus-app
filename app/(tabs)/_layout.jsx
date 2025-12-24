import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#FFB800',
                tabBarInactiveTintColor: '#999',
                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopWidth: 1,
                    borderTopColor: '#e0e0e0',
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
                headerStyle: {
                    backgroundColor: '#FFB800',
                },
                headerTintColor: '#000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'All Buses',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="bus" size={27} color={color} />
                    ),
                    headerTitle: 'All Buses',
                }}
            />
            <Tabs.Screen
                name="live-location"
                options={{
                    title: 'Live Location',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="location" size={27} color={color} />
                    ),
                    headerTitle: 'Live Location by Bus Number',
                }}
            />
            <Tabs.Screen
                name="notifications"
                options={{
                    title: 'Notifications',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="notifications" size={27} color={color} />
                    ),
                    headerTitle: 'Notifications',
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="person" size={27} color={color} />
                    ),
                    headerTitle: 'My Profile',
                }}
            />
        </Tabs>
    );
}
