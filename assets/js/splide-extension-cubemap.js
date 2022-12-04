function Cubemap(Splide, Components) {
  const { slide } = Components.Slides;

  let _cubemap;
  let _wrapper;
  let _btn;

  function mount() {
    console.log('cubemap splide registered and mounted!');
    
    //if(slide.getAttribute('data-splide-cubemap')) {
      //add an identifier to this slide similar to video extetnsion
      slide.classList.add('splide__slide--has-cubemap');

      //create the container for the button and wrapper (in that order) - root element for us -
      _cubemap = document.createElement("div");
      _cubemap.classList.add('splide__cubemap');

      //create the wrapper for the cubemap display
      _wrapper = document.createElement("div");
      _wrapper.style.display = 'none';
      _wrapper.classList.add('splide__cubemap__wrapper');

      //create our play button
      _btn = document.createElement("button");
      _btn.classList.add('splide__cubemap__play');
      _btn.setAttribute('type', 'button');
      _btn.setAttribute('aria-label', 'View Cubemap');

      //append play button to cubemap 
      _cubemap.appendChild(_btn);

      //append wrapper to cubemap 
      _cubemap.appendChild(_wrapper);

      //append our root to the slide
      slide.appendChild(_cubemap);

      //play button event listener
      _btn.addEventListener('click', playCubemap);
    }
  //}

  function playCubemap() {
    console.log('Play Cubemap');
  }

  return {
    mount,
  };
}
