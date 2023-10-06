<script lang="ts">
  import Icon from '@iconify/svelte';

  import Button from './Button.svelte';
  import { voiceList } from '~/stores/voices';
  import { get } from 'svelte/store';

  export let voice: string | undefined;
  export let translation: string | undefined;

  let speaking = false;

  function speak(event: Event) {
    event.preventDefault();

    if (!('speechSynthesis' in window)) {
      console.log(`Sorry, your browser doesn't support text to speech!`);

      return;
    }

    if (!voice || !translation) {
      console.log('Missing: voice/translation');

      return;
    }

    const voiceItem = get(voiceList).find((v) => v.name === voice);

    if (!voiceItem) {
      console.log('No voice found');

      return;
    }

    const sayIt = new SpeechSynthesisUtterance();

    sayIt.text = translation;
    sayIt.voice = voiceItem.model;

    window.speechSynthesis.speak(sayIt);

    sayIt.onstart = () => {
      speaking = true;
    };

    sayIt.onend = () => {
      speaking = false;
    };
  }

  function stopSeaking(event: Event) {
    event.preventDefault();

    window.speechSynthesis.cancel();

    speaking = false;
  }
</script>

{#if voice && translation}
  {#if speaking}
    <Button variant="solid" on:click={stopSeaking}>
      <Icon icon="material-symbols:stop-circle-rounded" slot="before" />Stop
    </Button>
  {:else}
    <Button variant="solid" on:click={speak}>
      <Icon icon="mingcute:voice-line" slot="before" />Speak
    </Button>
  {/if}
{/if}
