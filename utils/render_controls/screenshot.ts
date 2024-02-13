import * as Sharing from 'expo-sharing'; // Import the library


export default async function screenshotMolecule(glViewRef: any) {
    // Create a data URL from the base64 string
    const screenshotURI = await glViewRef.current.capture();
    await Sharing.shareAsync(screenshotURI, {
        mimeType: 'image/jpg',
        dialogTitle: 'Share this protein :)', // Optional, you can customize the dialog title
    });
}
