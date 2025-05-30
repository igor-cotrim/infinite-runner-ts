import {
  OBSTACLE_SPRITE_HEIGHT,
  OBSTACLE_SPRITE_WIDTH,
} from "../constants/game.constants";
import Sprite from "./Sprite";

class Obstacle extends Sprite {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    super(x, y, OBSTACLE_SPRITE_WIDTH, OBSTACLE_SPRITE_HEIGHT, {
      imageSrc: "monster.png",
      spriteWidth: OBSTACLE_SPRITE_WIDTH,
      spriteHeight: OBSTACLE_SPRITE_HEIGHT,
      frameCount: 4,
      animationSpeed: 6,
    });
    this.x = x;
    this.y = y;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    super.updateAnimation();
    super.draw(ctx);
  }
}

export default Obstacle;
