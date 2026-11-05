// Renders monochrome 3D artwork for the homepage into public/images/xovra.
// Runs three.js inside headless Chromium (needs Playwright).
// Usage: node scripts/render-images.mjs [scene ...]
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(path.join(root, 'node_modules/three', p), 'utf8');
const sources = {
  '/three.module.js': read('build/three.module.js'),
  '/three.core.js': read('build/three.core.js'),
  '/RoomEnvironment.js': read('examples/jsm/environments/RoomEnvironment.js').replace("from 'three'", "from '/three.module.js'"),
  '/RoundedBoxGeometry.js': read('examples/jsm/geometries/RoundedBoxGeometry.js').replace("from 'three'", "from '/three.module.js'"),
};

const page = `<!doctype html><html><body style="margin:0;background:#000">
<script type="module">
import * as THREE from '/three.module.js';
import { RoomEnvironment } from '/RoomEnvironment.js';
import { RoundedBoxGeometry } from '/RoundedBoxGeometry.js';

function setup(w, h, bg, fov = 35) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setSize(w, h);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.innerHTML = '';
  document.body.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(bg);
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
  const camera = new THREE.PerspectiveCamera(fov, w / h, 0.1, 200);
  return { renderer, scene, camera };
}

const chrome = (c = 0xffffff, r = 0.12) =>
  new THREE.MeshPhysicalMaterial({ color: c, metalness: 1, roughness: r, clearcoat: 1, clearcoatRoughness: 0.1 });

function shadowFloor(scene, color, y = 0) {
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.ShadowMaterial({ opacity: 0.18 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = y;
  floor.receiveShadow = true;
  scene.add(floor);
}

function keyLight(scene, x, y, z, i = 1.6) {
  const l = new THREE.DirectionalLight(0xffffff, i);
  l.position.set(x, y, z);
  l.castShadow = true;
  l.shadow.mapSize.set(2048, 2048);
  l.shadow.camera.left = -12; l.shadow.camera.right = 12; l.shadow.camera.top = 12; l.shadow.camera.bottom = -12;
  l.shadow.radius = 8;
  scene.add(l);
}

// A smartphone: rounded body, dark glass screen (lit = white glowing screen).
function phone({ x = 0, y = 0, z = 0, rotY = 0, rotZ = 0, lit = false, scale = 1 } = {}) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(2.1, 4.3, 0.26, 8, 0.3), new THREE.MeshPhysicalMaterial({ color: 0x1a1a1a, metalness: 0.6, roughness: 0.25, clearcoat: 1 }));
  const screenMat = lit
    ? new THREE.MeshPhysicalMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.6, roughness: 0.1, clearcoat: 1 })
    : new THREE.MeshPhysicalMaterial({ color: 0x050505, roughness: 0.05, clearcoat: 1, metalness: 0.2 });
  const screen = new THREE.Mesh(new RoundedBoxGeometry(1.9, 4.08, 0.02, 6, 0.22), screenMat);
  screen.position.z = 0.135;
  const cam = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.03, 24), new THREE.MeshBasicMaterial({ color: 0x222222 }));
  cam.rotation.x = Math.PI / 2; cam.position.set(0, 1.85, 0.15);
  g.add(body, screen, cam);
  g.position.set(x, y, z); g.rotation.set(0, rotY, rotZ); g.scale.setScalar(scale);
  g.traverse((m) => (m.castShadow = true));
  return g;
}

// A speech bubble: rounded slab with a small tail.
function bubble(mat, { x = 0, y = 0, z = 0, w = 3, h = 1.5, flip = false, rotY = 0 } = {}) {
  const g = new THREE.Group();
  const slab = new THREE.Mesh(new RoundedBoxGeometry(w, h, 0.5, 8, 0.25 + h * 0.15), mat);
  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.6, 32), mat);
  tail.rotation.z = flip ? Math.PI * 0.8 : -Math.PI * 0.8;
  tail.position.set((flip ? 1 : -1) * (w / 2 - 0.45), -h / 2 - 0.15, 0);
  g.add(slab, tail);
  g.position.set(x, y, z); g.rotation.y = rotY;
  g.traverse((m) => (m.castShadow = true));
  return g;
}

const scenes = {
  // Hero thumbnail: a phone sending a signal.
  'hero-phone': () => {
    const { renderer, scene, camera } = setup(1200, 900, 0xededec, 30);
    camera.position.set(3.2, 1.6, 9); camera.lookAt(0.6, 0.2, 0);
    shadowFloor(scene, 0, -2.6);
    keyLight(scene, -4, 8, 6, 1.4);
    scene.add(phone({ x: -0.6, y: 0, rotY: 0.45, rotZ: -0.08, lit: false }));
    const arcMat = (o) => new THREE.MeshBasicMaterial({ color: 0x3b6bff, transparent: true, opacity: o });
    [1.1, 1.75, 2.4].forEach((r, i) => {
      const arc = new THREE.Mesh(new THREE.TorusGeometry(r, 0.035, 16, 120, Math.PI / 2.2), arcMat(1 - i * 0.28));
      arc.position.set(0.35, 1.45, 0.2); arc.rotation.set(0, 0.35, -0.5); scene.add(arc);
    });
    renderer.render(scene, camera);
  },

  // Number pools: several phones in an arc, one lit and forward.
  'pool-phones': () => {
    const { renderer, scene, camera } = setup(1600, 1600, 0xebebea, 30);
    camera.position.set(0, 3.6, 25); camera.lookAt(0, 0.4, 0);
    shadowFloor(scene, 0, -2.25);
    keyLight(scene, -3, 9, 7, 1.5);
    [-2, -1, 0, 1, 2].forEach((i) => {
      const a = i * 0.42;
      scene.add(phone({ x: Math.sin(a) * 5.2, z: -Math.cos(a) * 5.2 + 5.2 + (i === 0 ? 0.9 : 0), rotY: -a * 0.9, lit: i === 0, scale: i === 0 ? 1.08 : 0.92 }));
    });
    renderer.render(scene, camera);
  },

  // Integrations: four plugs connecting into a central hub (logo sits on top of it).
  'integrations-hub': () => {
    const { renderer, scene, camera } = setup(1800, 1200, 0x0e0e0f, 30);
    camera.position.set(0, 0, 11.5); camera.lookAt(0, 0, 0);
    const hub = new THREE.Mesh(new THREE.SphereGeometry(1.25, 96, 96), chrome(0xffffff, 0.06));
    scene.add(hub);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.05, 24, 160), chrome(0x9a9a9a, 0.2));
    scene.add(ring);
    const dark = new THREE.MeshPhysicalMaterial({ color: 0x1c1c1e, roughness: 0.35, clearcoat: 1 });
    const metal = chrome(0xd8d8d8, 0.12);
    [[1, 0.35], [-1, -0.35], [0.35, 1], [-0.35, -1]].forEach(([dx, dy], i) => {
      const dir = new THREE.Vector3(dx, dy, 0).normalize();
      const far = dir.clone().multiplyScalar(9.5);
      const near = dir.clone().multiplyScalar(3.1);
      const mid = far.clone().lerp(near, 0.5).add(new THREE.Vector3(0, 0, i % 2 ? 1.2 : -1.2));
      const curve = new THREE.CatmullRomCurve3([far, mid, near]);
      scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 80, 0.24, 20), dark));
      const plug = new THREE.Group();
      const body = new THREE.Mesh(new RoundedBoxGeometry(0.9, 0.62, 0.62, 5, 0.12), metal);
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.4, 32), dark);
      collar.rotation.z = Math.PI / 2; collar.position.x = -0.6;
      [-0.14, 0.14].forEach((o) => {
        const prong = new THREE.Mesh(new RoundedBoxGeometry(0.42, 0.07, 0.16, 2, 0.03), chrome(0xffffff, 0.05));
        prong.position.set(0.62, o, 0); plug.add(prong);
      });
      plug.add(body, collar);
      plug.position.copy(near.clone().add(dir.clone().multiplyScalar(0.35)));
      plug.rotation.z = Math.atan2(-dir.y, -dir.x);
      plug.scale.setScalar(1.7);
      scene.add(plug);
    });
    const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(4, 6, 8); scene.add(key);
    renderer.toneMappingExposure = 0.95;
    renderer.render(scene, camera);
  },

  // Live AI rebuttals: two speech bubbles, one typing.
  'rebuttal-bubbles': () => {
    const { renderer, scene, camera } = setup(1600, 1200, 0xededec, 30);
    camera.position.set(1.5, 1.4, 11); camera.lookAt(0, 0.2, 0);
    shadowFloor(scene, 0, -2.8);
    keyLight(scene, -4, 8, 6, 1.4);
    const white = new THREE.MeshPhysicalMaterial({ color: 0xfafafa, roughness: 0.25, clearcoat: 1 });
    const black = new THREE.MeshPhysicalMaterial({ color: 0x151515, roughness: 0.3, clearcoat: 1 });
    scene.add(bubble(black, { x: -1.3, y: 0.9, w: 4.2, h: 2.2, flip: false, rotY: 0.25 }));
    scene.add(bubble(white, { x: 1.2, y: -0.9, z: 0.8, w: 3.6, h: 1.9, flip: true, rotY: -0.2 }));
    [-0.7, 0, 0.7].forEach((x, i) => {
      const d = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), chrome(i === 1 ? 0xffffff : 0xb0b0b0, 0.08));
      d.position.set(-1.3 + x * Math.cos(0.25), 0.9, 0.42 - x * Math.sin(0.25)); scene.add(d);
    });
    renderer.render(scene, camera);
  },

  // Two-way SMS: a column of message bubbles.
  'sms-bubbles': () => {
    const { renderer, scene, camera } = setup(1600, 1200, 0x111214, 30);
    camera.position.set(2.5, 0.5, 12); camera.lookAt(0, 0, 0);
    keyLight(scene, -4, 8, 6, 1.6);
    const light = new THREE.MeshPhysicalMaterial({ color: 0xf2f2f2, roughness: 0.25, clearcoat: 1 });
    const grey = new THREE.MeshPhysicalMaterial({ color: 0x3a3c40, roughness: 0.3, metalness: 0.2, clearcoat: 1 });
    [[-1.2, 2.3, 3.4, grey, false], [1.1, 0.75, 3.0, light, true], [-1.0, -0.8, 3.8, grey, false], [1.3, -2.3, 2.4, light, true]].forEach(([x, y, w, m, f], i) => {
      scene.add(bubble(m, { x, y, z: i * 0.15, w, h: 1.15, flip: f, rotY: 0.18 }));
    });
    renderer.render(scene, camera);
  },

  // Compliance controls: a chrome shield with a check.
  'shield': () => {
    const { renderer, scene, camera } = setup(1600, 1200, 0xededec, 30);
    camera.position.set(2.2, 1.2, 11); camera.lookAt(0, 0.1, 0);
    shadowFloor(scene, 0, -3.1);
    keyLight(scene, -4, 8, 6, 1.4);
    const sh = new THREE.Shape();
    sh.moveTo(0, 2.6); sh.bezierCurveTo(1.2, 2.2, 1.9, 2.15, 2.2, 2.1);
    sh.bezierCurveTo(2.2, 0.2, 1.6, -1.4, 0, -2.6); sh.bezierCurveTo(-1.6, -1.4, -2.2, 0.2, -2.2, 2.1);
    sh.bezierCurveTo(-1.9, 2.15, -1.2, 2.2, 0, 2.6);
    const geo = new THREE.ExtrudeGeometry(sh, { depth: 0.55, bevelEnabled: true, bevelThickness: 0.18, bevelSize: 0.16, bevelSegments: 10, curveSegments: 48 });
    geo.center();
    const shield = new THREE.Mesh(geo, chrome(0xe6e6e6, 0.1)); shield.castShadow = true;
    shield.rotation.y = -0.35; scene.add(shield);
    const check = new THREE.CatmullRomCurve3([new THREE.Vector3(-0.85, 0.05, 0), new THREE.Vector3(-0.2, -0.6, 0), new THREE.Vector3(1.0, 0.85, 0)], false, 'catmullrom', 0);
    const ck = new THREE.Mesh(new THREE.TubeGeometry(check, 60, 0.17, 20), new THREE.MeshPhysicalMaterial({ color: 0x111111, roughness: 0.3, clearcoat: 1 }));
    ck.position.z = 0.55; ck.rotation.y = -0.35; ck.position.x = 0.12; scene.add(ck);
    renderer.render(scene, camera);
  },

  // Campaigns: a fanned stack of cards, one raised.
  'campaign-cards': () => {
    const { renderer, scene, camera } = setup(1600, 1200, 0x111214, 30);
    camera.position.set(0, 7.5, 9.5); camera.lookAt(0, 0.2, 0.4);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshStandardMaterial({ color: 0x151618, roughness: 0.5, metalness: 0.3 }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = -0.1; floor.receiveShadow = true; scene.add(floor);
    keyLight(scene, -4, 10, 5, 1.8);
    const dark = new THREE.MeshPhysicalMaterial({ color: 0x1b1c1f, roughness: 0.3, metalness: 0.3, clearcoat: 1 });
    const lit = new THREE.MeshPhysicalMaterial({ color: 0xe9e9e9, roughness: 0.45, clearcoat: 0.4 });
    [-2, -1, 0, 1, 2].forEach((i) => {
      const c = new THREE.Mesh(new RoundedBoxGeometry(2.4, 0.08, 3.4, 4, 0.12), i === 1 ? lit : dark);
      c.position.set(i * 1.05, i === 1 ? 0.9 : 0.05 + (i + 2) * 0.09, Math.abs(i) * 0.25);
      c.rotation.y = -i * 0.16; c.rotation.x = i === 1 ? -0.25 : 0;
      c.castShadow = true; c.receiveShadow = true; scene.add(c);
    });
    scene.fog = new THREE.Fog(0x111214, 14, 28);
    renderer.render(scene, camera);
  },

  // Browser dialer: an over-ear headset with a boom mic.
  'headset': () => {
    const { renderer, scene, camera } = setup(1600, 1200, 0xededec, 30);
    camera.position.set(2.5, 1.5, 11); camera.lookAt(0, 0.4, 0);
    shadowFloor(scene, 0, -2.4);
    keyLight(scene, -4, 8, 6, 1.4);
    const matte = new THREE.MeshPhysicalMaterial({ color: 0x161616, roughness: 0.55, clearcoat: 0.3 });
    const pad = new THREE.MeshPhysicalMaterial({ color: 0x2a2a2a, roughness: 0.85 });
    const metal = chrome(0xd0d0d0, 0.12);
    const g = new THREE.Group();
    const band = new THREE.Mesh(new THREE.TorusGeometry(2.1, 0.17, 32, 120, Math.PI), matte);
    band.position.y = 0.2; g.add(band);
    const inner = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.06, 16, 120, Math.PI), metal);
    inner.position.set(0, 0.2, 0); g.add(inner);
    [-1, 1].forEach((side) => {
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.55, 64), matte);
      cup.rotation.z = Math.PI / 2; cup.position.set(side * 2.15, -0.35, 0); g.add(cup);
      const cushion = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.22, 24, 64), pad);
      cushion.rotation.y = Math.PI / 2; cushion.position.set(side * 1.85, -0.35, 0); g.add(cushion);
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.06, 64), metal);
      cap.rotation.z = Math.PI / 2; cap.position.set(side * 2.45, -0.35, 0); g.add(cap);
    });
    const boom = new THREE.CatmullRomCurve3([new THREE.Vector3(2.3, -0.6, 0.3), new THREE.Vector3(1.8, -1.6, 1.4), new THREE.Vector3(0.6, -1.9, 1.9)]);
    g.add(new THREE.Mesh(new THREE.TubeGeometry(boom, 60, 0.06, 16), metal));
    const mic = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.3, 8, 24), matte);
    mic.position.set(0.5, -1.92, 1.95); mic.rotation.z = Math.PI / 2; g.add(mic);
    g.rotation.y = -0.5; g.traverse((m) => (m.castShadow = true));
    scene.add(g);
    renderer.render(scene, camera);
  },

  // Enrich and score: stacked lead cards, a glass lens over the top one, a scan line
  // passing through, and three score dots rising from the stack.
  'step-2-enrich': () => {
    const { renderer, scene, camera } = setup(1600, 1200, 0xebebea, 30);
    camera.position.set(6.4, 5.4, 8.2); camera.lookAt(-0.2, 1.35, 0);
    shadowFloor(scene);
    keyLight(scene, -4, 10, 6);

    const cardMat = new THREE.MeshPhysicalMaterial({ color: 0xf7f7f6, roughness: 0.35, clearcoat: 0.6 });
    const darkMat = new THREE.MeshPhysicalMaterial({ color: 0x1a1a1a, roughness: 0.4, clearcoat: 0.8 });
    for (let i = 0; i < 6; i++) {
      const card = new THREE.Mesh(new RoundedBoxGeometry(4.2, 0.14, 2.7, 6, 0.12), i === 5 ? cardMat : i % 2 ? darkMat : cardMat);
      card.position.set(i * 0.06, 0.12 + i * 0.32, -i * 0.05);
      card.rotation.y = 0.12 - i * 0.035;
      card.castShadow = true; card.receiveShadow = true;
      scene.add(card);
    }
    // Simple bars on the top card stand in for listing details (no text).
    const top = 0.12 + 5 * 0.32 + 0.08;
    const barMat = new THREE.MeshStandardMaterial({ color: 0xc9c9c7, roughness: 0.6 });
    [[1.9, -0.6], [1.3, -0.15], [1.6, 0.3]].forEach(([w, z]) => {
      const bar = new THREE.Mesh(new RoundedBoxGeometry(w, 0.03, 0.16, 2, 0.015), barMat);
      bar.position.set(-0.7 + w / 2, top, z); bar.rotation.y = 0.12 - 5 * 0.035; scene.add(bar);
    });
    const badge = new THREE.Mesh(new RoundedBoxGeometry(0.8, 0.05, 0.34, 3, 0.05), darkMat);
    badge.position.set(1.25, top + 0.01, -0.6); badge.rotation.y = 0.12 - 5 * 0.035; scene.add(badge);

    // Magnifying lens.
    const lens = new THREE.Group();
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.11, 48, 160), chrome(0xe8e8e8, 0.08));
    const glass = new THREE.Mesh(
      new THREE.CylinderGeometry(1.0, 1.0, 0.05, 96),
      new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 1, roughness: 0.02, thickness: 0.6, ior: 1.5, transparent: true }),
    );
    glass.rotation.x = Math.PI / 2;
    const handle = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 1.5, 8, 32), chrome(0x2a2a2a, 0.25));
    handle.position.set(1.45, -1.05, 0); handle.rotation.z = Math.PI / 4;
    lens.add(ring, glass, handle);
    lens.position.set(0.1, top + 1.25, 0.2);
    lens.rotation.set(-1.15, 0.15, 0.3);
    lens.traverse((m) => (m.castShadow = true));
    scene.add(lens);

    // Scan line.
    const scan = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.012, 0.02), new THREE.MeshBasicMaterial({ color: 0x3b6bff }));
    scan.position.set(0.15, 1.05, 1.42); scan.rotation.y = 0.04; scene.add(scan);
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 0.22), new THREE.MeshBasicMaterial({ color: 0x3b6bff, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false }));
    glow.position.copy(scan.position); glow.rotation.y = 0.04; scene.add(glow);

    // Score dots rising, one per pitch check.
    [0.55, 0.95, 1.35].forEach((y, i) => {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.17 + i * 0.03, 48, 48), i === 2 ? chrome(0xffffff, 0.04) : chrome(0x9a9a9a, 0.2));
      s.position.set(-2.55, top + y, 0.6 - i * 0.35); s.castShadow = true; scene.add(s);
    });
    renderer.render(scene, camera);
  },

  // Track outcomes in Sheets: a floating grid of cells; some cells rise and light up
  // like rows being written back.
  'step-4-sheets': () => {
    const { renderer, scene, camera } = setup(1600, 1200, 0x111214, 28);
    camera.position.set(7.6, 8.2, 7.6); camera.lookAt(0, -0.3, 0);
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshStandardMaterial({ color: 0x141517, roughness: 0.5, metalness: 0.3 }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = -0.2; floor.receiveShadow = true; scene.add(floor);
    keyLight(scene, -6, 12, 4, 1.8);
    scene.fog = new THREE.Fog(0x111214, 16, 34);

    const cell = new RoundedBoxGeometry(0.92, 0.18, 0.62, 4, 0.06);
    const base = new THREE.MeshPhysicalMaterial({ color: 0x2a2c2f, roughness: 0.35, metalness: 0.2, clearcoat: 0.8 });
    const header = new THREE.MeshPhysicalMaterial({ color: 0x55585c, roughness: 0.3, metalness: 0.4, clearcoat: 1 });
    const lit = new THREE.MeshPhysicalMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.55, roughness: 0.2, clearcoat: 1 });
    const cols = 6, rows = 9;
    const litRows = { 2: 1, 4: 2, 5: 3, 7: 1.5 };
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const isHeader = r === 0;
        const isLit = litRows[r] && c >= 1;
        const m = new THREE.Mesh(cell, isHeader ? header : isLit ? lit : base);
        m.position.set((c - cols / 2 + 0.5) * 1.02, isLit ? 0.15 + litRows[r] * 0.18 : 0, (r - rows / 2 + 0.5) * 0.72);
        m.castShadow = true; m.receiveShadow = true;
        scene.add(m);
      }
    }
    // Check marks on the first column of lit rows, as chrome spheres.
    Object.keys(litRows).forEach((r) => {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.16, 48, 48), chrome(0xffffff, 0.05));
      s.position.set((0 - cols / 2 + 0.5) * 1.02, 0.32, (Number(r) - rows / 2 + 0.5) * 0.72);
      s.castShadow = true; scene.add(s);
    });
    renderer.toneMappingExposure = 1.05;
    renderer.render(scene, camera);
  },
};

window.renderScene = (name) => { scenes[name](); return document.querySelector('canvas').toDataURL('image/png'); };
window.sceneNames = Object.keys(scenes);
window.ready = true;
</script></body></html>`;

const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await browser.newPage();
p.on('pageerror', (e) => console.error('[page error]', e));
await p.route('**/*', (route) => {
  const { pathname } = new URL(route.request().url());
  const body = pathname === '/' ? page : sources[pathname];
  if (body === undefined) return route.fulfill({ status: 404, body: '' });
  route.fulfill({ status: 200, contentType: pathname === '/' ? 'text/html' : 'text/javascript', body });
});
await p.goto('http://render.local/');
await p.waitForFunction(() => window.ready === true);
const only = process.argv.slice(2);
const names = (await p.evaluate(() => window.sceneNames)).filter((n) => !only.length || only.includes(n));
for (const name of names) {
  const data = await p.evaluate((n) => window.renderScene(n), name);
  writeFileSync(path.join(root, 'public/images/xovra', `${name}.png`), Buffer.from(data.split(',')[1], 'base64'));
  console.log(`rendered ${name}`);
}
await browser.close();
