import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cl.cadet',
  appName: 'Cadet App',
  webDir: 'www.cadet.cl',
  plugins: {
    SplashScreen: {
        launchShowDuration: 2000,
        backgroundColor: "fff",
        showSpinner: false,
        androidSpinnerStyle: "small",
        iosSpinnerStyle: "small",
        splashFullScreen: true,
        splashImmersive:true
    }
    
  }
}
;

export default config;