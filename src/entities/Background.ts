import { BACKGROUND_LAYERS } from "../constants/game.constants";

interface BackgroundType {
  image: HTMLImageElement;
  speed: number;
  x: number;
  width: number;
  height: number;
}

class Background {
  private canvas: HTMLCanvasElement;
  backgrounds: BackgroundType[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.backgrounds = BACKGROUND_LAYERS.map((image) => ({
      image: Object.assign(new Image(), { src: image.src }),
      speed: image.speed,
      x: 0,
      width: this.canvas.width,
      height: this.canvas.height,
    }));
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.backgrounds.forEach((bg) => {
      const x = Math.floor(bg.x);
      ctx.drawImage(bg.image, x, 0, bg.width, bg.height);
      ctx.drawImage(bg.image, x + bg.width, 0, bg.width, bg.height);
    });
  }

  update(gameSpeed: number) {
    this.backgrounds.forEach((bg) => {
      bg.x -= gameSpeed *= bg.speed;

      if (bg.x <= -bg.width) {
        bg.x = 0;
      }
    });
  }
}

export default Background;
