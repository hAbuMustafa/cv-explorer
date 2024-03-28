<script lang="ts">
  import type { CvT } from '$lib/types';
  import RightArrow from 'svelte-material-icons/ArrowRightCircleOutline.svelte';
  import LeftArrow from 'svelte-material-icons/ArrowLeftCircleOutline.svelte';

  export let file: CvT;
  export let cvIndex = 0;
  export let cvCount: number;

  function nextCV(step: number = 1) {
    if ((step < 0 && cvIndex === 0) || (step > 0 && cvIndex === cvCount)) return;

    cvIndex = cvIndex + step;
  }
</script>

<ul>
  <li>
    <button
      type="button"
      title="Previous CV"
      on:click={() => nextCV(-1)}
      disabled={cvIndex === 0}
    >
      <LeftArrow size="1.5rem" />
      <span>Prev. CV</span>
    </button>
  </li>
  <li
    class="file-info"
    data-type={file.fileExtension}
    style:--file-background-color={file.fileExtension === 'pdf'
      ? '#ee0000'
      : file.fileExtension.includes('doc')
        ? '#0000ee'
        : null}
    style:--file-color={['pdf', 'doc'].some((extension) =>
      file.fileExtension.includes(extension)
    )
      ? 'white'
      : 'dimgray'}
  >
    <h3 class:rtl={/[،-٩]+/.test(file.fileName)}>
      {file.fileName}
    </h3>
  </li>
  <li>
    <label>
      <input type="number" name="cv-index" bind:value={cvIndex} min={0} max={cvCount} />
      /{cvCount}
    </label>
  </li>
  <li>
    <button
      type="button"
      title="Next CV"
      on:click={() => nextCV()}
      disabled={cvIndex === cvCount}
    >
      <RightArrow size="1.5rem" />
      <span>Next CV</span>
    </button>
  </li>
</ul>

<style>
  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0;
  }

  li {
    list-style: none;
  }

  li.file-info {
    position: relative;
  }

  li.file-info::after {
    content: attr(data-type);
    background-color: var(--file-background-color, lightgray);
    color: var(--file-color, dimgray);

    padding: 0.25em 0.5em;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 700;

    position: absolute;
    left: calc(100% + 0.5rem);
    top: 30%;
  }

  li.file-info h3 {
    width: 300px;
    min-width: 40%;
    max-width: 100%;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  li button {
    background: none;
    border: none;
    display: flex;
    padding: 0.5rem;
    flex-direction: column;
    align-items: center;
    color: teal;
    font-weight: 750;
    text-shadow: 0 0 0.25rem gray;
    cursor: pointer;
  }

  li button :global(svg) {
    transition: all 0.2s ease-in-out;
    filter: drop-shadow(0 0 0.1rem gray);
  }

  li button:not(:disabled):hover :global(svg) {
    filter: drop-shadow(0 0 0.5rem gray);
    scale: 1.2;
  }

  li button:hover {
    background-color: hsla(180, 100%, 25%, 30%);
    border-radius: 0.25rem;
  }

  li button:disabled {
    color: gray;
    text-shadow: none;
    cursor: default;
    opacity: 0.5;
  }

  [name='cv-index'] {
    width: 4ch;
    text-align: end;
  }
</style>
