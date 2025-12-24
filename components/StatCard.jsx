import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function StatCard({ label, value, unit, icon, color = '#0ABAB5' }) {
    return (
        <View style={styles.card}>
            {icon && (
                <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
                    <Ionicons name={icon} size={24} color={color} />
                </View>
            )}
            <Text style={styles.label}>{label}</Text>
            <Text style={[styles.value, { color }]}>
                {value}{unit ? ` ${unit}` : ''}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        width: '48%',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    label: {
        color: '#666',
        marginBottom: 6,
        fontSize: 13,
    },
    value: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
