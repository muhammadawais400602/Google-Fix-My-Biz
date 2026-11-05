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

const scenes = {
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
