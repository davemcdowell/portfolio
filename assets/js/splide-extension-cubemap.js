const Cubemap = function(Splide, Components) {
  const { slides } = Components.Elements;

  function mount() {
    for(var i = 0; i < slides.length; i++) {
      if(slides[i].getAttribute('data-splide-cubemap')) {
        createCubemapBase(slides[i], i);
      }
    }
  }

  function createCubemapBase(slide, index) {
    const cubeData = JSON.parse(document.querySelector(slide.getAttribute('data-splide-cubemap')).textContent);

    let _cubemap;
    let _wrapper;
    let _playBtn;

    index += 1;

    //add an identifier to this slide similar to video extension
    slide.classList.add('splide__slide--has-cubemap');

    //create the container for the button and wrapper (in that order)
    _cubemap = document.createElement("div");
    _cubemap.classList.add('splide__cubemap');

    //create the wrapper for the cubemap display
    _wrapper = document.createElement("div");
    _wrapper.style.display = 'none';
    _wrapper.classList.add('splide__cubemap__wrapper');

    //create play button
    _playBtn = document.createElement("button");
    _playBtn.id = `slide${index}-cubemap__play-btn`;
    _playBtn.classList.add('splide__cubemap__play');
    _playBtn.setAttribute('type', 'button');
    _playBtn.setAttribute('aria-label', 'View Cubemap');

    //create player controls
    createCubemapControls(_wrapper, index, { mp3: cubeData.mp3, ogg: cubeData.ogg });

    //append play button to cubemap 
    _cubemap.appendChild(_playBtn);

    //append wrapper to cubemap 
    _cubemap.appendChild(_wrapper);

    //append root to the slide
    slide.appendChild(_cubemap);

    //play button event listener
    _playBtn.addEventListener('click', playCubemap);
  }

  function createCubemapControls(target, index, audioData) {
    const _navFragment = new DocumentFragment;

    /* navbar*/ 
    let _nav = document.createElement('nav');
    _nav.classList.add('navbar', 'fixed-bottom', 'bg-transparent');

    /* nav container */ 
    let _container = document.createElement('div');
    _container.classList.add('container-fluid');

    /* auto-rotate toggle */ 
    let _autoRotateBtn = document.createElement('button');
    _autoRotateBtn.id = `slide${index}-cubemap__rotate-btn`;
    _autoRotateBtn.classList.add();
    _autoRotateBtn.setAttribute('type', 'button');
    _autoRotateBtn.setAttribute('aria-label', 'Auto-rotate');
    
    /* mute ambience toggle */ 
    let _ambienceMuteBtn = document.createElement('button');
    _ambienceMuteBtn.id = `slide${index}-cubemap__audio-btn`;
    _ambienceMuteBtn.classList.add();
    _ambienceMuteBtn.setAttribute('type', 'button');
    _ambienceMuteBtn.setAttribute('aria-label', 'Mute Ambience');

    /* audio player (hidden) */
    let _audioHidden = document.createElement('audio');
    _audioHidden.id = `slide${index}-cubemap__audio`;
    _audioHidden.classList.add('d-none');
    _audioHidden.setAttribute('loop', '');
    _audioHidden.setAttribute('autoplay', '');
    _audioHidden.setAttribute('muted', '');
    
    /* set source by support */
    setAudioSrcBySupport(_audioHidden, audioData);

    _container.appendChild(_autoRotateBtn);
    _container.appendChild(_ambienceMuteBtn);
    _container.appendChild(_audioHidden);

    _nav.appendChild(_container);

    _navFragment.append(_nav);

    target.appendChild(_navFragment);
  }

  function setAudioSrcBySupport(audioPlayer, sources) {
    let _src = document.createElement('source');

    if(audioPlayer.canPlayType('audio/mpeg;')) {
      _src.type = 'audio/mpeg';
      _src.src = sources.mp3;
    } else {
      _src.type = 'audio/ogg';
      _src.src = sources.ogg;
    }
    audioPlayer.appendChild(_src);
  }

  function playCubemap() {
    console.log('Play Cubemap');
  }

  return {
    mount,
  };
}