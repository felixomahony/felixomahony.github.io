import * as THREE from "three";

export class IsometricCamera {
  public camera: THREE.OrthographicCamera;
  private frustumSize: number = 8;
  private isoHeight: number = 10;
  private isoRadius: number = Math.sqrt(10 * 10 + 10 * 10); // ~14.14
  private scrollTimeout: NodeJS.Timeout | null = null;

  constructor(aspect: number) {
    this.camera = new THREE.OrthographicCamera(
      (this.frustumSize * aspect) / -2,
      (this.frustumSize * aspect) / 2,
      this.frustumSize / 2,
      this.frustumSize / -2,
      0.1,
      1000
    );

    // Initial position
    this.update();
    
    // Setup listeners
    window.addEventListener("scroll", this.handleScrollSnap);
  }

  public update() {
    const scrollY = window.scrollY;
    // Max scroll is (300vh - 100vh) = 200vh = 2 * window.innerHeight
    // We want 2 * PI rotation over this distance
    // speed = (2 * PI) / (2 * innerHeight) = PI / innerHeight
    const rotationSpeed = Math.PI / window.innerHeight;
    const baseAngle = Math.PI / 4; // Start at 45 degrees
    const angle = baseAngle + scrollY * rotationSpeed;

    this.camera.position.x = Math.sin(angle) * this.isoRadius;
    this.camera.position.z = Math.cos(angle) * this.isoRadius;
    this.camera.position.y = this.isoHeight;

    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(0, 0, 0);
  }

  public handleResize(aspect: number) {
    this.camera.left = (this.frustumSize * aspect) / -2;
    this.camera.right = (this.frustumSize * aspect) / 2;
    this.camera.top = this.frustumSize / 2;
    this.camera.bottom = this.frustumSize / -2;
    this.camera.updateProjectionMatrix();
  }

  private handleScrollSnap = () => {
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    
    this.scrollTimeout = setTimeout(() => {
      const scrollY = window.scrollY;
      const rotationSpeed = Math.PI / window.innerHeight;
      const step = Math.PI / 2; // 90 degrees

      // Calculate current 'k' (how many 90-degree turns we've made)
      const k = Math.round((scrollY * rotationSpeed) / step);
      
      const targetScrollY = (k * step) / rotationSpeed;

      if (Math.abs(scrollY - targetScrollY) > 1) {
           window.scrollTo({
          top: targetScrollY,
          behavior: "smooth",
        });
      }
    }, 150);
  };

  public dispose() {
    window.removeEventListener("scroll", this.handleScrollSnap);
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
  }
}
