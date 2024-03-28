<script lang="ts">
  import type { CvT } from '$lib/types';

  export let file: CvT;
  export let tags: string[] = [];
</script>

<ul>
  {#each tags as tag (tag)}
    <li>{tag}</li>
  {/each}
</ul>

<div
  class="cv-wrapper"
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
  {#if file.fileExtension === 'pdf'}
    <embed src={file.path} width="80%" height="800px" type="application/pdf" />
  {:else}
    <iframe srcdoc={file.content} title={file.fileName} width="80%" height="800px" />
  {/if}
</div>

<style>
  li {
    list-style: none;
  }

  .cv-wrapper {
    text-align: center;
    position: relative;
  }

  .cv-wrapper::after {
    content: attr(data-type);
    background-color: var(--file-background-color, lightgray);
    color: var(--file-color, dimgray);

    padding: 0.25em 0.5em;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 700;

    position: absolute;
    right: 10%;
    top:calc(-1rem - .5em);
  }

  iframe,
  embed {
    border: 1px solid black;
  }
</style>
