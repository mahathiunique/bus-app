import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buses } from '../../data/buses';

// Conditionally import maps
let MapView = null;
let Marker = null;
let mapsAvailable = false;

try {
    const maps = require('react-native-maps');
    MapView = maps.default;
    Marker = maps.Marker;
    mapsAvailable = true;
} catch (e) {
    // Maps not available - will show fallback UI
    mapsAvailable = false;
}

export default function LiveLocationScreen() {
    const router = useRouter();
    const [busNumber, setBusNumber] = useState('');
    const [selectedBus, setSelectedBus] = useState(null);
    const [error, setError] = useState('');

    const searchBus = () => {
        setError('');
        const found = buses.find((bus) =>
            bus.number.toLowerCase() === busNumber.toLowerCase().trim() ||
            bus.id.toString() === busNumber.trim()
        );

        if (found) {
            setSelectedBus(found);
        } else {
            setError('Bus not found. Please check the bus number.');
            setSelectedBus(null);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Running': return '#10b981';
            case 'Stopped': return '#ef4444';
            case 'In Service': return '#3b82f6';
            case 'Maintenance': return '#f59e0b';
            default: return '#999';
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Search Section */}
                <View style={styles.searchSection}>
                    <Text style={styles.instructionText}>
                        Enter bus number to track its live location
                    </Text>

                    <View style={styles.searchContainer}>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="bus" size={20} color="#999" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="e.g., BUS-001 or 1"
                                value={busNumber}
                                onChangeText={(text) => {
                                    setBusNumber(text);
                                    setError('');
                                }}
                                onSubmitEditing={searchBus}
                                autoCapitalize="characters"
                            />
                            {busNumber.length > 0 && (
                                <TouchableOpacity onPress={() => {
                                    setBusNumber('');
                                    setSelectedBus(null);
                                    setError('');
                                }}>
                                    <Ionicons name="close-circle" size={20} color="#999" />
                                </TouchableOpacity>
                            )}
                        </View>

                        <TouchableOpacity style={styles.searchButton} onPress={searchBus}>
                            <Ionicons name="search" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {error && (
                        <View style={styles.errorContainer}>
                            <Ionicons name="alert-circle" size={20} color="#ef4444" />
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}
                </View>

                {/* Quick Access Numbers */}
                <View style={styles.quickAccessSection}>
                    <Text style={styles.sectionTitle}>Quick Access</Text>
                    <View style={styles.quickAccessGrid}>
                        {['BUS-001', 'BUS-010', 'BUS-025', 'BUS-050', 'BUS-075', 'BUS-100'].map((num) => (
                            <TouchableOpacity
                                key={num}
                                style={styles.quickAccessButton}
                                onPress={() => {
                                    setBusNumber(num);
                                    const found = buses.find(b => b.number === num);
                                    if (found) setSelectedBus(found);
                                }}
                            >
                                <Text style={styles.quickAccessText}>{num}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Bus Details and Map */}
                {selectedBus && (
                    <>
                        <View style={styles.busInfoCard}>
                            <View style={styles.busInfoHeader}>
                                <View>
                                    <Text style={styles.busNumber}>{selectedBus.number}</Text>
                                    <View style={styles.statusBadge}>
                                        <View style={[styles.statusDot, { backgroundColor: getStatusColor(selectedBus.status) }]} />
                                        <Text style={[styles.statusText, { color: getStatusColor(selectedBus.status) }]}>
                                            {selectedBus.status}
                                        </Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.viewDetailsButton}
                                    onPress={() => router.push(`/bus/${selectedBus.id}`)}
                                >
                                    <Text style={styles.viewDetailsText}>View Details</Text>
                                    <Ionicons name="arrow-forward" size={16} color="#FFB800" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.infoRow}>
                                <Ionicons name="person" size={18} color="#666" />
                                <Text style={styles.infoText}>Driver: {selectedBus.driverName}</Text>
                            </View>

                            <View style={styles.infoRow}>
                                <Ionicons name="location" size={18} color="#666" />
                                <Text style={styles.infoText}>Current: {selectedBus.currentLocation}</Text>
                            </View>

                            <View style={styles.infoRow}>
                                <Ionicons name="speedometer" size={18} color="#666" />
                                <Text style={styles.infoText}>Speed: {selectedBus.speed} km/h</Text>
                            </View>

                            <View style={styles.statsRow}>
                                <View style={styles.statBox}>
                                    <Text style={styles.statLabel}>Available Seats</Text>
                                    <Text style={styles.statValue}>
                                        {selectedBus.totalSeats - selectedBus.occupiedSeats}/{selectedBus.totalSeats}
                                    </Text>
                                </View>
                                <View style={styles.statBox}>
                                    <Text style={styles.statLabel}>Fuel</Text>
                                    <Text style={[styles.statValue, {
                                        color: selectedBus.fuel > 50 ? '#10b981' : selectedBus.fuel > 25 ? '#f59e0b' : '#ef4444'
                                    }]}>
                                        {selectedBus.fuel}%
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Map View */}
                        <View style={styles.mapCard}>
                            <Text style={styles.mapTitle}>Live Location on Map</Text>
                            {mapsAvailable && MapView ? (
                                <MapView
                                    style={styles.map}
                                    initialRegion={{
                                        latitude: selectedBus.coordinates.latitude,
                                        longitude: selectedBus.coordinates.longitude,
                                        latitudeDelta: 0.02,
                                        longitudeDelta: 0.02,
                                    }}
                                >
                                    <Marker
                                        coordinate={selectedBus.coordinates}
                                        title={selectedBus.number}
                                        description={`${selectedBus.currentLocation} - ${selectedBus.speed} km/h`}
                                    >
                                        <View style={styles.busMarker}>
                                            <Ionicons name="bus" size={24} color="#fff" />
                                        </View>
                                    </Marker>
                                </MapView>
                            ) : (
                                <View style={styles.mapFallback}>
                                    <Ionicons name="map" size={48} color="#ccc" />
                                    <Text style={styles.mapFallbackTitle}>Map Preview</Text>
                                    <Text style={styles.mapFallbackText}>
                                        📍 Latitude: {selectedBus.coordinates.latitude.toFixed(4)}
                                    </Text>
                                    <Text style={styles.mapFallbackText}>
                                        📍 Longitude: {selectedBus.coordinates.longitude.toFixed(4)}
                                    </Text>
                                    <View style={styles.mapFallbackNote}>
                                        <Ionicons name="information-circle" size={16} color="#666" />
                                        <Text style={styles.mapFallbackNoteText}>
                                            Maps require development build. Using Expo Go? The location data is shown above.
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    </>
                )}

                {/* Empty State */}
                {!selectedBus && !error && (
                    <View style={styles.emptyState}>
                        <Ionicons name="locate" size={64} color="#ccc" />
                        <Text style={styles.emptyStateText}>
                            Search for a bus to view its live location
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFCF5',
    },
    searchSection: {
        backgroundColor: '#fff',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    instructionText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    searchContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFCF5',
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 48,
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: '#FFB800',
        width: 48,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        padding: 12,
        backgroundColor: '#fee2e2',
        borderRadius: 8,
    },
    errorText: {
        color: '#ef4444',
        marginLeft: 8,
        flex: 1,
    },
    quickAccessSection: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    quickAccessGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    quickAccessButton: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    quickAccessText: {
        color: '#FFB800',
        fontWeight: '600',
    },
    busInfoCard: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginBottom: 15,
        padding: 16,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    busInfoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    busNumber: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
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
    viewDetailsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        backgroundColor: '#FFF8E6',
    },
    viewDetailsText: {
        color: '#FFB800',
        fontWeight: '600',
        marginRight: 4,
        fontSize: 13,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 15,
        color: '#666',
        marginLeft: 10,
    },
    statsRow: {
        flexDirection: 'row',
        marginTop: 12,
        gap: 12,
    },
    statBox: {
        flex: 1,
        backgroundColor: '#FFFCF5',
        padding: 12,
        borderRadius: 8,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    mapCard: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginBottom: 20,
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
        height: 300,
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
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
        paddingHorizontal: 40,
    },
    emptyStateText: {
        marginTop: 16,
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },
    mapFallback: {
        height: 300,
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
    },
    mapFallbackNoteText: {
        flex: 1,
        fontSize: 12,
        color: '#666',
        marginLeft: 8,
        lineHeight: 18,
    },
});
