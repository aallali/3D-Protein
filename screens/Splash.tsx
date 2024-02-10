import React, { useEffect } from 'react';
import { ImageBackground, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function Splash({
    goHomeScreen,
    setBiometric
}: {
    goHomeScreen: React.Dispatch<React.SetStateAction<boolean>>;
    setBiometric: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    useEffect(() => {
        const biometricSupport = async () => {
            const supported = await LocalAuthentication.hasHardwareAsync() && await LocalAuthentication.isEnrolledAsync();
            setBiometric(supported)
        }
        biometricSupport()
        setTimeout(() => {
            goHomeScreen(true)
        }, 2000)
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                style={{
                    flex: 1,
                    backgroundColor: "black",
                }}
                source={require("../assets/splash.png")}
                resizeMode="contain"
            />
        </View>
    );
}
