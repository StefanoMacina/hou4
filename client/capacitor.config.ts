import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.macina.hou4',
  appName: 'hou4',
  webDir: 'www',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  }
};

export default config;
