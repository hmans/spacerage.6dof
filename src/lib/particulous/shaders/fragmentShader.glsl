uniform sampler2D pointTexture;

varying float vAlpha;
varying vec3 vColor;

void main() {
  gl_FragColor = vec4(vColor, vAlpha) * texture2D(pointTexture, gl_PointCoord);
}
