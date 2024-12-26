<script lang="ts">
  import { onMount } from 'svelte';
  import { useDropzone } from 'react-dropzone';

  let files: File[] = [];
  let message: string = '';

  function handleDrop(acceptedFiles: File[]) {
    files = acceptedFiles;
    message = `${files.length} file(s) uploaded successfully.`;
    readFiles(files);
  }

  function readFiles(files: File[]) {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        console.log(event.target?.result);
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
      reader.readAsText(file);
    });
  }

  onMount(() => {
    const dropzone = useDropzone({
      onDrop: handleDrop,
      accept: '.csv, .json, .jsonl',
      multiple: true
    });

    return () => {
      dropzone.getRootProps().ref.current = null;
    };
  });
</script>

<style>
  .dropzone {
    border: 2px dashed #007bff;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
  }
  .dropzone.drag-active {
    border-color: #28a745;
  }
</style>

<div class="dropzone" on:drop={handleDrop}>
  <p>Drag and drop files here, or click to select files</p>
  {#if message}
    <p>{message}</p>
  {/if}
</div>
