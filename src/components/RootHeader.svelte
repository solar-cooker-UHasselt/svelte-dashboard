<script>
  export let y;
  let tabs = [
    { name: "Portfolio", link: "/main" },
    { name: "Data Visualisation", link: "/raw-data" },
  ];
  import DropdownMenu from "./DropdownMenu.svelte";
</script>

<header
  class={"sticky z-[10] top-0 duration-200 px-6 flex items-center justify-between border border-solid " +
    (y > 0
      ? " py-4 bg-slate-950 border-violet-950"
      : "py-6 bg-transparent border-white")}
>
  <h1 class="font-medium cursor-pointer">
    <a href="/"><b class="font-bold poppins">Main</b> Menu</a>
  </h1>
  <div class="gap-4 items-center pr-4 ml-auto sm:flex">
    {#each tabs as tab, index}
      <a href={tab.link} class="duration-200 hover:text-violet-400">
        <p>{tab.name}</p>
      </a>
    {/each}
  </div>
  <DropdownMenu />
</header>
