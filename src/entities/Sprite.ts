import { DEBUG_MODE } from "../constants/game.constants";

interface SpriteOptions {
  imageSrc?: string;
  spriteWidth?: number;
  spriteHeight?: number;
  startX?: number;
  startY?: number;
  frameSpacing?: number;
  frameCount?: number;
  animationSpeed?: number;
}

class Sprite {
  sprite = new Image();
  currentFrame = 0;
  frameTimer = 0;
  spriteWidth: number;
  spriteHeight: number;
  startX: number;
  startY: number;
  frameSpacing: number;
  frameCount: number;
  animationSpeed: number;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    {
      imageSrc = "",
      spriteWidth = width,
      spriteHeight = height,
      startX = 0,
      startY = 0,
      frameSpacing,
      frameCount = 1,
      animationSpeed = 3,
    }: SpriteOptions = {}
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite.src = imageSrc;
    this.sprite.src = imageSrc;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.startX = startX;
    this.startY = startY;
    this.frameSpacing = frameSpacing || spriteWidth;
    this.frameCount = frameCount;
    this.animationSpeed = animationSpeed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (DEBUG_MODE) {
      ctx.fillRect(
        this.x + 15 / 2,
        this.y + 15 / 2,
        this.spriteWidth - 15,
        this.spriteHeight - 15
      );
    }
    ctx.drawImage(
      this.sprite,
      this.startX + this.currentFrame * this.frameSpacing,
      this.startY,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  updateAnimation() {
    this.frameTimer++;

    if (this.frameTimer >= this.animationSpeed) {
      this.frameTimer = 0;
      this.currentFrame = (this.currentFrame + 1) % this.frameCount;
    }
  }
}

export default Sprite;
