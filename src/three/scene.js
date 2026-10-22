import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Clock,
  Color,
  DirectionalLight,
  FogExp2,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  SRGBColorSpace,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  TorusGeometry,
  Vector3,
  WebGLRenderer
} from 'three';

const CAMERA_Z = 17;
const HALO_RADIUS_FACTOR = 0.9;

export class Portfolio3DScene {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.satellites = [];
    this.clock = new Clock();
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.colorThemes = {
      cyber: {
        bg: 0x160f13,
        primary: 0xf08c83,
        secondary: 0x8d4658,
        accent: 0xbd6570,
        core: 0xffb0a3,
        particles: [0xf08c83, 0xbd6570, 0x8d4658]
      }
    };

    this.init();
  }

  init() {
    // 1. Scene & Camera
    this.scene = new Scene();
    this.scene.fog = new FogExp2(this.colorThemes.cyber.bg, 0.018);

    const aspect = this.container.clientWidth / Math.max(this.container.clientHeight, 1);
    this.camera = new PerspectiveCamera(55, aspect, 0.1, 1000);
    this.camera.position.set(0, 0, 18);

    // 2. Renderer
    this.renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(this.pixelRatio());
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.container.appendChild(this.renderer.domElement);

    // 3. Lighting
    this.setupLights();

    // 4. Geometry & Objects
    this.createStarfield();
    this.createCentralCore();
    this.createSatellites();
    // 5. Event Listeners
    this.bindEvents();

    // 6. Start Loop
    this.animate();
  }

  // Phones get a lower cap: the scene is a soft background, not worth the fill-rate cost.
  pixelRatio() {
    const cap = window.innerWidth < 768 ? 1.25 : 1.75;
    return Math.min(window.devicePixelRatio, cap);
  }

  setupLights() {
    this.ambientLight = new AmbientLight(0xffffff, 0.6);
    this.scene.add(this.ambientLight);

    this.coreLight = new PointLight(this.colorThemes.cyber.core, 3.5, 40);
    this.coreLight.position.set(3.65, 0.1, 0);
    this.scene.add(this.coreLight);

    this.accentLight1 = new DirectionalLight(this.colorThemes.cyber.primary, 1.8);
    this.accentLight1.position.set(10, 12, 10);
    this.scene.add(this.accentLight1);

    this.accentLight2 = new DirectionalLight(this.colorThemes.cyber.secondary, 1.8);
    this.accentLight2.position.set(-10, -10, -10);
    this.scene.add(this.accentLight2);
  }

  createCentralCore() {
    this.coreGroup = new Group();
    this.baseY = 0.1;
    this.coreGroup.position.set(3.65, this.baseY, 0);

    this.globeGroup = new Group();
    this.coreGroup.add(this.globeGroup);

    const innerGeo = new SphereGeometry(1.52, 48, 36);
    this.innerMat = new MeshPhysicalMaterial({
      color: 0x4d202d,
      roughness: 0.34,
      metalness: 0.42,
      clearcoat: 0.85,
      clearcoatRoughness: 0.2,
      emissive: 0x2d111b,
      emissiveIntensity: 0.3
    });
    this.innerCore = new Mesh(innerGeo, this.innerMat);
    this.globeGroup.add(this.innerCore);

    const gridMaterial = new LineBasicMaterial({
      color: 0xf08c83,
      transparent: true,
      opacity: 0.32
    });
    const radius = 1.535;
    const segments = 96;
    const addGridLine = (points) => {
      const geometry = new BufferGeometry().setFromPoints(points);
      this.globeGroup.add(new Line(geometry, gridMaterial));
    };

    for (let latitude = -2; latitude <= 2; latitude++) {
      const angle = (latitude * Math.PI) / 7;
      const ringRadius = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const points = Array.from({ length: segments }, (_, index) => {
        const theta = (index / segments) * Math.PI * 2;
        return new Vector3(ringRadius * Math.cos(theta), y, ringRadius * Math.sin(theta));
      });
      addGridLine(points);
    }

    for (let longitude = 0; longitude < 8; longitude++) {
      const angle = (longitude / 8) * Math.PI;
      const points = Array.from({ length: segments }, (_, index) => {
        const theta = (index / segments) * Math.PI * 2;
        return new Vector3(
          radius * Math.cos(theta) * Math.cos(angle),
          radius * Math.sin(theta),
          radius * Math.cos(theta) * Math.sin(angle)
        );
      });
      addGridLine(points);
    }

    const ring1Geo = new TorusGeometry(2.2, 0.035, 12, 160);
    this.ring1Mat = new MeshPhysicalMaterial({
      color: this.colorThemes.cyber.secondary,
      roughness: 0.24,
      metalness: 0.8,
      clearcoat: 0.65
    });
    this.ring1 = new Mesh(ring1Geo, this.ring1Mat);
    this.coreGroup.add(this.ring1);

    const ring2Geo = new TorusGeometry(2.85, 0.024, 10, 160);
    this.ring2Mat = new MeshPhysicalMaterial({
      color: this.colorThemes.cyber.accent,
      roughness: 0.3,
      metalness: 0.72,
      clearcoat: 0.55
    });
    this.ring2 = new Mesh(ring2Geo, this.ring2Mat);
    this.ring2.rotation.x = Math.PI / 2.5;
    this.coreGroup.add(this.ring2);

    this.scene.add(this.coreGroup);
  }

  createSatellites() {
    this.satellitesGroup = new Group();
    this.coreGroup.add(this.satellitesGroup);

    const satelliteData = [
      { symbol: '</>', distance: 2.25, speed: 0.16, tilt: 0.38, color: '#ffb0a3' },
      { symbol: '{ }', distance: 2.75, speed: -0.12, tilt: 1.14, color: '#f08c83' },
      { symbol: '01', distance: 3.15, speed: 0.09, tilt: 2.05, color: '#e7a39c' },
      { symbol: 'λ', distance: 2.55, speed: -0.075, tilt: 2.55, color: '#d9858e' },
      { symbol: '[]', distance: 3.4, speed: 0.06, tilt: 0.82, color: '#ffb0a3' }
    ];

    this.satellites = satelliteData.map((data, index) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 128;
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.font = '600 58px "DM Mono", monospace';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.shadowColor = data.color;
      context.shadowBlur = 18;
      context.fillStyle = data.color;
      context.fillText(data.symbol, canvas.width / 2, canvas.height / 2);

      const texture = new CanvasTexture(canvas);
      texture.colorSpace = SRGBColorSpace;
      const material = new SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending
      });
      const mesh = new Sprite(material);
      const size = data.symbol === '</>' ? 0.92 : 0.76;
      mesh.scale.set(size * 1.45, size, 1);
      const pivot = new Group();
      pivot.rotation.x = data.tilt;
      pivot.rotation.y = (index * Math.PI) / 2.5;
      mesh.position.set(data.distance, 0, 0);
      pivot.add(mesh);
      this.satellitesGroup.add(pivot);

      return {
        mesh,
        pivot,
        speed: data.speed,
        data
      };
    });
  }

  createStarfield() {
    const count = 140;
    const geometry = new BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    this.starDrift = new Float32Array(count);

    const c1 = new Color(this.colorThemes.cyber.primary);
    const c2 = new Color(this.colorThemes.cyber.secondary);
    const c3 = new Color(this.colorThemes.cyber.accent);

    for (let i = 0; i < count; i++) {
      // Keep the dust inside the visible field so it reads as a moving backdrop.
      positions[i * 3] = (Math.random() - 0.5) * 34;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 19;
      positions[i * 3 + 2] = -8 - Math.random() * 24;
      this.starDrift[i] = 0.08 + Math.random() * 0.2;

      // Color selection
      const pick = Math.random();
      const chosenColor = pick < 0.4 ? c1 : pick < 0.75 ? c2 : c3;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    geometry.setAttribute('color', new BufferAttribute(colors, 3));

    // Particle Material
    const material = new PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.18,
      blending: AdditiveBlending
    });

    this.starfield = new Points(geometry, material);
    this.scene.add(this.starfield);
  }

  bindEvents() {
    this.onMouseMove = (e) => {
      const bounds = this.container.getBoundingClientRect();
      const insideScene = e.clientX >= bounds.left && e.clientX <= bounds.right
        && e.clientY >= bounds.top && e.clientY <= bounds.bottom;
      this.mouse.targetX = insideScene ? ((e.clientX - bounds.left) / bounds.width) * 2 - 1 : 0;
      this.mouse.targetY = insideScene ? -((e.clientY - bounds.top) / bounds.height) * 2 + 1 : 0;
    };

    this.onResize = () => {
      if (!this.container) return;
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      if (!width || !height) return;
      this.camera.aspect = width / height;

      if (width < 768) {
        this.camera.position.set(0, 0, 21);
        this.baseY = 0.1;
        this.coreGroup.position.set(0, this.baseY, 0);
        this.coreGroup.scale.set(0.76, 0.76, 0.76);
      } else {
        this.camera.position.set(0, 0, CAMERA_Z);
        this.camera.updateProjectionMatrix();
        this.alignToAnchor(width, height);
      }

      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(this.pixelRatio());
    };

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('resize', this.onResize);
    this.onVisibilityChange = () => {
      if (document.hidden) this.stopLoop();
      else this.startLoop();
    };
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    // The canvas only matters near the top of the page; pause it once it scrolls away.
    this.isInView = true;
    if ('IntersectionObserver' in window) {
      this.viewObserver = new IntersectionObserver(([entry]) => {
        this.isInView = entry.isIntersecting;
        if (this.isInView) this.startLoop();
        else this.stopLoop();
      });
      this.viewObserver.observe(this.container);
    }

    // Initial responsive check
    this.onResize();

  }

  startLoop() {
    if (this.animationFrameId || document.hidden || !this.isInView) return;
    this.clock.getDelta();
    this.animate();
  }

  stopLoop() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    this.animationFrameId = null;
  }

  // Centers the globe and its orbit rings on the hero phone so they frame it like a halo.
  alignToAnchor(width, height) {
    const anchor = document.getElementById('hero-phone');
    const frame = anchor?.querySelector('.phone-frame');
    if (!frame) {
      this.baseY = 0.1;
      this.coreGroup.position.set(3.65, this.baseY, 0);
      this.coreGroup.scale.set(1, 1, 1);
      return;
    }
    const box = this.container.getBoundingClientRect();
    const rect = frame.getBoundingClientRect();
    const halfHeight = Math.tan((this.camera.fov * Math.PI) / 360) * CAMERA_Z;
    const halfWidth = halfHeight * (width / height);
    const pxPerUnit = height / (2 * halfHeight);

    const x = (((rect.left + rect.width / 2 - box.left) / width) * 2 - 1) * halfWidth;
    this.baseY = -(((rect.top + rect.height / 2 - box.top) / height) * 2 - 1) * halfHeight;
    this.coreGroup.position.set(x, this.baseY, 0);

    // Outer ring radius is 2.85 units; make it clear the phone by ~60% of its width.
    const ringRadiusPx = rect.width * HALO_RADIUS_FACTOR;
    const scale = ringRadiusPx / (2.85 * pxPerUnit);
    this.coreGroup.scale.setScalar(scale);
    this.coreLight.position.copy(this.coreGroup.position);
  }

  animate() {
    if (document.hidden || !this.isInView) return;
    if (this.reduceMotion) {
      this.renderer.render(this.scene, this.camera);
      return;
    }
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.035;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.035;

    // Core rotation
    if (this.coreGroup) {
      this.globeGroup.rotation.x = Math.sin(elapsedTime * 0.22) * 0.08;
      this.globeGroup.rotation.y += 0.075 * delta;
      const pulseScale = 1 + Math.sin(elapsedTime * 0.8) * 0.012;
      this.globeGroup.scale.setScalar(pulseScale);

      this.ring1.rotation.z += 0.11 * delta;
      this.ring2.rotation.y -= 0.075 * delta;

      this.coreGroup.position.y = this.baseY + Math.sin(elapsedTime * 0.55) * 0.12;
      this.coreGroup.rotation.y = this.mouse.x * 0.18 + Math.sin(elapsedTime * 0.17) * 0.06;
      this.coreGroup.rotation.x = this.mouse.y * 0.12 + Math.sin(elapsedTime * 0.22) * 0.035;
      this.coreLight.intensity = 2.7 + Math.sin(elapsedTime * 0.7) * 0.22;
    }

    // Satellites orbiting
    this.satellites.forEach(sat => {
      sat.pivot.rotation.z += sat.speed * delta;
    });

    if (this.starfield) {
      const positions = this.starfield.geometry.attributes.position.array;
      for (let i = 0; i < this.starDrift.length; i++) {
        const yIndex = i * 3 + 1;
        positions[yIndex] += this.starDrift[i] * delta;
        if (positions[yIndex] > 10) positions[yIndex] = -10;
      }
      this.starfield.geometry.attributes.position.needsUpdate = true;
      this.starfield.rotation.y = elapsedTime * 0.009 + this.mouse.x * 0.025;
      this.starfield.rotation.x = this.mouse.y * 0.025;
    }

    this.camera.position.x = this.mouse.x * 0.28;
    this.camera.position.y = this.mouse.y * 0.16;
    this.camera.lookAt(0, 0, 0);

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    this.stopLoop();
    this.viewObserver?.disconnect();
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
    }
  }
}
