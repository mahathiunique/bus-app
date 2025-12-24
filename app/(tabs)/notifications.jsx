import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock notification data
const notifications = [
    {
        id: 1,
        type: 'arrival',
        title: 'Bus Arriving Soon',
        message: 'BUS-025 will arrive at Main Campus in 5 minutes',
        time: '2 min ago',
        read: false,
        icon: 'notifications',
        color: '#FFB800',
    },
    {
        id: 2,
        type: 'delay',
        title: 'Route Delay',
        message: 'BUS-042 is delayed by 15 minutes due to traffic',
        time: '15 min ago',
        read: false,
        icon: 'alert-circle',
        color: '#f59e0b',
    },
    {
        id: 3,
        type: 'maintenance',
        title: 'Maintenance Update',
        message: 'BUS-013 is under maintenance and will be unavailable today',
        time: '1 hour ago',
        read: true,
        icon: 'construct',
        color: '#ef4444',
    },
    {
        id: 4,
        type: 'route',
        title: 'Route Change',
        message: 'New route added: Campus Center - Library - Tech Park',
        time: '2 hours ago',
        read: true,
        icon: 'map',
        color: '#3b82f6',
    },
    {
        id: 5,
        type: 'general',
        title: 'Service Update',
        message: 'All buses are running on schedule today',
        time: '3 hours ago',
        read: true,
        icon: 'checkmark-circle',
        color: '#10b981',
    },
];

export default function NotificationsScreen() {
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            {/* Header Stats */}
            <View style={styles.header}>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{notifications.length}</Text>
                    <Text style={styles.statLabel}>Total</Text>
                </View>
                <View style={[styles.statCard, styles.unreadCard]}>
                    <Text style={[styles.statValue, styles.unreadValue]}>{unreadCount}</Text>
                    <Text style={styles.statLabel}>Unread</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {notifications.length > 0 ? (
                    <View style={styles.notificationsList}>
                        {notifications.map((notification) => (
                            <TouchableOpacity
                                key={notification.id}
                                style={[
                                    styles.notificationCard,
                                    !notification.read && styles.unreadNotification,
                                ]}
                            >
                                <View style={[styles.iconContainer, { backgroundColor: `${notification.color}15` }]}>
                                    <Ionicons name={notification.icon} size={24} color={notification.color} />
                                </View>
                                <View style={styles.notificationContent}>
                                    <View style={styles.notificationHeader}>
                                        <Text style={styles.notificationTitle}>{notification.title}</Text>
                                        {!notification.read && <View style={styles.unreadDot} />}
                                    </View>
                                    <Text style={styles.notificationMessage}>{notification.message}</Text>
                                    <Text style={styles.notificationTime}>{notification.time}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="notifications-off" size={64} color="#ccc" />
                        <Text style={styles.emptyStateText}>No notifications yet</Text>
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
    header: {
        flexDirection: 'row',
        padding: 15,
        gap: 15,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    unreadCard: {
        backgroundColor: '#FFB800',
    },
    statValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    unreadValue: {
        color: '#fff',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
    },
    notificationsList: {
        padding: 15,
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    unreadNotification: {
        borderLeftWidth: 4,
        borderLeftColor: '#FFB800',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    notificationContent: {
        flex: 1,
    },
    notificationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FFB800',
        marginLeft: 8,
    },
    notificationMessage: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 6,
    },
    notificationTime: {
        fontSize: 12,
        color: '#999',
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
});
