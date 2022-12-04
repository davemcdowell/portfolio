const Cubemap = function(Splide, Components) {
  const { slides } = Components.Elements;

  let _cubemap;
  let _wrapper;
  let _playBtn;

  function mount() {
    for(var i = 0; i < slides.length; i++) {
      if(slides[i].getAttribute('data-splide-cubemap')) {
        const cubeData = JSON.parse(slides[i].getAttribute('data-splide-cubemap'));

        console.log(cubeData);

        slides[i].id = `slide${slides[i].index}-cubemap`;

        //add an identifier to this slide similar to video extension
        slides[i].classList.add('splide__slide--has-cubemap');
  
        //create the container for the button and wrapper (in that order)
        _cubemap = document.createElement("div");
        _cubemap.classList.add('splide__cubemap');
  
        //create the wrapper for the cubemap display
        _wrapper = document.createElement("div");
        _wrapper.style.display = 'none';
        _wrapper.classList.add('splide__cubemap__wrapper');
  
        //create play button
        _playBtn = document.createElement("button");
        _playBtn.classList.add('splide__cubemap__play');
        _playBtn.setAttribute('type', 'button');
        _playBtn.setAttribute('aria-label', 'View Cubemap');

        //TODO: use fragment

        //append play button to cubemap 
        _cubemap.appendChild(_playBtn);
  
        //append wrapper to cubemap 
        _cubemap.appendChild(_wrapper);
  
        //append root to the slide
        slides[i].appendChild(_cubemap);
  
        //play button event listener
        _playBtn.addEventListener('click', playCubemap);
      }
    }

    function createCubemapBase() {

    }

    function createCubemapControls() {
      const _navFragment = new DocumentFragment;

      let _nav = document.createElement('nav');
      _nav.classList.add('navbar', 'fixed-bottom', 'bg-transparent');

      let _container = document.createElement('div');
      _container.classList.add('container-fluid');

      let _autoRotateBtn = document.createElement('button');
      _autoRotateBtn.classList.add();
      _autoRotateBtn.setAttribute('type', 'button');
      _autoRotateBtn.setAttribute('aria-label', 'Auto-rotate');
      
      let _ambienceMuteBtn = document.createElement('button');
      _ambienceMuteBtn.classList.add();
      _ambienceMuteBtn.setAttribute('type', 'button');
      _ambienceMuteBtn.setAttribute('aria-label', 'Mute Ambience');

      /* audio player (hidden) */
      let _audioHidden = document.createElement('audio');
      _audioHidden.classList.add('d-none');
      _audioHidden.setAttribute('loop', '');
      _audioHidden.setAttribute('autoplay', '');
      _audioHidden.setAttribute('muted', '');

      setAudioSrcBySupport(_audioHidden);

      _container.appendChild(_autoRotateBtn);
      _container.appendChild(_ambienceMuteBtn);

      _nav.appendChild(_container);

      _navFragment.append(_nav);

      target.appendChild(_navFragment);
    }

    function setAudioSrcBySupport(audioPlayer, sources) {
      let _src = document.createElement('source');

      if(audioPlayer.canPlayType('audio/mpeg;')) {
        _src.type = 'audio/mpeg';
        _src.src = sources.mp3URL;
      } else {
        _src.type = 'audio/ogg';
        _src.src = sources.mp3URL;
      }
      audioPlayer.appendChild(_src);
    }
  }

  function playCubemap() {
    console.log('Play Cubemap');
  }

  return {
    mount,
  };
}