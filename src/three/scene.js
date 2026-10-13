import * as THREE from 'three';

export class Portfolio3DScene {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollProgress = 0;
    this.theme = 'cyber'; // cyber | matrix | solar
    this.satellites = [];
    this.interactiveObjects = [];
    this.clock = new THREE.Clock();

    this.colorThemes = {
      cyber: {
        bg: 0x070b19,
        primary: 0x06b6d4,   // cyan
        secondary: 0x6366f1, // indigo
        accent: 0xa855f7,    // purple
        core: 0x38bdf8,
        particles: [0x06b6d4, 0x6366f1, 0x38bdf8]
      },
      matrix: {
        bg: 0x04130b,
        primary: 0x10b981,   // emerald
        secondary: 0x059669, // green
        accent: 0x34d399,    // light green
        core: 0x6ee7b7,
        particles: [0x10b981, 0x34d399, 0xa7f3d0]
      },
      solar: {
        bg: 0x120710,
        primary: 0xf59e0b,   // amber
        secondary: 0xec4899, // pink
        accent: 0xef4444,    // red
        core: 0xfbbf24,
        particles: [0xf59e0b, 0xec4899, 0xf43f5e]
      }
    };

    this.init();
  }

  init() {
    // 1. Scene & Camera
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(this.colorThemes.cyber.bg, 0.018);

    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 1000);
    this.camera.position.set(0, 0, 18);

    // 2. Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.container.appendChild(this.renderer.domElement);

    // 3. Lighting
    this.setupLights();

    // 4. Geometry & Objects
    this.createStarfield();
    this.createCentralCore();
    this.createSatellites();
    this.createBackgroundGrid();

    // 5. Event Listeners
    this.bindEvents();

    // 6. Start Loop
    this.animate();
  }

  setupLights() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(this.ambientLight);

    this.coreLight = new THREE.PointLight(this.colorThemes.cyber.core, 3.5, 40);
    this.coreLight.position.set(0, 0, 0);
    this.scene.add(this.coreLight);

    this.accentLight1 = new THREE.DirectionalLight(this.colorThemes.cyber.primary, 1.8);
    this.accentLight1.position.set(10, 12, 10);
    this.scene.add(this.accentLight1);

    this.accentLight2 = new THREE.DirectionalLight(this.colorThemes.cyber.secondary, 1.8);
    this.accentLight2.position.set(-10, -10, -10);
    this.scene.add(this.accentLight2);
  }

  createCentralCore() {
    this.coreGroup = new THREE.Group();
    this.coreGroup.position.set(3.5, 0.5, 0); // Positioned slightly to the right of hero text

    // Inner glowing crystal
    const innerGeo = new THREE.IcosahedronGeometry(1.6, 1);
    this.innerMat = new THREE.MeshStandardMaterial({
      color: this.colorThemes.cyber.primary,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true,
      emissive: this.colorThemes.cyber.core,
      emissiveIntensity: 0.5
    });
    this.innerCore = new THREE.Mesh(innerGeo, this.innerMat);
    this.coreGroup.add(this.innerCore);

    // Pulsing solid center
    const nucleusGeo = new THREE.OctahedronGeometry(0.8, 0);
    this.nucleusMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: this.colorThemes.cyber.primary,
      emissiveIntensity: 1.0,
      roughness: 0.2
    });
    this.nucleus = new THREE.Mesh(nucleusGeo, this.nucleusMat);
    this.coreGroup.add(this.nucleus);

    // Ring 1 (Torus)
    const ring1Geo = new THREE.TorusGeometry(2.4, 0.04, 16, 100);
    this.ring1Mat = new THREE.MeshStandardMaterial({
      color: this.colorThemes.cyber.secondary,
      emissive: this.colorThemes.cyber.secondary,
      emissiveIntensity: 0.4,
      metalness: 0.8
    });
    this.ring1 = new THREE.Mesh(ring1Geo, this.ring1Mat);
    this.coreGroup.add(this.ring1);

    // Ring 2 (Torus larger tilted)
    const ring2Geo = new THREE.TorusGeometry(3.1, 0.035, 16, 100);
    this.ring2Mat = new THREE.MeshStandardMaterial({
      color: this.colorThemes.cyber.accent,
      emissive: this.colorThemes.cyber.accent,
      emissiveIntensity: 0.4,
      metalness: 0.8
    });
    this.ring2 = new THREE.Mesh(ring2Geo, this.ring2Mat);
    this.ring2.rotation.x = Math.PI / 2.5;
    this.coreGroup.add(this.ring2);

    // Ring 3 (Outer dotted ring)
    const ring3Geo = new THREE.TorusGeometry(3.8, 0.02, 16, 120);
    this.ring3Mat = new THREE.MeshBasicMaterial({
      color: this.colorThemes.cyber.primary,
      wireframe: true
    });
    this.ring3 = new THREE.Mesh(ring3Geo, this.ring3Mat);
    this.ring3.rotation.y = Math.PI / 3;
    this.coreGroup.add(this.ring3);

    this.scene.add(this.coreGroup);
    this.interactiveObjects.push(this.innerCore, this.nucleus);
  }

  createSatellites() {
    this.satellitesGroup = new THREE.Group();
    this.coreGroup.add(this.satellitesGroup);

    // Satellites representing core competencies
    const satelliteData = [
      { name: "Lucas (blackxzin)", color: 0x38bdf8, distance: 4.8, speed: 0.6, size: 0.35, shape: 'dodeca' },
      { name: "Felipe (Luvizotto)", color: 0xa855f7, distance: 5.6, speed: -0.45, size: 0.35, shape: 'icosa' },
      { name: "FreelaHunter AI", color: 0x10b981, distance: 4.2, speed: 0.8, size: 0.28, shape: 'tetra' },
      { name: "Fullstack & Cloud", color: 0x6366f1, distance: 6.2, speed: -0.3, size: 0.25, shape: 'octa' },
      { name: "Cyber Shield", color: 0xf59e0b, distance: 5.1, speed: 0.5, size: 0.26, shape: 'cube' }
    ];

    this.satellites = satelliteData.map((data, index) => {
      let geo;
      if (data.shape === 'dodeca') geo = new THREE.DodecahedronGeometry(data.size);
      else if (data.shape === 'icosa') geo = new THREE.IcosahedronGeometry(data.size);
      else if (data.shape === 'tetra') geo = new THREE.TetrahedronGeometry(data.size);
      else if (data.shape === 'octa') geo = new THREE.OctahedronGeometry(data.size);
      else geo = new THREE.BoxGeometry(data.size, data.size, data.size);

      const mat = new THREE.MeshStandardMaterial({
        color: data.color,
        emissive: data.color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.7
      });

      const mesh = new THREE.Mesh(geo, mat);

      // Line connecting to core
      const lineMat = new THREE.LineBasicMaterial({
        color: data.color,
        transparent: true,
        opacity: 0.25
      });
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(data.distance, 0, 0)
      ]);
      const line = new THREE.Line(lineGeo, lineMat);

      const pivot = new THREE.Group();
      pivot.rotation.x = (index * Math.PI) / 3;
      pivot.rotation.y = (index * Math.PI) / 4;
      mesh.position.set(data.distance, 0, 0);

      pivot.add(mesh);
      pivot.add(line);
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
    const count = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const c1 = new THREE.Color(this.colorThemes.cyber.primary);
    const c2 = new THREE.Color(this.colorThemes.cyber.secondary);
    const c3 = new THREE.Color(this.colorThemes.cyber.accent);

    for (let i = 0; i < count; i++) {
      // Spread in a large 3D cylinder/sphere space
      const radius = 25 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi) - 10;

      // Color selection
      const pick = Math.random();
      const chosenColor = pick < 0.4 ? c1 : pick < 0.75 ? c2 : c3;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    this.starfield = new THREE.Points(geometry, material);
    this.scene.add(this.starfield);
  }

  createBackgroundGrid() {
    // 3D wireframe plane at the bottom for cyberpunk depth
    const gridHelper = new THREE.GridHelper(80, 50, this.colorThemes.cyber.secondary, this.colorThemes.cyber.bg);
    gridHelper.position.y = -10;
    gridHelper.material.opacity = 0.2;
    gridHelper.material.transparent = true;
    this.grid = gridHelper;
    this.scene.add(this.grid);
  }

  bindEvents() {
    this.onMouseMove = (e) => {
      // Normalize -1 to 1
      this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    this.onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    this.onResize = () => {
      if (!this.container) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.camera.aspect = width / height;

      // Responsive adjustments for mobile screens
      if (width < 768) {
        this.camera.position.z = 24;
        this.coreGroup.position.set(0, 4.2, 0); // Center core on mobile and lift up
        this.coreGroup.scale.set(0.7, 0.7, 0.7);
      } else {
        this.camera.position.z = 18;
        this.coreGroup.position.set(3.8, 0.5, 0);
        this.coreGroup.scale.set(1, 1, 1);
      }

      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize);

    // Initial responsive check
    this.onResize();

    // Core interactive click burst
    this.container.addEventListener('click', (e) => {
      this.triggerCoreBurst();
    });
  }

  triggerCoreBurst() {
    // Boost rotation & glow briefly
    if (this.coreGroup) {
      this.burstSpin = 0.3;
      this.innerMat.emissiveIntensity = 1.6;
      setTimeout(() => {
        if (this.innerMat) this.innerMat.emissiveIntensity = 0.5;
      }, 600);
    }
  }

  setTheme(themeName) {
    if (!this.colorThemes[themeName]) return;
    this.theme = themeName;
    const t = this.colorThemes[themeName];

    // Update scene fog
    this.scene.fog.color.setHex(t.bg);

    // Update lights
    this.coreLight.color.setHex(t.core);
    this.accentLight1.color.setHex(t.primary);
    this.accentLight2.color.setHex(t.secondary);

    // Update materials
    this.innerMat.color.setHex(t.primary);
    this.innerMat.emissive.setHex(t.core);
    this.nucleusMat.emissive.setHex(t.primary);
    this.ring1Mat.color.setHex(t.secondary);
    this.ring1Mat.emissive.setHex(t.secondary);
    this.ring2Mat.color.setHex(t.accent);
    this.ring2Mat.emissive.setHex(t.accent);
    this.ring3Mat.color.setHex(t.primary);
    if (this.grid) this.grid.material.color.setHex(t.secondary);

    // Trigger visual burst
    this.triggerCoreBurst();
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Mouse lerp damping for silky smooth feel
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // Core rotation
    const burst = this.burstSpin || 0;
    if (this.burstSpin > 0) this.burstSpin *= 0.95;

    if (this.coreGroup) {
      this.coreGroup.rotation.y = elapsedTime * 0.25 + this.mouse.x * 0.4 + burst;
      this.coreGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15 + this.mouse.y * 0.4;

      this.innerCore.rotation.x += (0.4 + burst) * delta;
      this.innerCore.rotation.y += (0.6 + burst) * delta;

      this.nucleus.rotation.y -= 0.8 * delta;
      const pulseScale = 1 + Math.sin(elapsedTime * 3) * 0.12;
      this.nucleus.scale.set(pulseScale, pulseScale, pulseScale);

      this.ring1.rotation.z += 0.3 * delta;
      this.ring2.rotation.y -= 0.25 * delta;
      this.ring3.rotation.x += 0.15 * delta;

      // Vertical floating motion
      this.coreGroup.position.y = (window.innerWidth < 768 ? 4.2 : 0.5) + Math.sin(elapsedTime * 1.5) * 0.3 - (this.scrollProgress * 4);
    }

    // Satellites orbiting
    this.satellites.forEach(sat => {
      sat.pivot.rotation.z += sat.speed * delta;
      sat.mesh.rotation.y += 1.5 * delta;
      sat.mesh.rotation.x += 1.0 * delta;
    });

    // Starfield gentle drift and scroll reactivity
    if (this.starfield) {
      this.starfield.rotation.y = elapsedTime * 0.02 + this.mouse.x * 0.1;
      this.starfield.rotation.x = this.mouse.y * 0.08;
      this.starfield.position.y = this.scrollProgress * 15;
    }

    // Camera reacts to mouse & scroll
    this.camera.position.x = this.mouse.x * 1.2;
    this.camera.position.y = this.mouse.y * 0.8 - (this.scrollProgress * 3);
    this.camera.lookAt(0, -this.scrollProgress * 2, 0);

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
    }
  }
}
