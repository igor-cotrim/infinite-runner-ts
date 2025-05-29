import { GROUND_HEIGHT } from "../constants/game.constants";

class Player {
  private dy: number = 0;
  private grounded: boolean = true;

  x: number;
  y: number;
  width: number;
  height: number;
  color: string;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.setupControls();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
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
