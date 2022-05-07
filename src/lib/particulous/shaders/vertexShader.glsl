attribute float size;
attribute float alpha;
attribute vec3 color;

varying float vAlpha;
varying vec3 vColor;

void main() {
  vAlpha = alpha;
  vColor = color;

  gl_PointSize = size * 8.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
