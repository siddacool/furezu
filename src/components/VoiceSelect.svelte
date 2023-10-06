<script lang="ts">
  import { voiceList } from '~/stores/voices';

  export let value: string = '';
</script>

{#if $voiceList.length}
  <div class="VoiceSelect">
    <label for="voice-select">Voice (for text-to-speech)</label>

    <div class="Paper">
      <select name="voice-select" id="voice-select" on:change on:focus on:blur>
        <option value="" selected={value === ''}> None </option>
        {#each $voiceList as voice}
          <option value={voice.name} selected={value === voice.name}>
            {voice.language} -
            {voice.name}
          </option>
        {/each}
      </select>
    </div>
  </div>
{/if}

<style>
  .Paper {
    background-color: var(--color-white);
    box-shadow: var(--shadow-elevation-low);
    border-radius: 4px;
    overflow: hidden;
    height: 40px;
  }

  select {
    width: 100%;
    height: 100%;
    padding: 6px 7px;
    border: 0;
    font-size: 1rem;
    outline: none;
    color: var(--color-grey-900);
    background-color: transparent;
  }

  option {
    background-color: var(--color-white);
    color: var(--color-grey-900);
  }

  label {
    font-size: 0.9rem;
    font-family: var(--font-family-main);
    display: block;
    margin-bottom: 4px;
  }
</style>
