<script lang="ts">
  import mammoth from 'mammoth';

  export let file: File;

  async function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as ArrayBuffer);
      };

      reader.onerror = reject;

      reader.readAsArrayBuffer(file);
    });
  }

  async function convertDocxToHtml(docxFile: File): Promise<string> {
    return await mammoth
      .convertToHtml({
        arrayBuffer: await fileToArrayBuffer(docxFile),
      })
      .then((result) => result.value);
  }
</script>

<div class="cv-wrapper">
  {#if file.type === 'application/pdf'}
    <iframe
      src={URL.createObjectURL(file)}
      title={file.name}
      width="80%"
      height="800px"
    />
  {:else}
    {#await convertDocxToHtml(file)}
      <p>Loading..</p>
    {:then html}
      <iframe srcdoc={html} title={file.name} width="80%" height="800px" />
    {/await}
  {/if}
</div>

<style>
  .cv-wrapper {
    text-align: center;
    position: relative;
  }

  iframe {
    border: 1px solid black;
  }
</style>
