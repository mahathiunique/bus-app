import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { buses } from '../../data/buses';
import StatCard from '../../components/StatCard';

export default function BusDetailScreen() {
  const { id } = useLocalSearchParams();
  const bus = buses.find((b) => b.id === Number(id));

  if (!bus) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{bus.number}</Text>
      <Text style={styles.subtitle}>{bus.location}</Text>

      <View style={styles.statsRow}>
        <StatCard label="Seats Available" value={`${bus.seats}/45`} />
        <StatCard label="Fuel Remaining" value={bus.fuel} unit="%" />
        <StatCard label="Current Speed" value={bus.speed} unit="km/h" />
        <StatCard label="Status" value={bus.status} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FAFF',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#666',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
