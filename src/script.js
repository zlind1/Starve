
let canvas, ctx, player, mousePos, keys;

main = () => {
  canvas = document.querySelector('canvas');
  ctx = canvas.getContext('2d');
  mousePos = V2();
  window.onmousemove = handleMouseInput;
  window.onmousedown = window.onmouseup = handleClick;
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

handleClick = (event) => {
  player.hitting = (event.type === 'mousedown');
}

resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  player.recenter(canvas);
  redraw();
}

redraw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.redraw(ctx);
}

tick = () => {
  requestAnimationFrame(tick);
  player.tick(mousePos, keys);
  redraw();
}
