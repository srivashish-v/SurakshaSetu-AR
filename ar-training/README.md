# WebAR Mining Safety POC — Checkpoint 1

Goal of this checkpoint only: open on an Android phone, ask for camera
permission, recognize ONE printed image, and show a simple orange cube
anchored to it. No mining model, no tap interactions yet.

## 1. Folder structure

```
webar-mining-poc/
├── index.html
├── style.css
├── app.js
├── README.md
└── assets/
    ├── targets/
    │   └── targets.mind        <- you generate this (see Section 5)
    └── images/
        └── (your source marker image, for reference only)
```

## 2. Files

All files are already created for you:
- `index.html` — the A-Frame + MindAR scene
- `style.css` — minimal styling + status banner
- `app.js` — shows "target found / lost" text on screen (for debugging on the phone)

You do NOT need to write any JavaScript build tooling, npm install, or
bundler. Everything loads from CDN `<script>` tags in `index.html`.

## 3. Where the libraries come from

Both libraries are loaded directly from CDNs in `index.html` — nothing to download:

- **A-Frame**: `https://aframe.io/releases/1.5.0/aframe.min.js`
- **MindAR (A-Frame build)**: `https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js`

If you ever want them offline (e.g. no wifi during your demo), download
the two files above and save them locally, then change the `<script src="...">`
paths in `index.html` to point at your local copies, e.g. `./libs/aframe.min.js`.

## 4. How to create your image target (targets.mind)

MindAR needs a compiled `.mind` file, not the raw image.

1. Pick a good marker image: high contrast, lots of texture/detail,
   not symmetric, not a plain logo. A photo of rocky/mine-wall texture
   works well thematically and technically.
2. Go to the official MindAR compiler tool (runs in your browser, no install):
   **https://hiukim.github.io/mind-ar-js-doc/tools/compile**
3. Upload your image. It will show tracking-quality feature points.
4. Click "Export" / "Download" to get a file called `targets.mind`.
5. Put that file at: `webar-mining-poc/assets/targets/targets.mind`
6. Print the same image on paper (or display it on a second screen/tablet)
   — this is the physical marker you'll point the phone camera at.

Delete the placeholder `.txt` files in `assets/targets/` and `assets/images/`
once you've added your real files (they're just there so the folders exist
in the download).

## 5. How to run it locally (on your laptop, for quick checks)

Camera access requires either `https://` or `localhost` — plain `http://`
from a `file://` path will NOT work.

Easiest option, using Python (already installed on most systems):

```bash
cd webar-mining-poc
python3 -m http.server 8080
```

Then open `http://localhost:8080` in Chrome on your laptop. The camera
should ask for permission and the cube should appear when you show it
the printed/screen image (or your laptop's own image on paper — same idea).

## 6. How to test it on an Android phone

Your phone needs to reach the server over `https://`. Two common ways:

### Option A — ngrok (recommended, easiest)
1. On your laptop, run the local server as in Section 5.
2. Install ngrok: https://ngrok.com/download
3. Run: `ngrok http 8080`
4. ngrok gives you a public `https://xxxx.ngrok-free.app` URL.
5. Open that URL in Chrome on your Android phone.
6. Allow camera access when prompted.
7. Point the phone at your printed target image.

### Option B — Same wifi network, no tunnel (Chrome flag trick)
1. Find your laptop's local IP (e.g. `192.168.1.23`) via `ipconfig`/`ifconfig`.
2. Run the local server (Section 5) so it's reachable at
   `http://192.168.1.23:8080`.
3. On the Android phone, in Chrome, go to:
   `chrome://flags/#unsafely-treat-insecure-origin-as-secure`
4. Enable it and add `http://192.168.1.23:8080` to the text box.
5. Relaunch Chrome, then open that URL on the phone.

ngrok is generally more reliable for a hackathon demo since it just works
regardless of network setup.

## 7. What "success" looks like for this checkpoint

- Page loads, camera permission prompt appears.
- Status banner at top says "Point camera at the target image..."
- When the phone camera sees your printed image, banner changes to
  "Target found!" and an orange cube appears anchored to the image.
- Moving the phone around the image, the cube stays locked to it.
- Banner changes back to "Target lost..." when the image goes out of view.

Record this with a second phone for your PPT once it's working.

## 8. Common errors and fixes

| Problem | Likely cause | Fix |
|---|---|---|
| Blank white/black screen, no camera prompt | Page loaded over plain `http://` on a non-localhost address | Use ngrok (Option A) or the Chrome flag trick (Option B) |
| Camera prompt appears but never shows video | Another app/tab is using the camera | Close other camera apps/tabs, reload the page |
| "targets.mind not found" / 404 in console | File missing or wrong path/name | Confirm file is exactly `assets/targets/targets.mind` (case-sensitive) |
| Cube never appears even with the image in view | Marker image has poor contrast/detail, or lighting is bad | Recompile `.mind` with a higher-detail image; test in good lighting |
| Cube flickers or jitters a lot | Marker printed too small, glare on paper, low light | Print larger, matte paper, avoid glossy/reflective surface, better lighting |
| Works on laptop Chrome but not on phone | Different camera permissions / insecure origin on mobile | Double-check the phone is using `https://` (ngrok) or the flag from Option B |
| Console error mentioning CORS or CDN blocked | No internet access on the phone | MindAR/A-Frame `<script>` tags load from CDN — phone needs internet, or use local copies (Section 3) |
| "NotAllowedError: Permission denied" | Camera permission was denied once and cached | In Chrome, tap the padlock/info icon near the address bar → Permissions → allow Camera → reload |
| Image target detected but cube appears in wrong place/orientation | Normal for very early checkpoints, or target image has low feature density | Fine for checkpoint 1 as long as it's *roughly* anchored; refine marker image later if needed |

## Next steps (do NOT do yet per your instructions)

Once this checkpoint is confirmed working on your Android phone:
- Swap the orange cube for the actual mining scenario GLB/GLTF model.
- Add tap-to-interact on hazard objects with a safety message popup.

Both of those are separate follow-up checkpoints.
