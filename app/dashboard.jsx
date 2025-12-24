import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import BusCard from '../components/BusCard';
import { buses } from '../data/buses';

export default function DashboardScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Campus Bus Tracker</Text>

            <FlatList
                data={buses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <BusCard
                        bus={item}
                        onPress={() => router.push(`/bus/${item.id}`)}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4FAFF',
        padding: 15,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
});
