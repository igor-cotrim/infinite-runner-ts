import Player from "./entities/Player";
import ObstacleManager from "./managers/ObstacleManager";

import "./style.css";

class Game {
  canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
  ctx = this.canvas.getContext("2d")!;
  player: Player;
  obstacleManager: ObstacleManager;

  constructor() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.player = new Player(50, this.canvas.height - 50, 50, 50, "#f231a5");
    this.obstacleManager = new ObstacleManager(this.canvas, this.ctx);
  }

  render() {
    this.ctx.fillStyle = "#0a0c21";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw
    this.player.draw(this.ctx);
    this.obstacleManager.draw();

    // Update
    this.player.update(this.canvas);
    this.obstacleManager.update();
  }
}

window.onload = () => {
  const game = new Game();

  function animate() {
    game.render();
    requestAnimationFrame(animate);
  }

  animate();
};
