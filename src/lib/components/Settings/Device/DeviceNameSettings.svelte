<script lang="ts">
  import ToolCard from '$lib/components/Settings/ToolCard.svelte';
  import TextInput from '$lib/components/ui-framework/Form/TextInput.svelte';
  import { useDeviceNameStore } from '$lib/stores/local-settings/device-name.svelte';

  function oninput(e: Event) {
    const target = e.target as HTMLInputElement;

    useDeviceNameStore.updateDeviceName(target.value);
  }
</script>

<ToolCard>
  <div>
    <TextInput
      name="device-name"
      value={useDeviceNameStore.deviceName}
      {oninput}
      placeholder="e.g. MY_COMPUTER, PHONE etc."
      label="Device name"
    />

    <p>* Useful for Syncing data</p>
  </div>
</ToolCard>

<style lang="scss">
  p {
    margin-bottom: 0;
    margin-top: 8px;
  }
</style>
