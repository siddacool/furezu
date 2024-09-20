<script lang="ts">
  import Card from '$lib/components/ui-framework/Layout/Card.svelte';
  import Controls from './Controls.svelte';
  import type { SvelteComponentProps } from '$lib/types/svelte-component';

  interface EditCardFormProps extends SvelteComponentProps {
    disableSubmit?: boolean;
    hideDeleteButton?: boolean;
    onsubmit?: (e: SubmitEvent) => void;
    onCancel?: () => void;
    onDelete?: () => void;
    title: string;
  }

  const {
    children,
    onsubmit,
    onCancel,
    onDelete,
    disableSubmit,
    hideDeleteButton,
    title,
  }: EditCardFormProps = $props();
</script>

<form {onsubmit}>
  <Card>
    <h3>{title}</h3>
    {#if children}
      {@render children()}
    {/if}
    <Controls {disableSubmit} {hideDeleteButton} {onCancel} {onDelete} />
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

  h3 {
    font-weight: 600;
    width: 100%;
    overflow: hidden;
    margin-top: 0;
    margin-bottom: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 1.1rem;
    margin-bottom: 16px;

    @include mediaLg {
      font-size: 1.2rem;
    }
  }
</style>
