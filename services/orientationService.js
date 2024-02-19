import * as ScreenOrientation from "expo-screen-orientation";

export async function portraitUp() {
    await ScreenOrientation.unlockAsync();
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
}

export async function landscape() {
    await ScreenOrientation.unlockAsync();
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
}
