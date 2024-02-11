import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function Home({ navigation }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authenticateWithFingerprint = async () => {
        try {
            const supported = await LocalAuthentication.hasHardwareAsync() && await LocalAuthentication.isEnrolledAsync();
            if (supported) {
                const result = await LocalAuthentication.authenticateAsync({
                    promptMessage: 'Authenticate with your fingerprint',
                });
                if (result.success) {
                    // Fingerprint authentication successful
                    setIsAuthenticated(true);
                    navigation.navigate('listing');
                } else {
                    // Fingerprint authentication failed
                    Alert.alert('Authentication failed');
                }
            } else {
                // Fingerprint authentication not supported
                navigation.navigate('listing');
                Alert.alert('Fingerprint authentication not supported');
            }
        } catch (error) {
            console.error('Error authenticating with fingerprint:', error);
            Alert.alert('Error authenticating with fingerprint');
        }
    };

    return (
        <View style={styles.container}>
            <Text>Home Page</Text>
            <Button title="Authenticate" onPress={authenticateWithFingerprint} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
