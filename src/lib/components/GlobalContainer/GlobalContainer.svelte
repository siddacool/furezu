<script lang="ts">
  import type { SvelteComponentProps } from '$lib/types/svelte-component';
  import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
  import './styles/index.scss';
  import DebugTools from './DebugTools';
  import ThemeSetter from './ThemeSetter.svelte';

  polyfillCountryFlagEmojis();
</script>

<DebugTools />
<ThemeSetter />
