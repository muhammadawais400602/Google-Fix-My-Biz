// Renders the monochrome 3D artwork used on the homepage.
// Runs three.js inside headless Chromium and saves PNGs to public/images.
// Usage: npm run render:images
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// Playwright may be a project dep or a global install.
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const threeSrc = readFileSync(path.join(root, 'node_modules/three/build/three.module.js'), 'utf8');
const threeCore = readFileSync(path.join(root, 'node_modules/three/build/three.core.js'), 'utf8');
const roomEnv = readFileSync(
  path.join(root, 'node_modules/three/examples/jsm/environments/RoomEnvironment.js'),
  'utf8',
);

const page = `<!doctype html><html><body style="margin:0;background:#000">
<script type="importmap">{"imports":{"three":"/three.module.js"}}</script>
<script type="module">
import * as THREE from 'three';
import { RoomEnvironment } from '/RoomEnvironment.js';

function setup(w, h, bg, fov = 35) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setSize(w, h);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  document.body.innerHTML = '';
  document.body.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(bg);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  const camera = new THREE.PerspectiveCamera(fov, w / h, 0.1, 200);
  return { renderer, scene, camera };
}

const chrome = (c = 0xffffff, r = 0.12) =>
  new THREE.MeshPhysicalMaterial({ color: c, metalness: 1, roughness: r, clearcoat: 1, clearcoatRoughness: 0.1 });

const scenes = {
  // Glass slabs with a blue signal running through them (hero thumbnail).
  'hero-glass': () => {
    const { renderer, scene, camera } = setup(1200, 900, 0xefefee);
    camera.position.set(5.2, 1.6, 6.4); camera.lookAt(0, 0, 0);
    const glass = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, metalness: 0, roughness: 0.05, transmission: 0.92, thickness: 0.4,
      ior: 1.45, clearcoat: 1, transparent: true, opacity: 0.55,
    });
    const frame = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8, roughness: 0.3 });
    for (let i = 0; i < 9; i++) {
      const g = new THREE.Group();
      const s = 1 - Math.abs(i - 4) * 0.06;
      const slab = new THREE.Mesh(new THREE.BoxGeometry(0.08, 3.2 * s, 2.4 * s), glass);
      const edge = new THREE.Mesh(new THREE.BoxGeometry(0.1, 3.25 * s, 0.06), frame);
      edge.position.z = 1.2 * s;
      g.add(slab, edge);
      g.position.x = (i - 4) * 0.75;
      g.rotation.y = 0.15;
      scene.add(g);
    }
    const pts = [];
    for (let i = 0; i <= 200; i++) {
      const t = i / 200;
      pts.push(new THREE.Vector3((t - 0.5) * 8, Math.sin(t * Math.PI * 4) * 0.45, Math.cos(t * Math.PI * 3) * 0.3));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    const glow = new THREE.MeshBasicMaterial({ color: 0x3b6bff });
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 400, 0.035, 12), glow));
    const halo = new THREE.MeshBasicMaterial({ color: 0x2a52ff, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending });
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 400, 0.14, 12), halo));
    const light = new THREE.PointLight(0x4d7cff, 30, 6); scene.add(light);
    scene.add(new THREE.DirectionalLight(0xffffff, 1.5));
    renderer.render(scene, camera);
  },

  // Large twisted chrome ribbon on black (dark panels).
  'ribbon-dark': () => {
    const { renderer, scene, camera } = setup(2400, 1300, 0x0d0d0d, 30);
    camera.position.set(0, 0, 14); camera.lookAt(0, 0, 0);
    const pos = [], idx = [];
    const segs = 800, width = 5.5;
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      const a = t * Math.PI * 2.2;
      const center = new THREE.Vector3((t - 0.5) * 26, Math.sin(a * 0.9) * 2.0 - 0.5, Math.cos(a * 0.7) * 3 - 3);
      const twist = t * Math.PI * 1.6 + 0.4;
      const dir = new THREE.Vector3(0, Math.cos(twist), Math.sin(twist)).multiplyScalar(width / 2);
      pos.push(...center.clone().add(dir).toArray(), ...center.clone().sub(dir).toArray());
      if (i < segs) { const k = i * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    geo.setIndex(idx); geo.computeVertexNormals();
    const mat = chrome(0xdddddd, 0.22); mat.side = THREE.DoubleSide;
    const m = new THREE.Mesh(geo, mat); m.rotation.z = -0.18; m.position.x = 2; scene.add(m);
    const key = new THREE.DirectionalLight(0xffffff, 2); key.position.set(5, 6, 8); scene.add(key);
    renderer.toneMappingExposure = 0.85;
    renderer.render(scene, camera);
  },

  // Chrome torus knot on soft gray.
  'knot-light': () => {
    const { renderer, scene, camera } = setup(1600, 1600, 0xe9e9e8);
    camera.position.set(0, 0, 14.5); camera.lookAt(0, 0, 0);
    const m = new THREE.Mesh(new THREE.TorusKnotGeometry(2.2, 0.62, 400, 64, 2, 3), chrome(0xf2f2f2, 0.08));
    m.rotation.set(0.6, 0.4, 0.2); scene.add(m);
    renderer.render(scene, camera);
  },

  // Field of map pins, one highlighted (lead sourcing).
  'pins-dark': () => {
    const { renderer, scene, camera } = setup(1600, 1200, 0x111214, 32);
    camera.position.set(0, 9, 12); camera.lookAt(0, 0, 0);
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 60),
      new THREE.MeshStandardMaterial({ color: 0x18191b, metalness: 0.6, roughness: 0.35 }));
    ground.rotation.x = -Math.PI / 2; scene.add(ground);
    const grid = new THREE.GridHelper(60, 60, 0x333333, 0x262626); grid.position.y = 0.01; scene.add(grid);
    const make = (x, z, mat, s = 1) => {
      const g = new THREE.Group();
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.32 * s, 48, 48), mat);
      head.position.y = 1.1 * s;
      const tip = new THREE.Mesh(new THREE.ConeGeometry(0.2 * s, 0.85 * s, 48), mat);
      tip.rotation.x = Math.PI; tip.position.y = 0.5 * s;
      g.add(head, tip); g.position.set(x, 0, z); scene.add(g);
    };
    const silver = chrome(0xbbbbbb, 0.25);
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 46; i++) {
      const x = (rnd() - 0.5) * 22, z = (rnd() - 0.5) * 14 - 2;
      if (Math.hypot(x, z) < 1.6) continue;
      make(x, z, silver, 0.7 + rnd() * 0.3);
    }
    make(0, 0, new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.2, roughness: 0.15, clearcoat: 1, emissive: 0x222222 }), 1.7);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.9, 1.0, 96), new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.02; scene.add(ring);
    const ring2 = ring.clone(); ring2.scale.setScalar(1.8); ring2.material = ring.material.clone(); ring2.material.transparent = true; ring2.material.opacity = 0.35; scene.add(ring2);
    scene.fog = new THREE.Fog(0x111214, 12, 30);
    const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(-4, 10, 6); scene.add(key);
    renderer.render(scene, camera);
  },

  // Sound wave of stacked chrome bars (calling / voice).
  'wave-light': () => {
    const { renderer, scene, camera } = setup(2000, 1200, 0xf1f1f0, 30);
    camera.position.set(0, 2.5, 16); camera.lookAt(0, 0, 0);
    const mat = chrome(0x2a2a2a, 0.2);
    for (let i = 0; i < 61; i++) {
      const x = (i - 30) * 0.32;
      const h = 0.25 + Math.abs(Math.sin(i * 0.37) * Math.cos(i * 0.11)) * 4.2 * Math.exp(-Math.pow((i - 30) / 22, 2));
      const bar = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, h, 8, 24), mat);
      bar.position.x = x; scene.add(bar);
    }
    const key = new THREE.DirectionalLight(0xffffff, 1.2); key.position.set(3, 5, 8); scene.add(key);
    renderer.render(scene, camera);
  },

  // Interlocking chrome rings on black (integrations).
  'rings-dark': () => {
    const { renderer, scene, camera } = setup(1600, 1600, 0x0e0e0f);
    camera.position.set(0, 0, 12); camera.lookAt(0, 0, 0);
    const mat = chrome(0xe0e0e0, 0.1);
    const rot = [[0, 0, 0], [Math.PI / 2, 0, 0.6], [0.4, Math.PI / 2, 0], [1.1, 0.5, 1.3]];
    rot.forEach((r, i) => {
      const t = new THREE.Mesh(new THREE.TorusGeometry(2.6 - i * 0.12, 0.16, 48, 240), mat);
      t.rotation.set(...r); scene.add(t);
    });
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.9, 96, 96), chrome(0xffffff, 0.05));
    scene.add(core);
    renderer.toneMappingExposure = 0.9;
    renderer.render(scene, camera);
  },
};

window.renderScene = (name) => { scenes[name](); return document.querySelector('canvas').toDataURL('image/png'); };
window.sceneNames = Object.keys(scenes);
window.ready = true;
</script></body></html>`;

const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const ctx = await browser.newContext();
const p = await ctx.newPage();
p.on('console', (m) => console.log('[page]', m.text()));
p.on('pageerror', (e) => console.error('[page error]', e));
await p.route('**/*', (route) => {
  const url = new URL(route.request().url());
  const body = {
    '/': page,
    '/three.module.js': threeSrc,
    '/three.core.js': threeCore,
    '/RoomEnvironment.js': roomEnv.replace("from 'three'", "from '/three.module.js'"),
  }[url.pathname];
  if (body === undefined) return route.fulfill({ status: 404, body: '' });
  route.fulfill({ status: 200, contentType: url.pathname === '/' ? 'text/html' : 'text/javascript', body });
});
await p.goto('http://render.local/');
await p.waitForFunction(() => window.ready === true);
const only = process.argv.slice(2);
const names = (await p.evaluate(() => window.sceneNames)).filter((n) => !only.length || only.includes(n));
for (const name of names) {
  const t = Date.now();
  const data = await p.evaluate((n) => window.renderScene(n), name);
  writeFileSync(path.join(root, 'public/images', `${name}.png`), Buffer.from(data.split(',')[1], 'base64'));
  console.log(`rendered ${name} in ${Date.now() - t}ms`);
}
await browser.close();
