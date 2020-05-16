
let canvas, ctx, player, mousePos, keys;
let V2 = (x, y) => new Vector2(x, y);

class Player {
  SPEED = 4;
  constructor() {
    this.img = {hand: new Image(), body: new Image()};
    this.img.body.src = '../assets/Player.png';
    this.position = V2(canvas.width/2, canvas.height/2);
    this.direction = V2().lookAt(0);
  }
  redraw() {
    ctx.save();
      ctx.translate(this.position.x, this.position.y);
      ctx.rotate(this.direction.angle()-Math.PI/2);
      ctx.save();
        ctx.translate(-50, -35);
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, 100, 70);
      ctx.restore();
      ctx.save();
        ctx.translate(0, 20);
        ctx.save();
          ctx.rotate(0);
          ctx.translate(75, 0);
          ctx.translate(-10, -10);
          ctx.fillStyle = 'red';
          ctx.fillRect(0, 0, 20, 20);
        ctx.restore();
        ctx.save();
          ctx.rotate(0);
          ctx.translate(-75, 0);
          ctx.translate(-10, -10);
          ctx.fillStyle = 'red';
          ctx.fillRect(0, 0, 20, 20);
        ctx.restore();
      ctx.restore();
      // ctx.translate(-this.img.body.width/2, -this.img.body.height/2);
      // ctx.drawImage(this.img.body, 0, 0);
    ctx.restore();
  }
  recenter() {
    this.position = V2(canvas.width/2, canvas.height/2);
  }
  tick() {
    this.direction.lookAt(mousePos.sub(this.position).angle());
    if (keys.UP) this.position.add_i(V2(0, -1).scale_i(this.SPEED));
    else if (keys.DOWN) this.position.add_i(V2(0, 1).scale_i(this.SPEED));
    if (keys.LEFT) this.position.add_i(V2(-1, 0).scale_i(this.SPEED));
    else if (keys.RIGHT) this.position.add_i(V2(1, 0).scale_i(this.SPEED));
  }
}

main = () => {
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');
  mousePos = V2();
  window.onmousemove = handleMouseInput;
  keys = {UP: false, DOWN: false, LEFT: false, RIGHT: false};
  window.onkeyup = window.onkeydown = handleKeyInput;
  player = new Player();
  resizeCanvas();
  window.onresize = resizeCanvas;
  tick();
}

handleKeyInput = (event) => {
  switch (event.key) {
    case 'w':
      keys.UP = (event.type === 'keydown');
      break;
    case 'a':
      keys.LEFT = (event.type === 'keydown');
      break;
    case 's':
      keys.DOWN = (event.type === 'keydown');
      break;
    case 'd':
      keys.RIGHT = (event.type === 'keydown');
      break;
    default:

  }
}

handleMouseInput = (event) => {
  mousePos = V2(event.clientX, event.clientY);
}

resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  player.recenter();
  redraw();
}

redraw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.redraw();
}

tick = () => {
  requestAnimationFrame(tick);
  player.tick();
  redraw();
}
