import Obstacle from "../entities/Obstacle";

class ObstacleManager {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private obstacles: Obstacle[] = [];
  private nextSpawnTime: number = 0;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  draw() {
    this.obstacles.forEach((obstacle) => {
      obstacle.draw(this.ctx);
    });
  }

  update() {
    this.nextSpawnTime -= 16; // Assuming 60 FPS, so ~16ms per frame
    if (this.nextSpawnTime <= 0) {
      this.createObstacle();
      this.nextSpawnTime = Math.random() * 1000 + 500; // Random spawn time between 500ms and 1500ms
    }

    this.obstacles.forEach((obstacle) => {
      obstacle.update();
    });
  }

  createObstacle() {
    const obstacle = new Obstacle(
      this.canvas.width,
      this.canvas.height - 70,
      30,
      70,
      "#fff000"
    );

    this.obstacles.push(obstacle);
  }
}

export default ObstacleManager;
