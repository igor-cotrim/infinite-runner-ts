import {
  GROUND_HEIGHT,
  INITIAL_GAME_SPEED,
  SPAWN_MAX_TIME,
  SPAWN_MIN_TIME,
} from "../constants/game.constants";
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

  update(deltatime: number, gameSpeed: number) {
    if (this.nextSpawnTime <= 0) {
      this.createObstacle();

      const speedFactor = INITIAL_GAME_SPEED / gameSpeed;

      this.nextSpawnTime = Math.floor(
        Math.random() * (SPAWN_MAX_TIME - SPAWN_MIN_TIME) +
          SPAWN_MIN_TIME * speedFactor
      );
    }

    this.nextSpawnTime -= deltatime;

    this.obstacles.forEach((obstacle) => {
      obstacle.x -= gameSpeed;
    });

    // remove obstacles that are off the screen
    this.obstacles = this.obstacles.filter(
      (obstacle) => obstacle.x + obstacle.width > 0
    );
  }

  checkCollision(player: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) {
    for (const obstacle of this.obstacles) {
      if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
      ) {
        return true;
      }

      return false;
    }
  }

  createObstacle() {
    const y = Math.random() < 0.5 ? 70 : 140;

    const obstacle = new Obstacle(
      this.canvas.width,
      this.canvas.height - GROUND_HEIGHT - y,
      30,
      70,
      "#fff000"
    );

    this.obstacles.push(obstacle);
  }

  reset() {
    this.obstacles = [];
    this.nextSpawnTime = 0;
  }
}

export default ObstacleManager;
