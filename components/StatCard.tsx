import { View, Text, StyleSheet } from 'react-native';

export default function StatCard({ label, value, unit }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>
        {value} {unit}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    width: '48%',
    marginBottom: 12,
    elevation: 3,
  },
  label: {
    color: '#666',
    marginBottom: 6,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
