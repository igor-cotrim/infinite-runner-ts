class ScoreManager {
  private score = 0;
  private highscore = 0;

  constructor() {
    this.loadHighScore();
  }

  getScore() {
    return this.score;
  }

  getHighScore() {
    return this.highscore;
  }

  loadHighScore() {
    this.highscore =
      Number(localStorage.getItem("infinite-runner-highscore")) || 0;
  }

  update(deltatime: number) {
    this.score += Math.floor(deltatime / (1000 / 60));
  }

  updateHighScore() {
    if (this.score > this.highscore) {
      this.highscore = this.score;
      localStorage.setItem(
        "infinite-runner-highscore",
        this.highscore.toString()
      );
    }
  }

  reset() {
    this.score = 0;
  }
}

export default ScoreManager;
