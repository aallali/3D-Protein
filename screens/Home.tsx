import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function Home({ navigation }: any) {

    const authenticateWithFingerprint = async () => {
        try {
            // check if an authentication system is enable in this device
            const supported = await Promise.all([
                LocalAuthentication.hasHardwareAsync(),
                LocalAuthentication.isEnrolledAsync()
            ])

            if (supported) {
                const result = await LocalAuthentication.authenticateAsync({
                    promptMessage: 'Authenticate with your fingerprint',
                });
                if (result.success) {
                    // Fingerprint authentication successful
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
            <Text style={styles.message}>
                Please authenticate yourself in order to use the application.
                Thank you
            </Text>
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
    message: {
        fontSize: 25,
        marginHorizontal: 10,
        marginBottom: 20,
        textAlign: 'center',
        // fontWeight: 'bold'
    }
});
