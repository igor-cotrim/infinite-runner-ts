import Player from "./entities/Player";

import "./style.css";

class Game {
  canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
  ctx = this.canvas.getContext("2d")!;
  player: Player;

  constructor() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.player = new Player(50, this.canvas.height - 50, 50, 50, "#f231a5");
  }

  render() {
    this.ctx.fillStyle = "#0a0c21";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.player.draw(this.ctx);
    this.player.update(this.canvas);
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
