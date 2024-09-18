<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
  import './styles/index.scss';
  import DebugTools from './DebugTools';

  polyfillCountryFlagEmojis();

  type GlobalStylesProps = SvelteComponentProps;

  const { children }: GlobalStylesProps = $props();
</script>

{#if children}
  {@render children()}
{/if}

<DebugTools />
