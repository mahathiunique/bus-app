import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatCard from '../../components/StatCard';
import { buses } from '../../data/buses';

// Conditionally import maps
let MapView = null;
let Marker = null;
let Polyline = null;
let mapsAvailable = false;

try {
    const maps = require('react-native-maps');
    MapView = maps.default;
    Marker = maps.Marker;
    Polyline = maps.Polyline;
    mapsAvailable = true;
} catch (e) {
    // Maps not available - will show fallback UI
    mapsAvailable = false;
}

export default function BusDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const bus = buses.find((b) => b.id === Number(id));

    if (!bus) {
        return (
            <SafeAreaView style={styles.errorContainer}>
                <Ionicons name="alert-circle" size={64} color="#ff6b6b" />
                <Text style={styles.errorText}>Bus not found</Text>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>Go Back</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    // Generate a simple route path (in real app, this would come from backend)
    const routeCoordinates = [
        { latitude: bus.coordinates.latitude - 0.01, longitude: bus.coordinates.longitude - 0.01 },
        { latitude: bus.coordinates.latitude - 0.005, longitude: bus.coordinates.longitude - 0.005 },
        bus.coordinates,
        { latitude: bus.coordinates.latitude + 0.005, longitude: bus.coordinates.longitude + 0.005 },
        { latitude: bus.coordinates.latitude + 0.01, longitude: bus.coordinates.longitude + 0.01 },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Running': return '#10b981';
            case 'Stopped': return '#ef4444';
            case 'In Service': return '#3b82f6';
            case 'Maintenance': return '#f59e0b';
            default: return '#999';
        }
    };

    const availableSeats = bus.totalSeats - bus.occupiedSeats;
    const occupancyPercentage = Math.round((bus.occupiedSeats / bus.totalSeats) * 100);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Header Section */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backIconButton}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <Text style={styles.title}>{bus.number}</Text>
                        <View style={styles.statusBadge}>
                            <View style={[styles.statusDot, { backgroundColor: getStatusColor(bus.status) }]} />
                            <Text style={[styles.statusText, { color: getStatusColor(bus.status) }]}>
                                {bus.status}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Driver Info */}
                <View style={styles.driverCard}>
                    <View style={styles.driverIcon}>
                        <Ionicons name="person" size={24} color="#FFB800" />
                    </View>
                    <View>
                        <Text style={styles.driverLabel}>Driver</Text>
                        <Text style={styles.driverName}>{bus.driverName}</Text>
                    </View>
                </View>

                {/* Route Info */}
                <View style={styles.routeCard}>
                    <View style={styles.routeHeader}>
                        <Ionicons name="map" size={20} color="#FFB800" />
                        <Text style={styles.routeTitle}>Route</Text>
                    </View>
                    <Text style={styles.routeText}>{bus.route}</Text>
                    <View style={styles.locationRow}>
                        <Ionicons name="location" size={16} color="#666" />
                        <Text style={styles.locationText}>Current: {bus.currentLocation}</Text>
                    </View>
                </View>

                {/* Live Map */}
                <View style={styles.mapCard}>
                    <Text style={styles.mapTitle}>Live Location</Text>
                    {mapsAvailable && MapView ? (
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: bus.coordinates.latitude,
                                longitude: bus.coordinates.longitude,
                                latitudeDelta: 0.03,
                                longitudeDelta: 0.03,
                            }}
                        >
                            {/* Route Path */}
                            <Polyline
                                coordinates={routeCoordinates}
                                strokeColor="#FFB800"
                                strokeWidth={3}
                                lineDashPattern={[1]}
                            />

                            {/* Bus Marker */}
                            <Marker
                                coordinate={bus.coordinates}
                                title={bus.number}
                                description={`Speed: ${bus.speed} km/h`}
                            >
                                <View style={styles.busMarker}>
                                    <Ionicons name="bus" size={24} color="#fff" />
                                </View>
                            </Marker>

                            {/* Start and End Markers */}
                            <Marker
                                coordinate={routeCoordinates[0]}
                                title="Start Point"
                                pinColor="#10b981"
                            />
                            <Marker
                                coordinate={routeCoordinates[routeCoordinates.length - 1]}
                                title="End Point"
                                pinColor="#ef4444"
                            />
                        </MapView>
                    ) : (
                        <View style={styles.mapFallback}>
                            <Ionicons name="map" size={48} color="#ccc" />
                            <Text style={styles.mapFallbackTitle}>Location Details</Text>
                            <Text style={styles.mapFallbackText}>
                                📍 Latitude: {bus.coordinates.latitude.toFixed(4)}
                            </Text>
                            <Text style={styles.mapFallbackText}>
                                📍 Longitude: {bus.coordinates.longitude.toFixed(4)}
                            </Text>
                            <Text style={styles.mapFallbackText}>
                                ⚡ Speed: {bus.speed} km/h
                            </Text>
                            <View style={styles.mapFallbackNote}>
                                <Ionicons name="information-circle" size={16} color="#666" />
                                <Text style={styles.mapFallbackNoteText}>
                                    Interactive maps require a development build. The bus location coordinates are shown above.
                                </Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Stats Grid */}
                <View style={styles.statsContainer}>
                    <View style={styles.statsRow}>
                        <StatCard
                            label="Available Seats"
                            value={`${availableSeats}/${bus.totalSeats}`}
                            icon="people"
                            color="#10b981"
                        />
                        <StatCard
                            label="Occupancy"
                            value={`${occupancyPercentage}%`}
                            icon="pie-chart"
                            color="#3b82f6"
                        />
                    </View>
                    <View style={styles.statsRow}>
                        <StatCard
                            label="Current Speed"
                            value={`${bus.speed}`}
                            unit="km/h"
                            icon="speedometer"
                            color="#8b5cf6"
                        />
                        <StatCard
                            label="Fuel Level"
                            value={`${bus.fuel}%`}
                            icon="water"
                            color={bus.fuel > 50 ? '#10b981' : bus.fuel > 25 ? '#f59e0b' : '#ef4444'}
                        />
                    </View>
                </View>

                {/* Last Updated */}
                <View style={styles.updateInfo}>
                    <Ionicons name="time" size={16} color="#999" />
                    <Text style={styles.updateText}>
                        Last updated: {new Date(bus.lastUpdated).toLocaleTimeString()}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFCF5',
    },
    scrollContainer: {
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFCF5',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        color: '#666',
        marginTop: 16,
        marginBottom: 24,
    },
    backButton: {
        backgroundColor: '#FFB800',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backIconButton: {
        marginRight: 12,
    },
    headerContent: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600',
    },
    driverCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 15,
        padding: 16,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    driverIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFF8E6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    driverLabel: {
        fontSize: 12,
        color: '#999',
        marginBottom: 2,
    },
    driverName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    routeCard: {
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginBottom: 15,
        padding: 16,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    routeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    routeTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 8,
    },
    routeText: {
        fontSize: 15,
        color: '#666',
        lineHeight: 22,
        marginBottom: 8,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    locationText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 6,
    },
    mapCard: {
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginBottom: 15,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    mapTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        padding: 16,
        paddingBottom: 12,
    },
    map: {
        width: '100%',
        height: 250,
    },
    busMarker: {
        backgroundColor: '#FFB800',
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    statsContainer: {
        paddingHorizontal: 15,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    updateInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingBottom: 30,
    },
    updateText: {
        fontSize: 13,
        color: '#999',
        marginLeft: 6,
    },
    mapFallback: {
        width: '100%',
        height: 250,
        backgroundColor: '#FFFCF5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    mapFallbackTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 12,
        marginBottom: 16,
    },
    mapFallbackText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    mapFallbackNote: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 16,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        maxWidth: '100%',
    },
    mapFallbackNoteText: {
        flex: 1,
        fontSize: 12,
        color: '#666',
        marginLeft: 8,
        lineHeight: 18,
    },
});
