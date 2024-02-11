import React, { useEffect } from 'react';
import { ImageBackground, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function Splash({
    goHomeScreen,
    setBiometricSupport,
  }: {
    goHomeScreen: React.Dispatch<React.SetStateAction<boolean>>;
    setBiometricSupport: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    useEffect(() => {
        const biometricSupport = async ()=>{
            const supported = await LocalAuthentication.hasHardwareAsync() && await LocalAuthentication.isEnrolledAsync();
            setBiometricSupport(supported)
            console.log('biometric suppor', supported)
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
