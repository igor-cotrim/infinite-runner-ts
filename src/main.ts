import { INITIAL_GAME_SPEED } from "./constants/game.constants";
import ObstacleManager from "./managers/ObstacleManager";
import TextManager from "./managers/TextManager";
import Player from "./entities/Player";

import "./style.css";

class Game {
  canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
  ctx = this.canvas.getContext("2d")!;
  player: Player;
  obstacleManager: ObstacleManager;
  textManager: TextManager;

  lastTimestamp = 0;
  gameSpeed = INITIAL_GAME_SPEED;
  isGameOver = false;

  constructor() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.player = new Player(50, this.canvas.height - 50, 50, 50, "#f231a5");
    this.obstacleManager = new ObstacleManager(this.canvas, this.ctx);
    this.textManager = new TextManager(this.canvas, this.ctx);
  }

  render(timestamp: number) {
    const deltatime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    this.ctx.fillStyle = "#0a0c21";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw
    this.player.draw(this.ctx);
    this.obstacleManager.draw();

    // Update
    if (!this.isGameOver) {
      this.player.update(this.canvas);
      this.obstacleManager.update(deltatime, this.gameSpeed);
      this.gameSpeed += 0.3 * (deltatime / 1000);

      if (this.obstacleManager.checkCollision(this.player)) {
        this.isGameOver = true;
      }
    }

    if (this.isGameOver) {
      this.textManager.drawGameOverScreen();
    }
  }
}

window.onload = () => {
  const game = new Game();

  function animate(timestamp: number) {
    game.render(timestamp);
    requestAnimationFrame(animate);
  }

  animate(0);
};
