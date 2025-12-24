import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
    const router = useRouter();
    const [selectedRole, setSelectedRole] = useState('student');

    const roles = [
        { id: 'admin', label: 'Admin', icon: 'shield' },
        { id: 'driver', label: 'Driver', icon: 'car' },
        { id: 'student', label: 'Student', icon: 'school' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Campus Bus Tracker</Text>
                <Text style={styles.subtitle}>Select your role to continue</Text>

                {/* Role Selection */}
                <View style={styles.roleContainer}>
                    {roles.map((role) => (
                        <TouchableOpacity
                            key={role.id}
                            style={[
                                styles.roleButton,
                                selectedRole === role.id && styles.roleButtonActive
                            ]}
                            onPress={() => setSelectedRole(role.id)}
                        >
                            <Ionicons
                                name={role.icon}
                                size={24}
                                color={selectedRole === role.id ? '#000' : '#666'}
                            />
                            <Text style={[
                                styles.roleText,
                                selectedRole === role.id && styles.roleTextActive
                            ]}>
                                {role.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Login Form */}
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email / Phone"
                        placeholderTextColor="#999"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        placeholderTextColor="#999"
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.replace('/(tabs)')}
                    >
                        <Text style={styles.buttonText}>
                            Login as {roles.find(r => r.id === selectedRole)?.label}
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.link} onPress={() => router.push('/signup')}>
                    Don't have an account? Sign Up
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFCF5',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        gap: 10,
    },
    roleButton: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#e0e0e0',
    },
    roleButtonActive: {
        borderColor: '#FFB800',
        backgroundColor: '#FFF8E6',
    },
    roleText: {
        marginTop: 8,
        fontSize: 13,
        fontWeight: '600',
        color: '#666',
    },
    roleTextActive: {
        color: '#000',
    },
    formContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#FFB800',
        padding: 16,
        borderRadius: 12,
    },
    buttonText: {
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    link: {
        textAlign: 'center',
        color: '#666',
    },
});
