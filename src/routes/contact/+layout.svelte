<script>
  import RootHeader from "../../components/RootHeader.svelte";
  let y;
</script>

<RootHeader {y} />
<slot></slot>
<svelte:window bind:scrollY={y} />
