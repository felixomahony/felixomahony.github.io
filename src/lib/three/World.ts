import * as THREE from "three";

export class World {
  private static readonly PAUSE_DURATION = 0.2; // Duration in seconds to pause at waypoints

  private scene: THREE.Scene;
  private materials: (THREE.Material | THREE.Material[])[] = [];
  private geometries: THREE.BufferGeometry[] = [];
  private meshes: THREE.Mesh[] = [];

  private ball: THREE.Mesh | null = null;
  private ballVelocity: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  private isFalling: boolean = true;
  private isRolling: boolean = true;
  private isPausedByScroll: boolean = false;
  private rollPath: THREE.Vector3[] = [
    new THREE.Vector3(1.0, 0.75, -1.0),
    new THREE.Vector3(-3.0, 0.75, -1.0),
    new THREE.Vector3(-3.0, 0.75, -0.5),
    new THREE.Vector3(-3.0, 0.5, -0.25),
    new THREE.Vector3(-3.0, 0.0, -0.25),
    new THREE.Vector3(1.0, 0.0, 3.75),
    new THREE.Vector3(1.5, 0.0, 3.75),
    new THREE.Vector3(1.75, 0.0, 3.5),
    new THREE.Vector3(1.75, 0.0, 3.0),
    new THREE.Vector3(1.75, 0.0, -1.0),
    new THREE.Vector3(1.75, 0.5, -1.0),
    new THREE.Vector3(1.5, 0.75, -1.0),
    new THREE.Vector3(1.0, 0.75, -1.0),
  ];
  private pauseAfterPath: boolean[] = [
    true,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
  ];
  private setArr1AfterPath: boolean[] = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
  ];
  private setArr2AfterPath: boolean[] = [
    false,
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  private currentPathIndex: number = 0;
  private pauseTimer: number = 0;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.setup();
  }

  private setup() {
    this.setupLights();
    this.setupObjects1();
    this.setupBall();
  }

  private setupBall() {
    const geometry = new THREE.SphereGeometry(0.25, 32, 32);
    const material = new THREE.MeshLambertMaterial({ color: 0xefefef });
    this.ball = new THREE.Mesh(geometry, material);
    this.ball.castShadow = true;
    this.ball.receiveShadow = false;

    // Start position: x=1.0, z=1.5, y=10.0
    this.ball.position.set(1.0, 10.0, 1.5);
    this.scene.add(this.ball);
  }

  public setScrollPause(isPaused: boolean) {
    this.isPausedByScroll = !isPaused;
  }

  public update(deltaTime: number) {
    if (!this.ball) return;

    // Handle pause
    if (this.pauseTimer > 0) {
      this.pauseTimer -= deltaTime;
      return;
    }

    if (this.isFalling) {
      const gravity = 19; // Derived for 1s fall time from y=10 to y=0.5

      // Apply gravity
      this.ballVelocity.y -= gravity * deltaTime;

      // Update position
      this.ball.position.y += this.ballVelocity.y * deltaTime;

      // Check collision
      // Ball radius is 0.25, block top is at y=0.5
      // So collision happens when center y = 0.5 + 0.25 = 0.75
      if (this.ball.position.y <= 0.75) {
        this.ball.position.y = 0.75;

        // Bounce logic
        if (Math.abs(this.ballVelocity.y) > 2.0) {
          this.ballVelocity.y = -this.ballVelocity.y * 0.2; // Restitution
        } else {
          this.ballVelocity.y = 0;
          this.isFalling = false;
          this.isRolling = true; // Start rolling
          this.pauseTimer = World.PAUSE_DURATION; // Pause before rolling
        }
      }
    } else if (this.isRolling) {
      // Pause rolling if scroll is at top or bottom
      if (this.isPausedByScroll) {
        return;
      }

      // if (this.currentPathIndex >= this.rollPath.length) {
      //   this.isRolling = false;
      //   return;
      // }

      const target = this.rollPath[this.currentPathIndex];
      // const speed = 2.0;

      const direction = new THREE.Vector3()
        .subVectors(target, this.ball.position)
        .normalize();

      const distanceToTarget = this.ball.position.distanceTo(target);
      const speed = 3.5 - 0.2 * distanceToTarget; // Slow down as it approaches
      const step = speed * deltaTime;

      if (distanceToTarget < step) {
        // Reached target
        this.ball.position.copy(target);
        this.currentPathIndex++;

        if (this.setArr2AfterPath[this.currentPathIndex - 1]) {
          this.setArrangement2();
        } else if (this.setArr1AfterPath[this.currentPathIndex - 1]) {
          this.setArrangement1();
        }
        if (this.pauseAfterPath[this.currentPathIndex - 1]) {
          this.pauseTimer = World.PAUSE_DURATION; // Pause at waypoint
        }
        if (this.currentPathIndex >= this.rollPath.length) {
          this.currentPathIndex = 1;
        }
      } else {
        // Move towards target
        this.ball.position.add(direction.multiplyScalar(step));
      }
    }
  }

  private setupLights() {
    const ambientLight = new THREE.AmbientLight(0xa4f5cc, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xd0f7e3, 1.5);
    directionalLight.position.set(10, 20, 0);
    directionalLight.castShadow = true;

    // Configure shadow properties for subtle shadows
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -15;
    directionalLight.shadow.camera.right = 15;
    directionalLight.shadow.camera.top = 15;
    directionalLight.shadow.camera.bottom = -15;
    directionalLight.shadow.bias = -0.0001;

    this.scene.add(directionalLight);
  }

  private setupObjects1() {
    const material = new THREE.MeshLambertMaterial({
      color: 0x2bed8a,
    });
    this.materials.push(material);

    // Create materials array for the cube with missing face
    // Order: right, left, top, bottom, front, back
    const multiMaterials = [
      material, // right
      material, // left
      new THREE.MeshBasicMaterial({ visible: false }), // top (positive y) - invisible
      material, // bottom
      material, // front
      material, // back
    ];
    this.materials.push(multiMaterials);

    // Edge 1
    this.createBlock(5, 1, 1, material, new THREE.Vector3(-1.0, 0.0, -1.0));

    // Edge 2
    this.createBlock(1, 1, 5, material, new THREE.Vector3(1.0, 0.0, 1.0));

    // Edge 3a (missing face)
    this.createBlock(
      1,
      2.5,
      1,
      multiMaterials,
      new THREE.Vector3(1.0, 1.25, 3.0)
    );

    // Edge 3b
    this.createBlock(
      1,
      2.5,
      1,
      material,
      new THREE.Vector3(-3.0, -1.25, -1.0),
      false
    );
  }

  private setupObjects2() {
    const material = new THREE.MeshLambertMaterial({
      color: 0x2bed8a,
      wireframe: false,
    });
    this.materials.push(material);

    // Create materials array for the cube with missing face
    // Order: right, left, top, bottom, front, back
    const multiMaterials = [
      new THREE.MeshBasicMaterial({ visible: false }), // right (positive x) - invisible
      material, // left
      material, // top
      material, // bottom
      material, // front
      material, // back
    ];
    this.materials.push(multiMaterials);

    // Edge 1a
    this.createBlock(3, 1, 1, material, new THREE.Vector3(0.0, 0.0, -1.0));
    // Edge 1b
    this.createBlock(3, 1, 1, multiMaterials, new THREE.Vector3(2.0, 4.0, 3.0));

    // Edge 2
    this.createBlock(1, 1, 5, material, new THREE.Vector3(1.0, 0.0, 1.0));

    // Edge 3
    this.createBlock(1, 5, 1, material, new THREE.Vector3(1.0, 2, 3.0));
  }

  private createBlock(
    width: number,
    height: number,
    depth: number,
    material: THREE.Material | THREE.Material[],
    position: THREE.Vector3,
    receiveShadow: boolean = true
  ) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    mesh.castShadow = false;
    mesh.receiveShadow = receiveShadow;
    this.scene.add(mesh);
    this.geometries.push(geometry);
    this.meshes.push(mesh);
  }

  private deleteOldObjects() {
    // Remove meshes from scene
    this.meshes.forEach((mesh) => {
      this.scene.remove(mesh);
    });
    this.meshes = [];

    // Dispose geometries
    this.geometries.forEach((g) => g.dispose());
    this.geometries = [];

    // Dispose materials
    this.materials.forEach((m) => {
      if (Array.isArray(m)) {
        m.forEach((mat) => mat.dispose());
      } else {
        m.dispose();
      }
    });
    this.materials = [];
  }

  private setArrangement1() {
    // Delete old objects
    this.deleteOldObjects();

    // Create new objects
    this.setupObjects1();

    // Reset states
    // this.isRolling = false;
  }

  private setArrangement2() {
    // Delete old objects
    this.deleteOldObjects();

    // Create new objects
    this.setupObjects2();

    // Teleport ball to new position
    if (this.ball) {
      this.ball.position.set(1.0, 4.0, 3.75);
    }

    // Reset states
    // this.isRolling = false;
  }

  public dispose() {
    this.geometries.forEach((g) => g.dispose());
    this.materials.forEach((m) => {
      if (Array.isArray(m)) {
        m.forEach((mat) => mat.dispose());
      } else {
        m.dispose();
      }
    });
  }
}
