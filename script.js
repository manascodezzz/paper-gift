let highestZ = 1;

class Paper {
  holdingPaper = false;
  prevMouseX = 0;
  prevMouseY = 0;
  mouseX = 0;
  mouseY = 0;
  velocityX = 0;
  velocityY = 0;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    paper.addEventListener('mousedown', (e) => {
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      this.prevMouseX = e.clientX;
      this.prevMouseY = e.clientY;
    });

    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      this.velocityX = this.mouseX - this.prevMouseX;
      this.velocityY = this.mouseY - this.prevMouseY;

      if (this.holdingPaper) {
        this.currentPaperX += this.velocityX;
        this.currentPaperY += this.velocityY;
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
      }
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const papers = Array.from(document.querySelectorAll('.paper'));
  papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
  });
});
