import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.flicks.movies',
  appName: 'Flicks',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  }
};

export default config;
