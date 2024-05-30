<script>
  import Header2 from "../components/Header2.svelte";
  let y;
  let innerHeight;
  let innerWidth;
</script>

<Header2 {y} {innerHeight} />

<section
  id="introPage"
  class="grid grid-cols-1 lg:grid-cols-2 gap-10 py-8 sm:py-14"
>
  <div
    class="flex flex-col lg:justify-center text-center lg:text-left gap-6 md:gap-8 lg:gap-10"
  >
    <h2 class="font-semibold text-4xl sm:text5xl md:text-6xl">
      Hi! Welcome to my <span class="poppins text-violet-400"></span>
      <br />
      Full Stack Web
      <span class="poppins text-violet-400">Developpement</span> site
    </h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, eaque iste. Commodi nemo sapiente necessitatibus modi veniam, maiores debitis recusandae nam cumque distinctio dolore! Qui magnam quibusdam veritatis rerum eos! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat excepturi, sunt quis aliquid et ex porro cupiditate sapiente. Sint quae soluta voluptates modi, ullam assumenda quaerat! Accusamus id possimus magnam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis fuga accusantium pariatur quia porro. Numquam ex veritatis labore provident eum perferendis porro, eligendi necessitatibus deserunt, accusamus, quas quo facilis molestiae. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem reprehenderit, exercitationem, sapiente fugit eum earum saepe eligendi esse, id provident distinctio nesciunt! Obcaecati similique quibusdam libero officia eveniet velit? Non! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, similique assumenda. Consequuntur magni nostrum non fugit, facilis sit amet possimus consequatur ipsa, eveniet repudiandae, maxime autem nesciunt incidunt et quae. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae at doloremque quam! A nemo rerum ipsam sapiente qui exercitationem. Quod illum error officia fugiat aut iure dolorum a magnam et.</p>

  </div>
</section>

<svelte:window bind:scrollY={y} bind:innerHeight bind:innerWidth />
