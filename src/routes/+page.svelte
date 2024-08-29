<script>
  import RootHeader from "../components/RootHeader.svelte";
  let y;
</script>

<RootHeader {y} />

<section
  id="introPage"
  class="grid relative grid-cols-1 gap-10 py-8 lg:grid-cols-1 sm:py-14"
>
  <div class="absolute inset-0 bg-center bg-cover opacity-50"></div>
  <div
    class="flex relative z-10 flex-col gap-6 p-10 text-left md:gap-8 lg:gap-10"
  >
    <h2 class="text-4xl font-semibold sm:text-5xl md:text-6xl">
      Hi! Welcome to my <span class="text-violet-400 poppins"
        >Full Stack Web</span
      > Development site
    </h2>
    <p class="text-lg leading-relaxed text-white md:text-xl">
      Here you can find different data for weather stations around the <span class="text-violet-400 poppins">globe</span> (read a few in Europe).
    </p>
    <div
      class="flex flex-col gap-4 justify-center sm:flex-row lg:justify-start"
    >
      <button
        class="px-6 py-3 font-semibold text-white bg-violet-600 rounded transition duration-300 hover:bg-violet-800"
      >
        
        <a href="/location-overview">Get Started</a>
      </button>
      <button
        class="px-6 py-3 font-semibold text-gray-800 bg-gray-200 rounded transition duration-300 hover:bg-gray-300"
      >
        <a href="https://en.wikipedia.org/wiki/Weather" target="_blank">Learn More About Weather</a>
      </button>
    </div>
  </div>
</section>

<svelte:window bind:scrollY={y} />
