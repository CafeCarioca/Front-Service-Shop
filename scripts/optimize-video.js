/**
 * Re-encodea public/coffee-hero.mp4 a 720p (el video es muted, se elimina
 * la pista de audio) y genera un poster JPG del primer frame para que el
 * hero de AboutUs muestre imagen al instante mientras el video descarga.
 *
 * Uso:  node scripts/optimize-video.js
 */
const path = require("path");
const fs = require("fs");
const { execFileSync } = require("child_process");
const ffmpeg = require("@ffmpeg-installer/ffmpeg").path;

const input = path.join(__dirname, "..", "public", "coffee-hero.mp4");
const tmp = path.join(__dirname, "..", "public", "coffee-hero.tmp.mp4");
const poster = path.join(__dirname, "..", "public", "coffee-hero-poster.jpg");

const kb = (f) => `${Math.round(fs.statSync(f).size / 1024)} KB`;

console.log(`Original: ${kb(input)}`);

// 720p, H.264 CRF 28, sin audio, faststart para streaming progresivo
execFileSync(ffmpeg, [
  "-y",
  "-i", input,
  "-vf", "scale=-2:720",
  "-c:v", "libx264",
  "-crf", "28",
  "-preset", "slow",
  "-movflags", "+faststart",
  "-an",
  tmp,
], { stdio: "inherit" });

// Poster: primer frame a 720p
execFileSync(ffmpeg, [
  "-y",
  "-i", input,
  "-vf", "scale=-2:720",
  "-frames:v", "1",
  "-q:v", "4",
  poster,
], { stdio: "inherit" });

fs.renameSync(tmp, input);
console.log(`Optimizado: ${kb(input)} | Poster: ${kb(poster)}`);
