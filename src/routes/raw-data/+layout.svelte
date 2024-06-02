<script>
  import "../../app.css";
  import RootHeader from "../../components/RootHeader.svelte";
  let y;
  let innerHeight = 0;
  let innerWidth = 0;
</script>

<div
  class="container relative flex flex-col max-w-[1400px] mx-auto w-full text-sm sm:text-base min-h-screen"
>
  <RootHeader {y} {innerHeight}/>
  <slot></slot>
</div>
<svelte:window bind:scrollY={y} bind:innerHeight bind:innerWidth />