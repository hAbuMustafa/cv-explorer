<script lang="ts">
  import RightArrow from 'svelte-material-icons/ArrowRightCircleOutline.svelte';
  import LeftArrow from 'svelte-material-icons/ArrowLeftCircleOutline.svelte';

  export let cvIndex = 0;
  export let cvCount: number;

  function nextCV(step: number = 1) {
    if ((step < 0 && cvIndex === 0) || (step > 0 && cvIndex === cvCount)) return;

    cvIndex = cvIndex + step;
  }
</script>

<ul>
  <li>
    <button
      type="button"
      title="Previous CV"
      on:click={() => nextCV(-1)}
      disabled={cvIndex === 0}
    >
      <LeftArrow size="1.5rem" />
      <span>Prev. CV</span>
    </button>
  </li>

  <li>
    <button
      type="button"
      title="Next CV"
      on:click={() => nextCV()}
      disabled={cvIndex === cvCount}
    >
      <RightArrow size="1.5rem" />
      <span>Next CV</span>
    </button>
  </li>
</ul>

<style>
  ul {
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 10%;
    margin-block-end: 0;
  }

  li {
    list-style: none;
  }

  li button {
    background: none;
    border: none;
    display: flex;
    padding: 0.5rem;
    flex-direction: column;
    align-items: center;
    color: teal;
    font-weight: 750;
    text-shadow: 0 0 0.25rem gray;
    cursor: pointer;
  }

  li button :global(svg) {
    transition: all 0.2s ease-in-out;
    filter: drop-shadow(0 0 0.1rem gray);
  }

  li button:not(:disabled):hover :global(svg) {
    filter: drop-shadow(0 0 0.5rem gray);
    scale: 1.2;
  }

  li button:hover {
    background-color: hsla(180, 100%, 25%, 30%);
    border-radius: 0.25rem;
  }

  li button:disabled {
    color: gray;
    text-shadow: none;
    cursor: default;
    opacity: 0.5;
  }
</style>
