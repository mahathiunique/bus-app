import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const router = useRouter();

    const menuItems = [
        {
            id: 1,
            icon: 'person-outline',
            title: 'Personal Information',
            subtitle: 'Update your details',
            color: '#FFB800',
        },
        {
            id: 2,
            icon: 'bookmark-outline',
            title: 'Favorite Routes',
            subtitle: 'Manage saved routes',
            color: '#3b82f6',
        },
        {
            id: 3,
            icon: 'time-outline',
            title: 'Travel History',
            subtitle: 'View past journeys',
            color: '#8b5cf6',
        },
        {
            id: 4,
            icon: 'notifications-outline',
            title: 'Notification Settings',
            subtitle: 'Manage alerts',
            color: '#f59e0b',
        },
        {
            id: 5,
            icon: 'help-circle-outline',
            title: 'Help & Support',
            subtitle: 'Get assistance',
            color: '#10b981',
        },
        {
            id: 6,
            icon: 'information-circle-outline',
            title: 'About',
            subtitle: 'App version 1.0.0',
            color: '#6b7280',
        },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Profile Header */}
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Ionicons name="person" size={48} color="#fff" />
                        </View>
                        <TouchableOpacity style={styles.editAvatarButton}>
                            <Ionicons name="camera" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.name}>Student Name</Text>
                    <Text style={styles.email}>student@college.edu</Text>
                    <Text style={styles.studentId}>ID: STU-2024-001</Text>
                </View>

                {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    <View style={styles.statCard}>
                        <Ionicons name="calendar" size={24} color="#FFB800" />
                        <Text style={styles.statValue}>45</Text>
                        <Text style={styles.statLabel}>Trips This Month</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Ionicons name="star" size={24} color="#f59e0b" />
                        <Text style={styles.statValue}>8</Text>
                        <Text style={styles.statLabel}>Favorite Routes</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.menuItem}>
                            <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                                <Ionicons name={item.icon} size={24} color={item.color} />
                            </View>
                            <View style={styles.menuContent}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#999" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => router.replace('/')}
                >
                    <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                {/* App Info */}
                <View style={styles.appInfo}>
                    <Text style={styles.appInfoText}>Campus Bus Tracker</Text>
                    <Text style={styles.appInfoText}>Version 1.0.0</Text>
                    <Text style={styles.appInfoText}>© 2024 College Name</Text>
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
    header: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFB800',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    editAvatarButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#FFB800',
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#fff',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    studentId: {
        fontSize: 13,
        color: '#999',
    },
    statsContainer: {
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
    statValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 8,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    menuContainer: {
        padding: 15,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    menuIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: 13,
        color: '#666',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 16,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ef4444',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ef4444',
        marginLeft: 8,
    },
    appInfo: {
        alignItems: 'center',
        padding: 30,
        paddingBottom: 40,
    },
    appInfoText: {
        fontSize: 12,
        color: '#999',
        marginBottom: 4,
    },
});
