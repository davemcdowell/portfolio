const Cubemap = function(Splide, Components) {
  const { slides } = Components.Elements;

  function mount() {
    for(var i = 0; i < slides.length; i++) {
      if(slides[i].hasAttribute('data-splide-cubemap')) {
        createCubemapBase(slides[i], i);
      }
    }
    Splide.on('inactive', disableCubemap);
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

    //common utils for flip btns
    common.set_flip_toggles();

    //play button event listener
    _playBtn.addEventListener('click', function(event) {
      _playBtn.style.display = 'none';
      _wrapper.style.display = 'block';
      enableCubemap();
    });
  }

  function createCubemapControls(target, index, audioData) {
    /* navbar*/ 
    let _nav = document.createElement('nav');
    _nav.classList.add('navbar', 'fixed-bottom', 'bg-blur');

    /* nav container */ 
    let _container = document.createElement('div');
    _container.classList.add('container-fluid', 'px-2');

    /* left-side controls */
    let _leftActions = document.createElement('div');

    /* auto-rotate toggle */ 
    let _autoRotateBtn = document.createElement('button');
    _autoRotateBtn.id = `cubemap${index}__rotate-btn`;
    _autoRotateBtn.classList.add('btn');
    _autoRotateBtn.setAttribute('type', 'button');
    _autoRotateBtn.setAttribute('aria-label', 'Auto-rotate');
    /* handle icon and flip */
    let _rotIcon = document.createElement('i');
    _rotIcon.classList.add('bi', 'bi-arrow-repeat');
    _autoRotateBtn.appendChild(_rotIcon);
    _autoRotateBtn.setAttribute('data-flip-toggle', '');
    _autoRotateBtn.setAttribute('data-default-icon', 'bi bi-arrow-repeat');
    _autoRotateBtn.setAttribute('data-flip-icon', 'bi bi-arrows-move');

    /* mute ambience toggle */ 
    let _ambienceMuteBtn = document.createElement('button');
    _ambienceMuteBtn.id = `cubemap${index}__audio-btn`;
    _ambienceMuteBtn.classList.add('btn');
    _ambienceMuteBtn.setAttribute('type', 'button');
    _ambienceMuteBtn.setAttribute('aria-label', 'Mute Ambience');
    /* handle icon and flip */
    let _ambIcon = document.createElement('i');
    _ambIcon.classList.add('bi', 'bi-volume-up');
    _ambienceMuteBtn.appendChild(_ambIcon);
    _ambienceMuteBtn.setAttribute('data-flip-toggle', '');
    _ambienceMuteBtn.setAttribute('data-default-icon', 'bi bi-volume-up');
    _ambienceMuteBtn.setAttribute('data-flip-icon', 'bi bi-volume-mute');

    /* fullscreen toggle */ 
    let _fullscreenBtn = document.createElement('button');
    _fullscreenBtn.id = `cubemap${index}__fullscreen-btn`;
    _fullscreenBtn.classList.add('btn', 'ms-auto');
    _fullscreenBtn.setAttribute('type', 'button');
    _fullscreenBtn.setAttribute('aria-label', 'Fullscreen');
    /* handle icon and flip */
    let _fsIcon = document.createElement('i');
    _fsIcon.classList.add('bi', 'bi-fullscreen');
    _fullscreenBtn.appendChild(_fsIcon);
    _fullscreenBtn.setAttribute('data-flip-toggle', '');
    _fullscreenBtn.setAttribute('data-default-icon', 'bi bi-fullscreen');
    _fullscreenBtn.setAttribute('data-flip-icon', 'bi bi-fullscreen-exit');

    /* audio player (hidden) */
    let _audioHidden = document.createElement('audio');
    _audioHidden.id = `cubemap${index}__audio`;
    _audioHidden.classList.add('d-none');
    _audioHidden.setAttribute('loop', '');
    _audioHidden.setAttribute('autoplay', '');
    _audioHidden.setAttribute('muted', '');
    
    /* set source by support */
    setAudioSrcBySupport(_audioHidden, audioData);

    _leftActions.appendChild(_autoRotateBtn);
    _leftActions.appendChild(_ambienceMuteBtn);
    
    _container.appendChild(_leftActions);
    _container.appendChild(_fullscreenBtn);
    _container.appendChild(_audioHidden);

    _nav.appendChild(_container);

    target.appendChild(_nav);

    /* play / pause toggle */
    _ambienceMuteBtn.addEventListener('click', function() {
      if(_audioHidden.paused) {
        _audioHidden.play();
      } else {
        _audioHidden.pause();
      }
    });
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

  function enableCubemap() {
    console.log('Play Cubemap');
  }

  function disableCubemap() {
    for(let i = 0; i < slides.length; i++) {
      if(slides[i].hasAttribute('data-splide-cubemap')) {
        let _playBtn = slides[i].querySelector('.splide__cubemap__play');
        _playBtn.style.display = 'flex';

        let _wrapper = slides[i].querySelector('.splide__cubemap__wrapper');
        _wrapper.style.display = 'none';
      }
    }
  }

  return {
    mount,
  };
}