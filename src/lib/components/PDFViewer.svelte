<script lang="ts">
  import Viewer from 'svelte-pdf';

  export let file: any;
  export let tags: string[] = [];
</script>

<h1>{file}</h1>

<ul>
  {#each tags as tag (tag)}
    <li>{tag}</li>
  {/each}
</ul>

<Viewer url={file.path} data={''} />

<style>
</style>
