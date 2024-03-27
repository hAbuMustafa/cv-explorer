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
    data-type={data.CVs[cvIndex].fileExtension}
    style:--file-background-color={data.CVs[cvIndex].fileExtension === 'pdf'
      ? '#ee0000'
      : data.CVs[cvIndex].fileExtension.includes('doc')
        ? '#0000ee'
        : null}
    style:--file-color={['pdf', 'doc'].some((extension) =>
      data.CVs[cvIndex].fileExtension.includes(extension)
    )
      ? 'white'
      : 'dimgray'}
  >
    <h3 class:rtl={/[،-٩]+/.test(data.CVs[cvIndex].fileName)}>
      {data.CVs[cvIndex].fileName}
    </h3>
  </li>
  <li>
    <button
      type="button"
      title="Next CV"
      on:click={() => nextCV()}
      disabled={cvIndex === data.CVs.length - 1}
    >
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
  }
</style>
