<script lang="ts">
  import PDFViewer from '$lib/components/PDFViewer.svelte';
  import CvNav from './CVNav.svelte';
  

  export let data;
  let cvIndex = 0;

  
</script>

<h1>CV Explorer</h1>

<CvNav file={data.CVs[cvIndex]} bind:cvIndex={cvIndex} cvCount={data.CVs.length-1} />

{#key cvIndex}
  <PDFViewer file={data.CVs[cvIndex]} />
{/key}


