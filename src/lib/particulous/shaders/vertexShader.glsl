attribute float size;
attribute float alpha;
attribute vec3 color;

varying float vAlpha;
varying vec3 vColor;

void main() {
  vAlpha = alpha;
  vColor = color;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = size * 200. / gl_Position.w;
}
