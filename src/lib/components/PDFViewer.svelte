<script lang="ts">
  import { onMount } from 'svelte';

  let Viewer: any;

  onMount(async () => {
    const viewer = await import('svelte-pdf');
    Viewer = viewer.default;
  });

  export let file: any;
  export let tags: string[] = [];
</script>

<h1>{file}</h1>

<ul>
  {#each tags as tag (tag)}
    <li>{tag}</li>
  {/each}
</ul>

<svelte:component this={Viewer} url={file.path}/>

<style>
  li {
    list-style: none;
  }
</style>
