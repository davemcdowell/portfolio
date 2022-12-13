const SplideCubemap = function(Splide, Components) {
  const { slides } = Components.Elements;

  let _frameWidth;
  let _frameHeight;

  function mount() {
    for(var i = 0; i < slides.length; i++) {
      if(slides[i].hasAttribute('data-splide-cubemap')) {
        createCubemapBase(slides[i], i);
      }
    }
    Splide.on('inactive', onInactive);
    Splide.on('resize', onResize);
  }

  function createCubemapBase(slide, index) {
    const _cubeData = JSON.parse(document.querySelector(slide.getAttribute('data-splide-cubemap')).textContent);
    const _cubeTextures = [
      _cubeData.front, 
      _cubeData.back, 
      _cubeData.up,
      _cubeData.down,
      _cubeData.right, 
      _cubeData.left
    ];

    let _cubemap;
    let _wrapper;
    let _playBtn;

    //adjust for zero-indexing
    index += 1;

    //add an identifier to this slide similar to video extension
    slide.classList.add('splide__slide--has-cubemap');
    slide.style.overflow = 'hidden';

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
    _playBtn.ariaLabel = 'View Cubemap';

    //create player controls
    createCubemapControls(_wrapper, index, { mp3: _cubeData.mp3, ogg: _cubeData.ogg });

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

      let _audio = _wrapper.querySelector('.splide__cubemap__audio');
      let _mute = _wrapper.querySelector('button.cubemap__mute');
      
      if(_audio && _audio.hasAttribute('autoplay')) {
        _audio.play();
        
        if(_audio.hasAttribute('muted')) {
          _mute.click();
        }
      }

      if(!_wrapper.querySelector('canvas')) {
        buildCubemap(_wrapper, index, _cubeTextures, _cubeData.ogg);
        _wrapper.cubemap.animate();
      } else {
        _wrapper.cubemap.enable();
      }
    });
  }

  function createCubemapControls(target, index, audioData) {
    /* navbar*/ 
    let _nav = document.createElement('nav');
    _nav.classList.add('navbar', 'fixed-bottom', 'rounded-bottom', 'bg-blur');

    /* nav container */ 
    let _container = document.createElement('div');
    _container.classList.add('container-fluid', 'px-2');

    /* left-side controls */
    let _leftActions = document.createElement('div');

    /* auto-rotate & speed btn group */
    let _rotSpeedBtnGroup = document.createElement('div');
    _rotSpeedBtnGroup.classList.add('btn-group', 'dropup');

    /* auto-rotate toggle */
    let _autoRotateBtn = document.createElement('button');
    _autoRotateBtn.id = `cubemap${index}__rotate-btn`;
    _autoRotateBtn.classList.add('btn', 'cubemap__rotate', 'scale-click', 'border-end', 'shadow-none');
    _autoRotateBtn.setAttribute('type', 'button');
    _autoRotateBtn.ariaLabel = 'Toggle Auto-rotate';
    /* handle icon and flip */
    let _rotIcon = document.createElement('i');
    _rotIcon.classList.add('bi', 'bi-arrow-repeat');
    _autoRotateBtn.appendChild(_rotIcon);
    _autoRotateBtn.setAttribute('data-flip-toggle', '');
    _autoRotateBtn.setAttribute('data-default-icon', 'bi bi-arrow-repeat');
    _autoRotateBtn.setAttribute('data-flip-icon', 'bi bi-arrows-move');

    /* speed menu */
    let _speedOptions = [
      { label: '1x', speed: 1.0 }, 
      { label: '2x', speed: 2.0 }, 
      { label: '3x', speed: 3.0 }];
    let _rotSpeedDropup = document.createElement('button');
    _rotSpeedDropup.classList.add('btn', 'dropdown-toggle', 'dropdown-toggle-split', 'shadow-none');
    _rotSpeedDropup.setAttribute('type', 'button');
    _rotSpeedDropup.setAttribute('data-bs-toggle', 'dropdown');
    _rotSpeedDropup.setAttribute('aria-expanded', 'false');
    _rotSpeedDropup.setAttribute('data-bs-offset', '50, 20');

    let _speedUL = document.createElement('ul');
    _speedUL.classList.add('dropdown-menu', 'bg-blur', 'border', 'mb-2', 'no-mw');

    for(let i = 0; i < _speedOptions.length; i++) {
      let li = document.createElement('li');
      let _speedOptBtn = document.createElement('button');
      _speedOptBtn.classList.add('dropdown-item');
      _speedOptBtn.setAttribute('type', 'button');

      //set default
      if(_speedOptions[i].label === '1x') {
        _speedOptBtn.classList.add('active');
        _speedOptBtn.ariaCurrent = 'true';
      }

      _speedOptBtn.innerText = _speedOptions[i].label;
      li.appendChild(_speedOptBtn);
      _speedUL.appendChild(li);
    }

    /* mute ambience toggle */ 
    let _ambienceMuteBtn = document.createElement('button');
    _ambienceMuteBtn.id = `cubemap${index}__audio-btn`;
    _ambienceMuteBtn.classList.add('btn', 'cubemap__mute', 'scale-click', 'shadow-none');
    _ambienceMuteBtn.setAttribute('type', 'button');
    _ambienceMuteBtn.ariaLabel = 'Mute Ambience';
    /* handle icon and flip */
    let _ambIcon = document.createElement('i');
    _ambIcon.classList.add('bi', 'bi-volume-up');
    _ambienceMuteBtn.appendChild(_ambIcon);
    _ambienceMuteBtn.setAttribute('data-flip-toggle', '');
    _ambienceMuteBtn.setAttribute('data-default-icon', 'bi bi-volume-up');
    _ambienceMuteBtn.setAttribute('data-flip-icon', 'bi bi-volume-mute');

    /* volume slider */
    let _volumeInput = document.createElement('input');
    _volumeInput.classList.add('form-range', 'cubemap__volume', 'shadow-none', 'w-25', 'ms-2', 'pt-3');
    _volumeInput.setAttribute('type', 'range');
    _volumeInput.setAttribute('min', 0);
    _volumeInput.setAttribute('max', 1);
    _volumeInput.setAttribute('step', 0.1);
    _volumeInput.value = 0.35;

    /* fullscreen toggle */
    let _fullscreenBtn = document.createElement('button');
    _fullscreenBtn.id = `cubemap${index}__fullscreen-btn`;
    _fullscreenBtn.classList.add('btn', 'cubemap__fullscreen', 'scale-click', 'ms-auto', 'shadow-none');
    _fullscreenBtn.setAttribute('type', 'button');
    _fullscreenBtn.ariaLabel = 'Toggle Fullscreen';
    
    /* handle icon and flip */
    let _fsIcon = document.createElement('i');
    _fsIcon.classList.add('bi', 'bi-fullscreen');
    _fullscreenBtn.appendChild(_fsIcon);
    _fullscreenBtn.setAttribute('data-flip-toggle', '');
    _fullscreenBtn.setAttribute('data-default-icon', 'bi bi-fullscreen');
    _fullscreenBtn.setAttribute('data-flip-icon', 'bi bi-fullscreen-exit');

    // audio player (hidden) 
    let _audioHidden = document.createElement('audio');
    _audioHidden.classList.add('splide__cubemap__audio', 'd-none');
    _audioHidden.setAttribute('loop', '');
    _audioHidden.setAttribute('autoplay', '');
    _audioHidden.setAttribute('muted', '');
    _audioHidden.volume = 0;
    
    // set source by support
    setAudioSrcBySupport(_audioHidden, audioData);

    //assemble auto-rotate / speed btn group
    _rotSpeedBtnGroup.appendChild(_autoRotateBtn);
    _rotSpeedBtnGroup.appendChild(_rotSpeedDropup);
    _rotSpeedBtnGroup.appendChild(_speedUL);

    //assemble left actions
    _leftActions.appendChild(_rotSpeedBtnGroup);
    _leftActions.appendChild(_ambienceMuteBtn);
    _leftActions.appendChild(_volumeInput);

    //assemble nav container
    _container.appendChild(_leftActions);
    _container.appendChild(_fullscreenBtn);
    _container.appendChild(_audioHidden);

    _audioHidden.volume = _volumeInput.value;

    _nav.appendChild(_container);

    target.appendChild(_nav);

    /* mute ambience toggle */
    _ambienceMuteBtn.addEventListener('click', function() {
      _audioHidden.muted = !_audioHidden.muted;
    });

    /* auto-rotate toggle */
    _autoRotateBtn.addEventListener('click', function() {
      target.cubemap.toggleAutoRotate();
    });

    /* volume */
    _volumeInput.addEventListener('change', function() {
      _audioHidden.volume = _volumeInput.value;
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

  function onInactive() {
    for(let i = 0; i < slides.length; i++) {
      if(slides[i].hasAttribute('data-splide-cubemap')) {
        let _playBtn = slides[i].querySelector('.splide__cubemap__play');
        _playBtn.style.display = 'flex';

        let _wrapper = slides[i].querySelector('.splide__cubemap__wrapper');
        _wrapper.style.display = 'none';

        let _audio = _wrapper.querySelector('.splide__cubemap__audio');
        
        if(_audio) {
          _audio.pause();
          _audio.currentTime = 0;
        }
        _wrapper.cubemap.disable();
      }
    }
  }

  function onResize() {
    for(let i = 0; i < slides.length; i++) {
      if(slides[i].hasAttribute('data-splide-cubemap')) {
        let _wrapper = slides[i].querySelector('.splide__cubemap__wrapper');
        let _canvas = _wrapper.querySelector('canvas');

        _frameWidth = slides[i].offsetWidth;
        _frameHeight = slides[i].offsetHeight;

        if(_canvas) {
          _canvas.setAttribute('width', `${_frameWidth}`);
          _canvas.setAttribute('height', `${_frameHeight}`);
          _wrapper.cubemap.resizeRenderFrame();
        }
      }
    }
  }

  /*
    Cubemap builder

    TODO:
    []define parameters
    [x]multi-render target support 'Class-based approach'
    [x]index based id
    []loading feedback/spinner
    [x]resize/update renderer via resize event
    [x]toggle auto-rotate
    []toggle fullscreen
    [x]enable/disable events
    [x]'disable' renderer & reqAnimation on inactive
    []ambient positional audio in scene
    []hdr RGBE exposure option
    []fog 
  */
  function buildCubemap(target, index, imageArray, ambience) {
    if(target.querySelector('canvas'))
      return;

    /* set new scene */
    const _scene = new THREE.Scene();

    /* set audio and listener */
    let _listener = new THREE.AudioListener();
    let _audio = new THREE.PositionalAudio(_listener);
    let _audioLoader = new THREE.AudioLoader();

    /* set camera and add listener */
    const _camera = new THREE.PerspectiveCamera(55, _frameWidth  / _frameHeight, 45, 30000);
    _camera.position.set(1200, -250, 2000);
    _camera.add(_listener);

    /* set new renderer + options */
    const _renderer = new THREE.WebGLRenderer({ antialias: true });
    _renderer.setSize(_frameWidth, _frameHeight);
    
    //set our indexed id
    _renderer.domElement.id = `cubemap${index}__canvas`;

    //append renderer/canvas to our target
    target.appendChild(_renderer.domElement);

    /* set cubemap geometry and texture */
    const _materialArray = createMaterialArray(imageArray);
    const _cubemapGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    const _cubemap = new THREE.Mesh(_cubemapGeo, _materialArray);
    _scene.add(_cubemap);

    /* set orbit controls */
    const _controls = new THREE.OrbitControls(_camera, _renderer.domElement);
    _controls.enabled = true;
    _controls.minDistance = 700;
    _controls.maxDistance = 1500;
    _controls.enablePan = false;
    _controls.autoRotate = true;
    _controls.autoRotateSpeed = 1.0;

    //create our new Cubemap obj
    target.cubemap = new Cubemap(_controls, _renderer, _camera, _scene);
  }

  function createMaterialArray(pathArray) {
    const materialArray = pathArray.map(image => {
      let texture = new THREE.TextureLoader().load(image);
      return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    });
    return materialArray;
  }

  class Cubemap {
    constructor(controls, renderer, camera, scene) {
      this.controls = controls;
      this.renderer = renderer;
      this.camera = camera;
      this.scene = scene;

      let _isDisabled = false;

      let _useAutoRotate = true;
      let _reqestAnimation;
      
      this.toggleAutoRotate = function () {
        _useAutoRotate = !_useAutoRotate;
      };

      this.animate = () => {
        if(_isDisabled)
          return;

        this.controls.autoRotate = _useAutoRotate;

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        _reqestAnimation = window.requestAnimationFrame(() => this.animate());
      };

      this.resizeRenderFrame = function() {
        this.camera.aspect = _frameWidth / _frameHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(_frameWidth, _frameHeight);
      }

      this.enable = function() {
        _isDisabled = false;
        this.animate();
      }

      this.disable = function() {
        _isDisabled = true;
      }
    }
  }

  return {
    mount,
  };
}