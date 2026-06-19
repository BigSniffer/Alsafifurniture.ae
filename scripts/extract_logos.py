"""Extract individual logo assets from the brand sheet.

Crops the 9 variants (3 wordmarks, 3 icons, 3 lockups), auto-trims each to its
content bounding box, and writes two versions per asset:
  - *-transparent.png : cream background removed (alpha), original tone kept
  - *-cream.png        : flattened on the brand cream background

The transparency keeps the dark-brown anti-aliased edges clean so the marks can
be placed on any background (e.g. a cream or brown header).
"""

from PIL import Image
import os

SRC = os.path.expanduser(
    "~/.cursor/projects/Users-user-Documents-GitHub-Alsafifurniture-ae/assets/"
    "WhatsApp_Image_2026-06-19_at_18.37.26-adc72e73-b10b-409c-9de3-ac47ff24418a.png"
)
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "logo")
OUT = os.path.abspath(OUT)
os.makedirs(OUT, exist_ok=True)

img = Image.open(SRC).convert("RGB")
W, H = img.size
px = img.load()

# Sample the background (cream) from a clean corner.
bg = px[8, 8]
BG_LUM = 0.299 * bg[0] + 0.587 * bg[1] + 0.114 * bg[2]

# Rough regions (x0, y0, x1, y1) that isolate each mark and EXCLUDE the
# section labels and divider lines.
REGIONS = {
    "wordmark-serif":      (30,  75,  335, 165),
    "wordmark-serif-bold": (375, 75,  670, 165),
    "wordmark-sans":       (715, 75,  995, 165),
    "icon-thin":           (100, 230, 265, 415),
    "icon-regular":        (430, 230, 600, 415),
    "icon-bold":           (765, 230, 930, 415),
    "lockup-horizontal":   (30,  495, 375, 585),
    "lockup-stacked-1":    (390, 485, 590, 635),
    "lockup-stacked-2":    (755, 485, 1000, 635),
}

# A pixel counts as "content" if noticeably darker than the cream background.
CONTENT_THRESHOLD = 28  # luma difference


def luma(c):
    return 0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]


def tight_bbox(x0, y0, x1, y1):
    """Shrink the rough region to the actual content (non-background) bbox."""
    minx, miny, maxx, maxy = x1, y1, x0, y0
    found = False
    for y in range(y0, y1):
        for x in range(x0, x1):
            if BG_LUM - luma(px[x, y]) > CONTENT_THRESHOLD:
                found = True
                if x < minx: minx = x
                if y < miny: miny = y
                if x > maxx: maxx = x
                if y > maxy: maxy = y
    if not found:
        return None
    return minx, miny, maxx + 1, maxy + 1


def make_transparent(region):
    """Return an RGBA crop where cream -> transparent, tone preserved."""
    rgba = region.convert("RGBA")
    out = rgba.load()
    rw, rh = rgba.size
    for y in range(rh):
        for x in range(rw):
            r, g, b, _ = out[x, y]
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            # alpha grows as the pixel gets darker than the cream bg
            a = (BG_LUM - lum) / BG_LUM
            a = max(0.0, min(1.0, a * 1.15))
            out[x, y] = (r, g, b, int(round(a * 255)))
    return rgba


PAD = 10
summary = []
for name, box in REGIONS.items():
    bbox = tight_bbox(*box)
    if bbox is None:
        summary.append(f"{name}: NO CONTENT FOUND")
        continue
    x0, y0, x1, y1 = bbox
    x0 = max(0, x0 - PAD)
    y0 = max(0, y0 - PAD)
    x1 = min(W, x1 + PAD)
    y1 = min(H, y1 + PAD)
    crop = img.crop((x0, y0, x1, y1))

    cream_path = os.path.join(OUT, f"{name}-cream.png")
    crop.save(cream_path)

    transparent = make_transparent(crop)
    trans_path = os.path.join(OUT, f"{name}-transparent.png")
    transparent.save(trans_path)

    summary.append(f"{name}: {x1-x0}x{y1-y0}  ->  {name}-transparent.png / -cream.png")

print(f"Background sampled: {bg}  (luma {BG_LUM:.0f})")
print(f"Output dir: {OUT}\n")
print("\n".join(summary))
