<script lang="ts">
  export let file: File;
  export let tags: string[] = [];

  let reader = new FileReader();
  reader.onload = function (e: ProgressEvent<FileReader>) {
    let pdfData = e.target!.result;
    let objectElem = document.createElement('object');
    objectElem.data = pdfData;
    document.body.appendChild(objectElem);
  };
</script>

<ul>
  {#each tags as tag (tag)}
    <li>{tag}</li>
  {/each}
</ul>

<div class="cv-wrapper">
  {#if file.type.includes('pdf')}
    <!-- <embed src={file.webkitRelativePath} width="80%" height="800px" type={file.type} /> -->
    <object
      data={reader.readAsDataURL(file)}
      type={file.type}
      aria-label={file.name}
      width="80%"
      height="800px"
    />
  {:else}
    <iframe srcdoc={file.stream()} title={file.name} width="80%" height="800px" />
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
