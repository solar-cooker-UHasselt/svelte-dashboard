<script>
  import RootHeader from "../components/RootHeader.svelte";
  let y;
</script>

<RootHeader {y} />

<section
  id="introPage"
  class="grid relative grid-cols-1 gap-10 py-8 lg:grid-cols-2 sm:py-14"
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
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, eaque iste.
      Commodi nemo sapiente necessitatibus modi veniam, maiores debitis
      recusandae nam cumque distinctio dolore! Qui magnam quibusdam veritatis
      rerum eos! Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      Fugiat excepturi, sunt quis aliquid et ex porro cupiditate sapiente. Sint
      quae soluta voluptates modi, ullam assumenda quaerat! Accusamus id
      possimus magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Veritatis fuga accusantium pariatur quia porro. Numquam ex veritatis
      labore provident eum perferendis porro, eligendi necessitatibus deserunt,
      accusamus, quas quo facilis molestiae. Lorem ipsum dolor sit amet,
      consectetur adipisicing elit. Quidem reprehenderit, exercitationem,
      sapiente fugit eum earum saepe eligendi esse, id provident distinctio
      nesciunt! Obcaecati similique quibusdam libero officia eveniet velit? Non!
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, similique
      assumenda. Consequuntur magni nostrum non.
    </p>
    <div
      class="flex flex-col gap-4 justify-center sm:flex-row lg:justify-start"
    >
      <button
        class="px-6 py-3 font-semibold text-white bg-violet-600 rounded transition duration-300 hover:bg-violet-800"
      >
        Get Started
      </button>
      <button
        class="px-6 py-3 font-semibold text-gray-800 bg-gray-200 rounded transition duration-300 hover:bg-gray-300"
      >
        Learn More
      </button>
    </div>
  </div>
</section>

<svelte:window bind:scrollY={y} />
