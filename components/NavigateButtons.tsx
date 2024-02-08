import { Button, View } from "react-native"
import Vif from "./Vif"

const SCREENS = ["home", "listing", "render"]

// this is made for learning and project setup only
// TODO: remove this when the app is done
export default function NavigateButtons({ go, t }: any) {
    const next = SCREENS.indexOf(t.toLowerCase()) + 1
    const prev = SCREENS.indexOf(t.toLowerCase()) - 1
 
    return (<View style={{ flexDirection: "row" }}>
        <Vif c={prev >= 0}>
            <View style={{ marginRight: 10 }}>
                <Button
                    onPress={() => go(SCREENS[prev])}
                    title="Back"
                    color="#000"
                />
            </View>
        </Vif>
        <Vif c={next < SCREENS.length}>
            <View >
                <Button
                    onPress={() => go(SCREENS[next])}
                    title="Next"
                    color="#000"
                />
            </View>
        </Vif>
    </View>)
}