import { GROUND_HEIGHT, PLAYER_SPRITE_SIZE } from "../constants/game.constants";
import Sprite from "./Sprite";

class Player extends Sprite {
  private dy: number = 0;
  private grounded: boolean = true;

  x: number;
  y: number;

  constructor(x: number, y: number) {
    super(x, y, PLAYER_SPRITE_SIZE, PLAYER_SPRITE_SIZE, {
      imageSrc: "player.png",
      spriteWidth: PLAYER_SPRITE_SIZE,
      spriteHeight: PLAYER_SPRITE_SIZE,
      frameSpacing: 192,
      frameCount: 16,
    });
    this.sprite.src = "player.png";
    this.x = x;
    this.y = y;

    this.setupControls();
  }

  update(canvas: HTMLCanvasElement): void {
    this.y += this.dy;
    const groundY = canvas.height - GROUND_HEIGHT;

    if (this.y + this.height < groundY) {
      this.dy += 1; // Gravity effect
      this.grounded = false;
    } else {
      this.dy = 0; // Reset vertical speed
      this.grounded = true; // Player is grounded
      this.y = groundY - this.height; // Prevent going below the ground
    }

    this.updateAnimation();
  }

  private setupControls(): void {
    window.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        this.jump();
      }
    });
  }

  jump(jumpHeight: number = -20): void {
    if (jumpHeight < -15) {
      if (this.grounded) {
        this.dy = jumpHeight;
      }
    }
  }

  reset(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.dy = 0;
    this.grounded = true;
  }
}

export default Player;
