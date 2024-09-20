<script lang="ts">
  import Icon from '@iconify/svelte';
  import AnchorButton from './ui-framework/Form/AnchorButton.svelte';

  interface BackButtonProps {
    backTo: string;
    title?: string;
    class?: string;
  }

  const { backTo, title, class: className = '' }: BackButtonProps = $props();
</script>

<AnchorButton compact href={backTo} {title} class={className}>
  <Icon icon="material-symbols:arrow-back-rounded" />
</AnchorButton>
