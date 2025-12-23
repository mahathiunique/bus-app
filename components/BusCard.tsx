import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BusCard({ bus, onPress }: any) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.title}>{bus.number}</Text>
        <Text
          style={{
            color: bus.status === 'Running' ? 'green' : 'red',
            fontWeight: 'bold',
          }}
        >
          {bus.status}
        </Text>
      </View>

      <Text>Seats: {bus.seats}/45</Text>
      <Text>Location: {bus.location}</Text>
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
});
