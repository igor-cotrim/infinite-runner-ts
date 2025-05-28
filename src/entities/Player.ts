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

    if (this.y + this.height < canvas.height) {
      this.dy += 1; // Gravity effect
      this.grounded = false;
    } else {
      this.dy = 0; // Reset vertical speed
      this.grounded = true; // Player is grounded
      this.y = canvas.height - this.height; // Prevent going below the ground
    }
  }

  private setupControls(): void {
    window.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        this.jump();
      }
    });
  }

  private jump(): void {
    if (!this.grounded) return;

    this.dy -= 20;
  }

  reset(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.dy = 0;
    this.grounded = true;
  }
}

export default Player;
