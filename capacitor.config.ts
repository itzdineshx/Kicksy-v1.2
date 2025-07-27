import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.8dccbb621095496d960d9227bc8cece4',
  appName: 'ticket-triumph-india-04',
  webDir: 'dist',
  server: {
    url: 'https://8dccbb62-1095-496d-960d-9227bc8cece4.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF"
    }
  }
};

export default config;