<script lang="ts">
  import FolderPicker from '$lib/components/FolderPicker.svelte';
  import PDFViewer from '$lib/components/PDFViewer.svelte';
  import CvNav from './CVNav.svelte';

  let CVs: FileList;
  let cvIndex = 0;

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Enter') return;

    const target = e.currentTarget as HTMLInputElement;
    const nextValue = target.value as unknown as number;

    if (nextValue > CVs.length || nextValue < 1) return;
    cvIndex = nextValue - 1;
  }
</script>

<h1>CV Explorer</h1>
{#if !CVs}
  <FolderPicker bind:CVs />
{:else}
  <CvNav bind:cvIndex cvCount={CVs.length - 1} />

  <div class="cv-info">
    {#key cvIndex}
      <label class="cv-indices">
        <input
          type="number"
          name="cv-index"
          value={cvIndex + 1}
          min={1}
          max={CVs.length}
          on:keydown={handleKeyDown}
        />
        /{CVs.length}
      </label>
    {/key}

    <span class="cv-file-name">
      <span class="cv-name" class:rtl={/[،-٩]+/.test(CVs[cvIndex].name)}>
        {CVs[cvIndex].name}
      </span>
      <span
        class="cv-type"
        style:--file-background-color={CVs[cvIndex].type.includes('pdf')
          ? '#ee0000'
          : CVs[cvIndex].type.includes('doc')
            ? '#0000ee'
            : null}
        style:--file-color={['pdf', 'doc'].some((extension) =>
          CVs[cvIndex].type.includes(extension)
        )
          ? 'white'
          : 'dimgray'}
      >
        {CVs[cvIndex].type}
      </span>
    </span>
  </div>

  {#key cvIndex}
    <PDFViewer file={CVs[cvIndex]} />
  {/key}
{/if}

<style>
  .cv-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 10%;

    background-color: rgba(0, 0, 0, 0.1);
  }

  .cv-indices {
    white-space: nowrap;
    margin-inline-end: 0.5rem;
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
