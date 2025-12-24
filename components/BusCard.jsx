import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BusCard({ bus, onPress }) {
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
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.busIconContainer}>
                    <Ionicons name="bus" size={24} color="#0ABAB5" />
                </View>
                <View style={styles.headerContent}>
                    <Text style={styles.busNumber}>{bus.number}</Text>
                    <View style={styles.statusBadge}>
                        <View style={[styles.statusDot, { backgroundColor: getStatusColor(bus.status) }]} />
                        <Text style={[styles.statusText, { color: getStatusColor(bus.status) }]}>
                            {bus.status}
                        </Text>
                    </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>

            {/* Route Info */}
            <View style={styles.routeContainer}>
                <Ionicons name="navigate" size={14} color="#666" />
                <Text style={styles.routeText} numberOfLines={1}>{bus.route}</Text>
            </View>

            {/* Stats Row */}
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Ionicons name="people" size={16} color="#0ABAB5" />
                    <Text style={styles.statText}>{availableSeats} seats</Text>
                </View>
                <View style={styles.statItem}>
                    <Ionicons name="location" size={16} color="#3b82f6" />
                    <Text style={styles.statText} numberOfLines={1}>{bus.currentLocation}</Text>
                </View>
                <View style={styles.statItem}>
                    <Ionicons name="speedometer" size={16} color="#8b5cf6" />
                    <Text style={styles.statText}>{bus.speed} km/h</Text>
                </View>
            </View>

            {/* Occupancy Bar */}
            <View style={styles.occupancyContainer}>
                <View style={styles.occupancyBar}>
                    <View
                        style={[
                            styles.occupancyFill,
                            {
                                width: `${occupancyPercentage}%`,
                                backgroundColor: occupancyPercentage > 80 ? '#ef4444' : occupancyPercentage > 50 ? '#f59e0b' : '#10b981'
                            }
                        ]}
                    />
                </View>
                <Text style={styles.occupancyText}>{occupancyPercentage}%</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    busIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E6F9F8',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    headerContent: {
        flex: 1,
    },
    busNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusText: {
        fontSize: 13,
        fontWeight: '600',
    },
    routeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#F4FAFF',
        borderRadius: 8,
    },
    routeText: {
        fontSize: 13,
        color: '#666',
        marginLeft: 6,
        flex: 1,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    statText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },
    occupancyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    occupancyBar: {
        flex: 1,
        height: 6,
        backgroundColor: '#e0e0e0',
        borderRadius: 3,
        marginRight: 8,
        overflow: 'hidden',
    },
    occupancyFill: {
        height: '100%',
        borderRadius: 3,
    },
    occupancyText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        minWidth: 35,
        textAlign: 'right',
    },
});
