/** @type {import('./$types').PageLoad} */
export async function load({ data }) {
  console.log("begin");
  console.log(data);
  console.log("einde");
  // return {
  //   aantal: data.aantal,
  //   mensen: data.mensen,
  // };
}
