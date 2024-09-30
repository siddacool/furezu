<script lang="ts">
  import ToolCard from '$lib/components/Settings/ToolCard.svelte';
  import Button from '$lib/components/ui-framework/Form/Button.svelte';
  import { useDeveloperModeStore } from '$lib/stores/local-settings/developer-mode.svelte';

  function onclick() {
    useDeveloperModeStore.updateDeveloperMode(!useDeveloperModeStore.developerMode);
  }
</script>

<ToolCard>
  <div>
    <h3>Developer mode</h3>
    <p>enable options like book download, duplicate etc.</p>
    <Button variant={useDeveloperModeStore.developerMode ? 'default' : 'primary'} {onclick}>
      {#if useDeveloperModeStore.developerMode}
        Disable
      {:else}
        Enable
      {/if}
    </Button>
  </div>
</ToolCard>

<style lang="scss">
  p {
    margin-bottom: 8px;
    margin-top: 8px;
  }
</style>
