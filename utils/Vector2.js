
class Vector2 {
  constructor(x=0, y=0) {
    this.x = x; this.y = y;
  }
  length = () => Math.sqrt(this.x**2 + this.y**2);

  dot = (other) => this.x*other.x + this.y*other.y;

  add_i = (other) => { this.x += other.x; this.y += other.y; return this; }
  add = (other) => new Vector2(this.x, this.y).add_i(other);

  sub_i = (other) => { this.x -= other.x; this.y -= other.y; return this; }
  sub = (other) => new Vector2(this.x, this.y).sub_i(other);

  scale_i = (scalar) => { this.x *= scalar; this.y *= scalar; return this; }
  scale = (scalar) => new Vector2(this.x, this.y).scale_i(scalar);

  norm_i = () => this.scale_i(1/this.length());
  norm = () => new Vector2(this.x, this.y).norm_i();

  angle = (other=null) => {
    if (other === null) return Math.atan2(this.y, this.x);
    else return Math.abs(this.angle() - other.angle());
  }
  lookAt = (angle) => {
    this.x = Math.cos(angle); this.y = Math.sin(angle); return this;
  }
  rotate = (angle) => this.lookAt(this.angle()+angle);
  print = () => { console.log('('+this.x+', '+this.y+')'); }
}

let V2 = (x, y) => new Vector2(x, y);
