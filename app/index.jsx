import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Campus Bus Tracker</Text>

            <TextInput style={styles.input} placeholder="Email / Phone" />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry />

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace('/(tabs)')}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text style={styles.link} onPress={() => router.push('/signup')}>
                Don't have an account? Sign Up
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFCF5',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    button: {
        backgroundColor: '#FFB800',
        padding: 15,
        borderRadius: 12,
    },
    buttonText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    link: {
        marginTop: 20,
        textAlign: 'center',
        color: '#007AFF',
    },
});
