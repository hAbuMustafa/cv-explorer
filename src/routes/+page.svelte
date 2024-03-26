<script lang="ts">
  import PDFViewer from '$lib/components/PDFViewer.svelte';
  import RightArrow from 'svelte-material-icons/ArrowRightCircleOutline.svelte';
  import LeftArrow from 'svelte-material-icons/ArrowLeftCircleOutline.svelte';

  export let data;
  let cvIndex = 0;

  function nextCV(step: number = 1) {
    if (data.CVs[cvIndex + step] !== undefined) {
      cvIndex = cvIndex + step;
    }
  }
</script>

<h1>CV Explorer</h1>

<ul>
  <li>
    <button type="button" title="Previous CV" on:click={() => nextCV(-1)}>
      <LeftArrow size="1.5rem" />
      <span>Prev. CV</span>
    </button>
  </li>
  <li>
    <button type="button" title="Next CV" on:click={() => nextCV()}>
      <RightArrow size="1.5rem" />
      <span>Next CV</span>
    </button>
  </li>
</ul>

{#key cvIndex}
  <PDFViewer file={data.CVs[cvIndex]} />
{/key}

<style>
  ul {
    display: flex;
    justify-content: space-around;
    padding: 0;
  }

  li {
    list-style: none;
  }

  li button {
    background: none;
    border: none;
    display: flex;
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

  li button:hover :global(svg) {
    filter: drop-shadow(0 0 0.5rem gray);
    scale: 1.2;
  }
</style>
