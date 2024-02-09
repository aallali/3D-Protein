
import { Text } from 'react-native';
//@ts-ignore
import OrientationLoadingOverlay from "react-native-orientation-loading-overlay";


export default function IsReadyPDB({ children, ligand, loader, loadError }: any) {

    if (!loader) {
        if (loadError)
            return <Text>Cant Load ligand ({ligand}) , reason: {loadError}</Text>;

        return children;
    }
    else
        return <OrientationLoadingOverlay
            visible={loader}
            color="white"
            indicatorSize="large"
            messageFontSize={24}
            message="Loading..." />;
}
