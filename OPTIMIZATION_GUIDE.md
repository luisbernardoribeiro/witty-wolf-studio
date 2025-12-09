# Performance Optimization Guide

## Current Issues
- **hero-video.mp4**: 17.93 MB → needs to be ~3-5 MB
- **Portfolio images**: 30 images totaling ~70 MB → needs optimization

## Solutions Implemented

### 1. Next.js Configuration ✅
- Enabled AVIF/WebP image optimization
- Configured optimal device and image sizes
- Enabled compression and font optimization

### 2. Lazy Loading ✅
- Added Intersection Observer to portfolio
- Images load only when they come into viewport
- Reduces initial page load significantly

### 3. Manual Steps Needed

#### Option A: Use Online Tool (Easiest)
1. Go to https://ezgif.com/video-to-gif or https://cloudconvert.com/
2. Upload `hero-video.mp4`
3. Convert to WebM or MP4 with these settings:
   - Video bitrate: 1500k (from current ~2500k+)
   - Resolution: 1920x1080 (keep HD)
   - Format: WebM (better compression)
4. Download and replace in `/public/`

#### Option B: Use FFmpeg (Best Quality)
```powershell
# Install FFmpeg if needed
# scoop install ffmpeg

# Compress video (17.93 MB → ~4 MB)
ffmpeg -i hero-video.mp4 -c:v libvpx-vp9 -b:v 1500k -c:a libopus -b:a 128k hero-video-compressed.webm

# Or use H.265 for MP4
ffmpeg -i hero-video.mp4 -c:v libx265 -crf 28 -b:v 1500k -c:a aac -b:a 128k hero-video-compressed.mp4
```

#### Option C: Use HandBrake (GUI)
1. Download from https://handbrake.fr/
2. Open hero-video.mp4
3. Set quality to ~50-60 (lower = smaller)
4. Video Codec: H.265
5. Target size: ~4 MB
6. Encode

## Expected Results After Optimization

| Asset | Before | After | Reduction |
|-------|--------|-------|-----------|
| hero-video.mp4 | 17.93 MB | ~4 MB | 78% ↓ |
| Portfolio (lazy load) | All loaded | Only visible | ~60% ↓ |
| WEBP conversion | PNGs ~60 MB | ~15 MB | 75% ↓ |
| **Total** | **~88 MB** | **~20 MB** | **77% ↓** |

## Deployment
After optimizing assets:
```powershell
git add -A
git commit -m "Performance: optimize video and images"
git push
```

## Monitoring
Check performance at:
- Vercel Analytics: https://vercel.com/dashboard
- PageSpeed Insights: https://pagespeed.web.dev/
- WebPageTest: https://www.webpagetest.org/
