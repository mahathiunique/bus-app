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

    const getStatusText = (status) => {
        switch (status) {
            case 'Running': return 'On Route';
            case 'Stopped': return 'Stopped';
            case 'In Service': return 'Available';
            case 'Maintenance': return 'Not Available';
            default: return status;
        }
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.busIconContainer}>
                    <Ionicons name="bus" size={24} color="#0ABAB5" />
                </View>
                <View style={styles.headerContent}>
                    <Text style={styles.busNumber}>{bus.number}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(bus.status)}15` }]}>
                        <View style={[styles.statusDot, { backgroundColor: getStatusColor(bus.status) }]} />
                        <Text style={[styles.statusText, { color: getStatusColor(bus.status) }]}>
                            {getStatusText(bus.status)}
                        </Text>
                    </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>

            {/* Route Info */}
            <View style={styles.routeContainer}>
                <Ionicons name="navigate" size={16} color="#0ABAB5" />
                <Text style={styles.routeText} numberOfLines={1}>{bus.route}</Text>
            </View>

            {/* Current Location */}
            <View style={styles.locationContainer}>
                <Ionicons name="location" size={16} color="#3b82f6" />
                <Text style={styles.locationText}>Currently at: {bus.currentLocation}</Text>
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
        marginBottom: 6,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    routeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: '#F4FAFF',
        borderRadius: 10,
        marginBottom: 10,
    },
    routeText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 8,
        flex: 1,
        fontWeight: '500',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 4,
    },
    locationText: {
        fontSize: 13,
        color: '#666',
        marginLeft: 8,
    },
});
