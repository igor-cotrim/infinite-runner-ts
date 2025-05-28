class TextManager {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
  }

  private drawText(
    text: string,
    x: number,
    y: number,
    size: number = 40,
    align: CanvasTextAlign = "center",
    color: string = "#ffffff"
  ) {
    this.ctx.fillStyle = color;
    this.ctx.font = `${size}px "Press Start 2P"`;
    this.ctx.textAlign = align;
    this.ctx.fillText(text, x, y);
  }

  drawInitialScreen() {
    const titleX = this.canvas.width / 2;
    const titleY = this.canvas.height / 2;

    this.drawText("Press space or touch to play", titleX, titleY);
    this.drawText(
      "Press space, click or scream to jump",
      titleX,
      titleY + 60,
      32
    );
  }

  drawScore(score: number) {
    this.drawText(
      `Score: ${score.toString().padStart(6, "0")}`,
      180,
      50,
      18,
      "left"
    );
  }

  drawHighScore(score: number) {
    this.drawText(
      `High Score: ${score.toString().padStart(6, "0")}`,
      this.canvas.width - 250,
      50,
      18,
      "right"
    );
  }

  drawGameOverScreen() {
    const titleX = this.canvas.width / 2;
    const titleY = this.canvas.height / 2;

    this.drawText("Game Over", titleX, titleY);
    this.drawText("Press space or touch to restart", titleX, titleY + 60, 28);
  }
}

export default TextManager;
