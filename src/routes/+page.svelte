<script lang="ts">
  import PDFViewer from '$lib/components/PDFViewer.svelte';
  import CvNav from './CVNav.svelte';

  export let data;
  let cvIndex = 0;

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Enter') return;

    const target = e.currentTarget as HTMLInputElement;
    const nextValue = parseInt(target.value);

    if (nextValue > data.CVs.length || nextValue < 1) return;
    cvIndex = nextValue - 1;
  }
</script>

<h1>CV Explorer</h1>

<CvNav bind:cvIndex cvCount={data.CVs.length - 1} />

<div class="cv-info">
  {#key cvIndex}
    <label>
      <input
        type="number"
        name="cv-index"
        value={cvIndex + 1}
        min={1}
        max={data.CVs.length}
        on:keydown={handleKeyDown}
      />
      /{data.CVs.length}
    </label>
  {/key}

  <span class="cv-file-name">
    <span class="cv-name" class:rtl={/[،-٩]+/.test(data.CVs[cvIndex].fileName)}>
      {data.CVs[cvIndex].fileName}
    </span>
    <span
      class="cv-type"
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
      {data.CVs[cvIndex].fileExtension}
    </span>
  </span>
</div>

{#key cvIndex}
  <PDFViewer file={data.CVs[cvIndex]} />
{/key}

<style>
  .cv-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 10%;

    background-color: rgba(0, 0, 0, 0.1);
  }

  .cv-file-name {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  [name='cv-index'] {
    width: 4ch;
    text-align: end;
  }

  .cv-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .cv-type {
    background-color: var(--file-background-color, lightgray);
    color: var(--file-color, dimgray);

    padding: 0.25em 0.5em;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 700;
  }
</style>
