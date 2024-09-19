<script lang="ts">
  import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill';
  import './styles/index.scss';
  import DebugTools from './DebugTools';
  import ThemeSetter from './ThemeSetter.svelte';

  polyfillCountryFlagEmojis();
</script>

<DebugTools />
<ThemeSetter />
