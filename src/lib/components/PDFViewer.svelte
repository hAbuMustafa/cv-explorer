<script lang="ts">
  import { page } from '$app/stores';

  export let file: any;
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
    <iframe
      title={`CV ${file.fileName}`}
      src="https://docs.google.com/gview?url={$page.url.href +
        file.path.replace('/src', 'src')}&embedded=true"
      style="height:800px; width:100%;"
      frameborder="0"
    />
  {/if}
</div>

<style>
  li {
    list-style: none;
  }

  .cv-wrapper {
    text-align: center;
  }
</style>
