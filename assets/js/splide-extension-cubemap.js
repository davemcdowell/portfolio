const SplideCubemap = function(Splide, Components) {
  const { slides } = Components.Elements;

  const _config = {
    dataSelector: 'data-splide-cubemap',
    rootClass: 'splide__slide--has-cubemap',
    containerClass: 'splide__cubemap',
    wrapperClass: 'splide__cubemap__wrapper',
    playBtnClass: 'splide__cubemap__play',
    autoRotBtnClass: 'cubemap__rotate',
    muteBtnClass: 'cubemap__mute',
    volInputClass: 'cubemap__volume',
    fullscreenBtnClass: 'cubemap__fullscreen',
    speedOptionBtnClass: 'cubemap__option',
    audioClass: 'splide__cubemap__audio', //temp, replacing with three.js audio: maybe use as fallback?
    cubemapGeometrySize: { x: 10000, y: 10000, z: 10000 },
    cubemapCameraPos: { x: 1200, y: -250, z: 2000 },
    cubemapCameraView: { fov: 55, near: 45, far: 30000 },
    cubemapControlsZoom: { min: 700, max: 1500 }
  };

  const _speedOptions = [
    { label: '1x', speed: 1.0 }, 
    { label: '2x', speed: 2.0 }, 
    { label: '3x', speed: 3.0 }];

  let _frameWidth;
  let _frameHeight;

  let _screenWidth = screen.width;
  let _screenHeight = screen.height;

  function mount() {
    for(var i = 0; i < slides.length; i++) {
      if(slides[i].hasAttribute(_config.dataSelector)) {
        createCubemapBase(slides[i], i);
      }
    }
    //TODO: slide, drag and other events for triggering inactive state
    Splide.on('inactive', onInactive);
    Splide.on('resize', onResize);
  }

  function createCubemapBase(slide, index) {
    //TODO: safety check for this script, possibly check if extension was fed json data instead; then fallback to this
    const _cubeData = JSON.parse(document.querySelector(slide.getAttribute(_config.dataSelector)).textContent);
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

    //add an identifier to this slide
    slide.classList.add(_config.rootClass);
    slide.style.overflow = 'hidden';

    //create the container for the button and wrapper (in that order)
    _cubemap = document.createElement("div");
    _cubemap.classList.add(_config.containerClass);

    //create the wrapper for the cubemap display
    _wrapper = document.createElement("div");
    _wrapper.style.display = 'none';
    _wrapper.classList.add(_config.wrapperClass);

    //create play button
    _playBtn = document.createElement("button");
    _playBtn.id = `slide${index}-cubemap__play-btn`;
    _playBtn.classList.add(_config.playBtnClass);
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
    if(common)
      common.setFlipToggles();

    //play button event listener
    _playBtn.addEventListener('click', function() {
      _playBtn.style.display = 'none';
      _wrapper.style.display = 'block';

      let _audio = _wrapper.querySelector(`.${_config.audioClass}`);
      let _mute = _wrapper.querySelector(`.${_config.muteBtnClass}`);
      
      if(_audio && _audio.hasAttribute('autoplay')) {
        _audio.play();
        
        if(_audio.hasAttribute('muted')) {
          _mute.click();
        }
      }

      if(!_wrapper.querySelector('canvas')) {
        buildCubemap(_wrapper, index, _cubeTextures, _cubeData.ogg);
        _wrapper.cubemap.enable();
      } else {
        _wrapper.cubemap.enable();
      }
    });
  }

  function createCubemapControls(target, index, audioData) {
    /* navbar*/ 
    const _nav = document.createElement('nav');
    _nav.classList.add('navbar', 'fixed-bottom', 'rounded-bottom', 'bg-blur');

    /* nav container */ 
    const _container = document.createElement('div');
    _container.classList.add('container-fluid', 'px-2');

    /* left-side controls */
    const _leftActions = document.createElement('div');

    /* auto-rotate & speed btn group */
    const _rotSpeedBtnGroup = document.createElement('div');
    _rotSpeedBtnGroup.classList.add('btn-group', 'dropup');

    /* auto-rotate toggle */
    const _autoRotateBtn = document.createElement('button');
    _autoRotateBtn.id = `cubemap${index}__rotate-btn`;
    _autoRotateBtn.classList.add('btn', _config.autoRotBtnClass, 'border-end', 'shadow-none');
    _autoRotateBtn.setAttribute('type', 'button');
    _autoRotateBtn.ariaLabel = 'Toggle Auto-rotate';
    /* handle icon and flip */
    const _rotIcon = document.createElement('i');
    _rotIcon.classList.add('bi', 'bi-arrow-repeat');
    _autoRotateBtn.appendChild(_rotIcon);
    _autoRotateBtn.setAttribute('data-flip-toggle', '');
    _autoRotateBtn.setAttribute('data-default-icon', 'bi bi-arrow-repeat');
    _autoRotateBtn.setAttribute('data-flip-icon', 'bi bi-arrows-move');

    /* speed menu */
    const _rotSpeedDropup = document.createElement('button');
    _rotSpeedDropup.classList.add('btn', 'dropdown-toggle', 'dropdown-toggle-split', 'shadow-none');
    _rotSpeedDropup.setAttribute('type', 'button');
    _rotSpeedDropup.setAttribute('data-bs-toggle', 'dropdown');
    _rotSpeedDropup.setAttribute('aria-expanded', 'false');
    //_rotSpeedDropup.setAttribute('data-bs-offset', '50, 20');

    const _speedUL = document.createElement('ul');
    _speedUL.classList.add('dropdown-menu', 'dropdown-menu-end', 'bg-blur', 'border', 'mb-2', 'no-mw');

    let _speedOptionBtns = [];

    for(let i = 0; i < _speedOptions.length; i++) {
      const li = document.createElement('li');
      const _speedOptBtn = document.createElement('button');
      _speedOptBtn.classList.add('dropdown-item', _config.speedOptionBtnClass);
      _speedOptBtn.setAttribute('type', 'button');
      _speedOptionBtns.push(_speedOptBtn);

      //set default
      if(_speedOptions[i].label === '1x') {
        _speedOptBtn.classList.add('active');
        _speedOptBtn.ariaCurrent = 'true';
      }

      _speedOptBtn.innerText = _speedOptions[i].label;

      li.appendChild(_speedOptBtn);
      _speedUL.appendChild(li);

      _speedOptBtn.addEventListener('click', function() {
        if(target.cubemap)
          target.cubemap.setSpeed(_speedOptions[i].speed);
      });
    }

    /* mute ambience toggle */ 
    const _ambienceMuteBtn = document.createElement('button');
    _ambienceMuteBtn.id = `cubemap${index}__audio-btn`;
    _ambienceMuteBtn.classList.add('btn', _config.muteBtnClass, 'scale-click', 'shadow-none');
    _ambienceMuteBtn.setAttribute('type', 'button');
    _ambienceMuteBtn.ariaLabel = 'Mute Ambience';
    /* handle icon and flip */
    const _ambIcon = document.createElement('i');
    _ambIcon.classList.add('bi', 'bi-volume-up');
    _ambienceMuteBtn.appendChild(_ambIcon);
    _ambienceMuteBtn.setAttribute('data-flip-toggle', '');
    _ambienceMuteBtn.setAttribute('data-default-icon', 'bi bi-volume-up');
    _ambienceMuteBtn.setAttribute('data-flip-icon', 'bi bi-volume-mute');

    /* volume slider */
    const _volumeInput = document.createElement('input');
    _volumeInput.classList.add('form-range', _config.volInputClass, 'shadow-none', 'w-25', 'ms-2', 'pt-3');
    _volumeInput.setAttribute('type', 'range');
    _volumeInput.setAttribute('min', 0);
    _volumeInput.setAttribute('max', 1);
    _volumeInput.setAttribute('step', 0.1);
    _volumeInput.value = 0.35;

    /* fullscreen toggle */
    const _fullscreenBtn = document.createElement('button');
    _fullscreenBtn.id = `cubemap${index}__fullscreen-btn`;
    _fullscreenBtn.classList.add('btn', _config.fullscreenBtnClass, 'scale-click', 'ms-auto', 'shadow-none');
    _fullscreenBtn.setAttribute('type', 'button');
    _fullscreenBtn.ariaLabel = 'Toggle Fullscreen';
    
    /* handle icon and flip */
    const _fsIcon = document.createElement('i');
    _fsIcon.classList.add('bi', 'bi-fullscreen');
    _fullscreenBtn.appendChild(_fsIcon);
    _fullscreenBtn.setAttribute('data-flip-toggle', '');
    _fullscreenBtn.setAttribute('data-default-icon', 'bi bi-fullscreen');
    _fullscreenBtn.setAttribute('data-flip-icon', 'bi bi-fullscreen-exit');

    // audio player (hidden) 
    const _audioHidden = document.createElement('audio');
    _audioHidden.classList.add(_config.audioClass, 'd-none');
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
      if(target.cubemap)
        target.cubemap.toggleAutoRotate();
    });

    /* speed options */
    for(let i = 0; i < _speedOptionBtns.length; i++) {
      _speedOptionBtns[i].addEventListener('click', function() {
        for(let j = 0; j < _speedOptionBtns.length; j++) {
          _speedOptionBtns[j].classList.remove('active');
        }
        _speedOptionBtns[i].classList.add('active');
      });
    }

    /* volume */
    _volumeInput.addEventListener('change', function() {
      _audioHidden.volume = _volumeInput.value;
    });

    /* fullscreen toggle */
    _fullscreenBtn.addEventListener('click', function() {
      if(target.cubemap)
        target.cubemap.toggleFullscreen();
    });
  }

  function setAudioSrcBySupport(audioPlayer, sources) {
    const _src = document.createElement('source');

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
      if(slides[i].hasAttribute(_config.dataSelector)) {
        let _playBtn = slides[i].querySelector(`.${_config.playBtnClass}`);
        _playBtn.style.display = 'flex';

        let _wrapper = slides[i].querySelector(`.${_config.wrapperClass}`);
        _wrapper.style.display = 'none';

        let _audio = _wrapper.querySelector(`.${_config.audioClass}`);
        
        if(_audio) {
          _audio.pause();
          _audio.currentTime = 0;
        }

        if(_wrapper.cubemap)
          _wrapper.cubemap.disable();
      }
    }
  }

  function onResize() {
    for(let i = 0; i < slides.length; i++) {
      if(slides[i].hasAttribute(_config.dataSelector)) {
        let _wrapper = slides[i].querySelector(`.${_config.wrapperClass}`);
        let _canvas = _wrapper.querySelector('canvas');

        _frameWidth = slides[i].offsetWidth;
        _frameHeight = slides[i].offsetHeight;

        if(_canvas) {
          _canvas.setAttribute('width', `${_frameWidth}`);
          _canvas.setAttribute('height', `${_frameHeight}`);
        }

        if(_wrapper.cubemap)
          _wrapper.cubemap.resizeRenderFrame();
      }
    }
  }

  /*
    Cubemap builder
    TODO:
    [x]multi-render target support 'Class-based approach'
    [x]index based id
    []loading feedback/spinner
    [x]resize/update renderer via resize event
    [x]toggle auto-rotate
    [x]rotate speed selector
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

    /* set audio, listener and load sound */
    const _listener = new THREE.AudioListener();
    const _audio = new THREE.PositionalAudio(_listener);
    const _audioLoader = new THREE.AudioLoader();

    /* set camera and add listener */
    const _camera = new THREE.PerspectiveCamera(_config.cubemapCameraView.fov, _frameWidth  / _frameHeight, _config.cubemapCameraView.near, _config.cubemapCameraView.far);
    _camera.position.set(_config.cubemapCameraPos.x, _config.cubemapCameraPos.y, _config.cubemapCameraPos.z);
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
    const _cubemapGeo = new THREE.BoxGeometry(_config.cubemapGeometrySize.x, _config.cubemapGeometrySize.y, _config.cubemapGeometrySize.z);
    const _cubemap = new THREE.Mesh(_cubemapGeo, _materialArray);
    _scene.add(_cubemap);

    /* set orbit controls */
    const _controls = new THREE.OrbitControls(_camera, _renderer.domElement);
    _controls.enabled = true;
    _controls.minDistance = _config.cubemapControlsZoom.min;
    _controls.maxDistance = _config.cubemapControlsZoom.max;
    _controls.enablePan = false;
    _controls.autoRotate = true;
    _controls.autoRotateSpeed = 1.0;

    //create our new Cubemap
    target.cubemap = new Cubemap(_controls, _renderer, _camera, _scene, target);
  }

  function createMaterialArray(pathArray) {
    const materialArray = pathArray.map(image => {
      //loader here
      let texture = new THREE.TextureLoader().load(image);
      return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
    });
    return materialArray;
  }

  class Cubemap {
    constructor(controls, renderer, camera, scene, rootObj) {
      this.controls = controls;
      this.renderer = renderer;
      this.camera = camera;
      this.scene = scene;
      this.rootObj = rootObj;

      let _isDisabled = false;
      let _isFullscreen = false;

      let _speed = 1.0;
      let _useAutoRotate = true;
      let _reqestAnimation;

      this.toggleAutoRotate = function () { _useAutoRotate = !_useAutoRotate; };

      this.toggleFullscreen = function () { 
        _isFullscreen = !_isFullscreen;
        (_isFullscreen) ? this.openFullscreen() : this.closeFullscreen();
      };

      this.setSpeed = function(newSpeed) { _speed = newSpeed; };

      this.animate = () => {
        if(_isDisabled)
          return;

        this.controls.autoRotate = _useAutoRotate;
        this.controls.autoRotateSpeed = _speed;

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        _reqestAnimation = window.requestAnimationFrame(() => this.animate());
      };

      this.resizeRenderFrame = function() {
        if(_isFullscreen) {
          this.camera.aspect = _frameWidth / _frameHeight;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(_frameWidth, _frameHeight);
        } else {
          this.camera.aspect = _screenWidth / _screenHeight;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(_screenWidth, _screenHeight);
        }
      };

      this.openFullscreen = function() {
        if(rootObj.requestFullscreen) {
          rootObj.requestFullscreen();
        } else if(rootObj.webkitRequestFullscreen) { /* Safari */
          rootObj.webkitRequestFullscreen();
        } else if(rootObj.msRequestFullscreen) { /* IE11 */
          rootObj.msRequestFullscreen();
        }
      }
  
      this.closeFullscreen = function() {
        if(document.exitFullscreen) {
          document.exitFullscreen();
        } else if(document.webkitExitFullscreen) { /* Safari */
          document.webkitExitFullscreen();
        } else if(document.msExitFullscreen) { /* IE11 */
          document.msExitFullscreen();
        }
      }

      this.enable = function() {
        _isDisabled = false;
        _isFullscreen = false;
        this.animate();
      };

      this.disable = function() {
        _isDisabled = true;
        _isFullscreen = false;
        this.closeFullscreen();
      };
    }
  }

  return {
    mount,
  };
}