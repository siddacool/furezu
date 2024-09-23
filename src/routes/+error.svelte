<script lang="ts">
  import { page } from '$app/stores';
  import BackButton from '$lib/components/BackButton.svelte';
  import Box from '$lib/components/Box.svelte';
  import ThickPlaceholderText from '$lib/components/ThickPlaceholderText.svelte';
</script>

<Box>
  <ThickPlaceholderText>
    {$page?.error?.message}, Go Back <BackButton backTo="/" title="back" />
  </ThickPlaceholderText>
</Box>
