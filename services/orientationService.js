import * as ScreenOrientation from "expo-screen-orientation";

export async function portraitUp() {
    try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    } catch (error) {
        console.error("Error locking screen orientation:", error);
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        throw error; // Propagate the error to handle it in the caller
    }
}

export async function landscape() {
    try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } catch (error) {
        console.error("Error locking screen orientation:", error);
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        throw error; // Propagate the error to handle it in the caller
    }
}