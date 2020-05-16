

drawRect = (ctx, pos, size, color) => {
  ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.translate(-size.x/2, -size.y/2);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, size.x, size.y);
  ctx.restore();
}

class Player {
  SPEED = 4;
  BODY_COLOR = 'red';
  EYE_COLOR = 'black';
  BODY_SIZE = V2(100, 70);
  HAND_SIZE = V2(20, 20);
  EYE_OFFSET = V2(20, 15)

  constructor() {
    this.position = V2(canvas.width/2, canvas.height/2);
    this.direction = V2().lookAt(0);
    this.handSpacing = 15;
    this.handOffset = V2();
  }
  getHandSpacing = () => {
    let space = 5 + Math.abs(10-this.handSpacing);
    return V2(this.BODY_SIZE.x/2+this.HAND_SIZE.x/2+space, 0);
  }
  redraw(ctx) {
    ctx.save();
      ctx.translate(this.position.x, this.position.y);
      ctx.rotate(this.direction.angle()-Math.PI/2);
      drawRect(ctx, V2(0, 0), this.BODY_SIZE, this.BODY_COLOR);
      ctx.save();
        ctx.translate(0, this.EYE_OFFSET.y);
        drawRect(ctx, V2(-this.EYE_OFFSET.x, 0), this.HAND_SIZE, this.EYE_COLOR);
        drawRect(ctx, V2(this.EYE_OFFSET.x, 0), this.HAND_SIZE, this.EYE_COLOR);
        ctx.save();
          ctx.translate(0, this.handOffset.x);
          let ltheta = (this.handtheta < Math.PI ? 0 :
            (Math.PI/2 - Math.abs(this.handtheta-3*Math.PI/2))/2
          );
          ctx.rotate(ltheta);
          drawRect(ctx, this.getHandSpacing(), this.HAND_SIZE, this.BODY_COLOR);
        ctx.restore();
        ctx.save();
          ctx.translate(0, this.handOffset.y);
          let rtheta = (this.handtheta > Math.PI ? 0 :
            -(Math.PI/2 - Math.abs(this.handtheta-Math.PI/2))/2
          )
          ctx.rotate(rtheta);
          drawRect(ctx, this.getHandSpacing().scale_i(-1), this.HAND_SIZE, this.BODY_COLOR);
        ctx.restore();
      ctx.restore();
    ctx.restore();
  }
  recenter(canvas) {
    this.position = V2(canvas.width/2, canvas.height/2);
  }
  tick(mousePos, keys) {
    if (this.hitting) {
      this.handtheta += (Math.PI/30);
      let numHands = 2  // change number of hands to hit with
      if (this.handtheta >= numHands*Math.PI) this.handtheta = 0;
    } else {
      this.handtheta = 0;
      this.handSpacing += .1;
      if (this.handSpacing >= 20) this.handSpacing = 0;
    }
    this.direction.lookAt(mousePos.sub(this.position).angle());
    if (keys.UP) this.position.add_i(V2(0, -1).scale_i(this.SPEED));
    else if (keys.DOWN) this.position.add_i(V2(0, 1).scale_i(this.SPEED));
    if (keys.LEFT) this.position.add_i(V2(-1, 0).scale_i(this.SPEED));
    else if (keys.RIGHT) this.position.add_i(V2(1, 0).scale_i(this.SPEED));
  }
}
