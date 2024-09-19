<script lang="ts">
  import type { Book } from '$lib/stores/books/types';
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import { Stack } from '$lib/components/ui-framework/Layout/Stack';
  import Controls from './Controls.svelte';
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  interface EditCardFormProps extends SvelteComponentProps {
    disableSubmit?: boolean;
    hideDeleteButton?: boolean;
    onsubmit?: (e: SubmitEvent) => void;
    onCancel?: () => void;
    onDelete?: () => void;
  }

  const { children, onsubmit, disableSubmit, hideDeleteButton }: EditCardFormProps = $props();
</script>

<form {onsubmit}>
  <Card>
    {#if children}
      {@render children()}
    {/if}
    <Stack space={3}>
      <Controls {disableSubmit} {hideDeleteButton} />
    </Stack>
  </Card>
</form>

<style lang="scss">
  @import '$lib/components/GlobalContainer/styles/mixins/media.scss';

  form {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-bottom: 16px;

    :global(.Card) {
      width: 100%;
    }
  }
</style>
