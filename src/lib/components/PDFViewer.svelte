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

<div class="cv-wrapper">
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

  iframe,
  embed {
    border: 1px solid black;
  }
</style>
