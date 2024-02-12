import React, { useEffect } from 'react';
import { ImageBackground, View } from 'react-native';
import isBioMetricAvailable from '../utils/bioMetricSupport';


export default function Splash({
    goHomeScreen,
    setBiometricSupport,
}: {
    goHomeScreen: React.Dispatch<React.SetStateAction<boolean>>;
    setBiometricSupport: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    useEffect(() => {
        isBioMetricAvailable().then((yes) => {
            setBiometricSupport(yes)
        }).finally(() => {
            setTimeout(() => {
                goHomeScreen(true)
            }, 2000)
        })
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
