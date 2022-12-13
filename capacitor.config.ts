/* eslint-disable @typescript-eslint/naming-convention */
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.davidcorona.starter',
  appName: 'sanvipop',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
    scopes: ['profile', 'email'],
    androidClientId: '507320639446-jqftlo9lqpur2kqr7bo5gmcr3l2b12qa.apps.googleusercontent.com',
    forceCodeForRefreshToken: true,
    },
  },
};

export default config;
