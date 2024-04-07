<script lang="ts">
  export let CVs: FileList;
  let fileInput: HTMLInputElement;

  function handleFileChange(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (!files) {
      alert(
        "The specified folder doesn't contain any valid Resume files. Please, make sure that the folder contains PDFs and DOCXs."
      );
      return;
    }
    CVs = files;
    console.log(CVs);
  }
</script>

<div class="wrapper">
  <h2>Please pick a folder to preview CVs</h2>
  <input
    type="file"
    name="folder-picker"
    id="folder-picker"
    style="display: none;"
    webkitdirectory
    on:change={handleFileChange}
    bind:this={fileInput}
  />
  <button type="button" on:click={() => fileInput.click()}>Browse for Folder..</button>
</div>

<style>
</style>
