import { getLocalSettings, updateLocalSettings } from './local-settings-manager';

const localSettings = getLocalSettings();

function createDeviceNameStore() {
  let deviceName: string | undefined = $state(localSettings.deviceName);

  return {
    get deviceName() {
      return deviceName;
    },
    updateDeviceName: (value: string) => {
      deviceName = value.trim();

      updateLocalSettings({ deviceName: value });
    },
  };
}

export const useDeviceNameStore = createDeviceNameStore();
