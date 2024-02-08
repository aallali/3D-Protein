import React, { useEffect } from 'react';
import { ImageBackground, View } from 'react-native';

export default function Splash({
    goHomeScreen,
  }: {
    goHomeScreen: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    useEffect(() => {
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
