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

<ul>
  {#each tags as tag (tag)}
    <li>{tag}</li>
  {/each}
</ul>

<svelte:component
  this={Viewer}
  url={file.path}
  flipTime={0}
  showButtons={[
    'navigation',
    'zoom',
    'print',
    'download',
    'autoflip',
    'timeInfo',
    'pageInfo',
  ]}
/>

<style>
  li {
    list-style: none;
  }
</style>
