<script lang="ts">
  export let CVs: FileList;

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
    webkitdirectory
    on:change={handleFileChange}
  />
</div>

<style>
</style>
