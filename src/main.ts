import {
  GROUND_HEIGHT,
  INITIAL_GAME_SPEED,
  PLAYER_SPRITE_SIZE,
} from "./constants/game.constants";
import ObstacleManager from "./managers/ObstacleManager";
import TextManager from "./managers/TextManager";
import ScoreManager from "./managers/ScoreManager";
import AudioManager from "./managers/AudioManager";
import Player from "./entities/Player";
import Ground from "./entities/Ground";
import Background from "./entities/Background";

import "./style.css";

class Game {
  canvas = document.getElementById("game-canvas") as HTMLCanvasElement;
  ctx = this.canvas.getContext("2d")!;

  player!: Player;
  ground!: Ground;
  background!: Background;

  obstacleManager!: ObstacleManager;
  textManager!: TextManager;
  scoreManager = new ScoreManager();
  audioManager = new AudioManager();

  lastTimestamp = 0;
  gameSpeed = INITIAL_GAME_SPEED;
  isGameOver = false;
  isPlaying = false;

  constructor() {
    this.initializeGame();
    this.setupCanvas();
    this.setupControls();
  }

  initializeGame() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.ground = new Ground(
      0,
      this.canvas.height - GROUND_HEIGHT,
      this.canvas.width,
      GROUND_HEIGHT
    );
    this.background = new Background(this.canvas);
    this.player = new Player(
      50,
      this.canvas.height - GROUND_HEIGHT - PLAYER_SPRITE_SIZE
    );
    this.obstacleManager = new ObstacleManager(this.canvas, this.ctx);
    this.textManager = new TextManager(this.canvas, this.ctx);
  }

  async initializeAudio() {
    try {
      await this.audioManager.initialize();
    } catch (error) {
      console.error("Failed to initialize audio:", error);
    }
  }

  handleGameAction() {
    this.initializeAudio();
    if (!this.isPlaying && !this.isGameOver) {
      this.isPlaying = true;
    } else if (this.isGameOver) {
      this.resetGame();
    }
  }

  setupCanvas() {
    let resizeTimeout: number;

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.initializeGame(), 100);
    });
  }

  setupControls() {
    window.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        this.handleGameAction();
      }
    });

    window.addEventListener("touchstart", () => {
      this.handleGameAction();
    });
  }

  resetGame() {
    this.isGameOver = false;
    this.isPlaying = true;
    this.gameSpeed = INITIAL_GAME_SPEED;
    this.obstacleManager.reset();
    this.player.reset(50, this.canvas.height - 50);
    this.scoreManager.reset();
  }

  updatePlayer() {
    if (this.audioManager.initialized) {
      const jumpHeight = this.audioManager.getJumpHeight();
      this.player.jump(jumpHeight);
    }

    this.player.update(this.canvas);
  }

  render(timestamp: number) {
    const deltatime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    this.ctx.fillStyle = "#0a0c21";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw
    this.background.draw(this.ctx);
    this.ground.draw(this.ctx);
    this.player.draw(this.ctx);
    this.obstacleManager.draw();
    this.textManager.drawScore(this.scoreManager.getScore());
    this.textManager.drawHighScore(this.scoreManager.getHighScore());

    if (!this.isPlaying) {
      this.textManager.drawInitialScreen();
    }

    // Update
    if (this.isPlaying && !this.isGameOver) {
      this.updatePlayer();
      this.background.update(this.gameSpeed);
      this.ground.update(this.gameSpeed);
      this.obstacleManager.update(deltatime, this.gameSpeed);
      this.gameSpeed += 0.3 * (deltatime / 1000);
      this.scoreManager.update(deltatime);

      if (this.obstacleManager.checkCollision(this.player)) {
        this.isGameOver = true;
      }
    }

    if (this.isGameOver) {
      this.textManager.drawGameOverScreen();
      this.scoreManager.updateHighScore();
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
