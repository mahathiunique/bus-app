import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BusCard from '../../components/BusCard';
import { buses } from '../../data/buses';

export default function AllBusesScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState(null);

    // Filter buses based on search and status
    const filteredBuses = buses.filter((bus) => {
        const matchesSearch = bus.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bus.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bus.route.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus ? bus.status === filterStatus : true;
        return matchesSearch && matchesStatus;
    });

    const statusCounts = {
        all: buses.length,
        running: buses.filter(b => b.status === 'Running').length,
        stopped: buses.filter(b => b.status === 'Stopped').length,
        inService: buses.filter(b => b.status === 'In Service').length,
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by bus number, driver, or route..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                        <Ionicons name="close-circle" size={20} color="#999" />
                    </TouchableOpacity>
                )}
            </View>

            {/* Status Filter */}
            <View style={styles.filterContainer}>
                <TouchableOpacity
                    style={[styles.filterButton, filterStatus === null && styles.filterButtonActive]}
                    onPress={() => setFilterStatus(null)}
                >
                    <Text style={[styles.filterText, filterStatus === null && styles.filterTextActive]}>
                        All ({statusCounts.all})
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filterStatus === 'Running' && styles.filterButtonActive]}
                    onPress={() => setFilterStatus('Running')}
                >
                    <Text style={[styles.filterText, filterStatus === 'Running' && styles.filterTextActive]}>
                        Running ({statusCounts.running})
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filterStatus === 'Stopped' && styles.filterButtonActive]}
                    onPress={() => setFilterStatus('Stopped')}
                >
                    <Text style={[styles.filterText, filterStatus === 'Stopped' && styles.filterTextActive]}>
                        Stopped ({statusCounts.stopped})
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Bus List */}
            <FlatList
                data={filteredBuses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <BusCard
                        bus={item}
                        onPress={() => router.push(`/bus/${item.id}`)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="bus-outline" size={64} color="#ccc" />
                        <Text style={styles.emptyText}>No buses found</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFCF5',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 15,
        marginBottom: 10,
        padding: 12,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    filterContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        marginBottom: 10,
        gap: 8,
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    filterButtonActive: {
        backgroundColor: '#FFB800',
        borderColor: '#FFB800',
    },
    filterText: {
        fontSize: 13,
        color: '#666',
        fontWeight: '600',
    },
    filterTextActive: {
        color: '#000',
    },
    listContent: {
        padding: 15,
        paddingTop: 5,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: '#999',
    },
});
