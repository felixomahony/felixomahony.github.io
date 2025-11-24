import * as THREE from "three";
import { IsometricCamera } from "./IsometricCamera";
import { World } from "./World";

export class SceneManager {
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private camera: IsometricCamera;
  private world: World;
  private animationId: number | null = null;
  private clock: THREE.Clock;

  constructor(container: HTMLDivElement) {
    this.clock = new THREE.Clock();

    // Scene
    this.scene = new THREE.Scene();
    // Remove solid background to allow CSS gradient to show through

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0x000000, 0); // Transparent background
    container.appendChild(this.renderer.domElement);

    // Camera
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new IsometricCamera(aspect);

    // World
    this.world = new World(this.scene);

    // Start loop
    this.animate();

    // Listeners
    window.addEventListener("resize", this.handleResize);
  }

  private animate = () => {
    const deltaTime = this.clock.getDelta();

    this.world.update(deltaTime);
    this.camera.update();
    this.renderer.render(this.scene, this.camera.camera);
    this.animationId = requestAnimationFrame(this.animate);
  };

  private handleResize = () => {
    const aspect = window.innerWidth / window.innerHeight;
    this.camera.handleResize(aspect);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  public setScrollPause(isPaused: boolean) {
    this.world.setScrollPause(isPaused);
  }

  public dispose() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    window.removeEventListener("resize", this.handleResize);
    this.camera.dispose();
    this.world.dispose();
    this.renderer.dispose();
  }
}
