import * as LocalAuthentication from 'expo-local-authentication';


export default async function isBioMetricAvailable() {
    const supported = await Promise.all([
        LocalAuthentication.hasHardwareAsync(),
        LocalAuthentication.isEnrolledAsync()
    ])
    return !supported.includes(false)
}
