import { useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Signup() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <TextInput style={styles.input} placeholder="Name" />
            <TextInput style={styles.input} placeholder="Email / Phone" />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry />

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace('/')}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
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
        fontSize: 26,
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
        borderWidth: 1,
        borderColor: '#000',
    },
    buttonText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
