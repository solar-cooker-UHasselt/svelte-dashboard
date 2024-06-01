<script>
  export let y;
  let tabs = [
    { name: "Projects", link: "#projects" },
    { name: "About me", link: "#about" },
  ];
</script>

<header
  class={"sticky z-[10] top-0 duration-200 px-6 flex items-center justify-between border border-solid " +
    (y > 0
      ? " py-4 bg-slate-950 border-violet-950"
      : "py-6 bg-trasnpartent border-transpartent")}
>
  <h1 class="font-medium cursor-pointer">
    <a href="/"><b class="font-bold poppins">Main</b> Menu</a>
  </h1>
  <div class="hidden gap-4 items-center pr-4 ml-auto sm:flex">
    {#each tabs as tab, index}
      <a href={tab.link} class="duration-200 hover:text-violet-400">
        <p>{tab.name}</p>
      </a>
    {/each}
  </div>
  <a href="/login">
    <button
      class="overflow-hidden relative px-5 py-2 bg-white rounded-full blueShadow group text-slate-950"
    >
      <div
        class="absolute top-0 right-full z-0 w-full h-full bg-violet-900 opacity-20 duration-200 group-hover:translate-x-full"
      ></div>
      <h4 class="relative z-9">Login</h4>
    </button>
  </a>
</header>
