<script>
  import "../../app.css";
  import RootHeader from "../../components/RootHeader.svelte";
</script>

<RootHeader />

<div
  class="flex flex-col justify-center items-center w-full text-white bg-dark"
>
  <slot />
</div>
