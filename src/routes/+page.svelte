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
    <button type="button" on:click={() => nextCV(-1)}>
      <LeftArrow size="2rem" />
    </button>
  </li>
  <li>
    <button type="button" on:click={() => nextCV()}>
      <RightArrow size="2rem" />
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
  }

  li {
    list-style: none;
  }

  li button {
    background: none;
    border: none;
  }
</style>
