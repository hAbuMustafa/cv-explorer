<script lang="ts">
  import PDFViewer from '$lib/components/PDFViewer.svelte';
  
  export let data;
</script>

<h1>CV Explorer</h1>

<PDFViewer file={data.CVs[0]} />
