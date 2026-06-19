"""Generate favicon, apple-touch-icon, and OG image from logo assets."""

from PIL import Image
import os

PUB = os.path.join(os.path.dirname(__file__), "..", "public")
PUB = os.path.abspath(PUB)
LOGO = os.path.join(PUB, "logo")

CREAM = (249, 243, 238)
BROWN = (60, 36, 21)


def paste_centered(canvas, img, box=None):
    cw, ch = canvas.size
    if box:
        max_w, max_h = box
    else:
        max_w, max_h = cw, ch
    r = min(max_w / img.width, max_h / img.height)
    new = img.resize((max(1, int(img.width * r)), max(1, int(img.height * r))))
    x = (cw - new.width) // 2
    y = (ch - new.height) // 2
    canvas.alpha_composite(new, (x, y))


# --- Favicon (32) + apple-touch-icon (180) from icon-regular ---
icon = Image.open(os.path.join(LOGO, "icon-regular-transparent.png")).convert("RGBA")

for size, name, pad in [(32, "favicon-32.png", 3), (180, "apple-touch-icon.png", 28)]:
    canvas = Image.new("RGBA", (size, size), CREAM + (255,))
    paste_centered(canvas, icon, (size - pad * 2, size - pad * 2))
    canvas.convert("RGB").save(os.path.join(PUB, name))
    print(f"wrote {name}")

# favicon.ico (multi-size)
ico = Image.new("RGBA", (64, 64), CREAM + (255,))
paste_centered(ico, icon, (54, 54))
ico.convert("RGB").save(
    os.path.join(PUB, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)]
)
print("wrote favicon.ico")

# --- OG image 1200x630 with horizontal lockup on cream ---
og = Image.new("RGBA", (1200, 630), CREAM + (255,))
lockup = Image.open(
    os.path.join(LOGO, "lockup-horizontal-transparent.png")
).convert("RGBA")
paste_centered(og, lockup, (760, 280))
# subtle hairline frame
frame = Image.new("RGBA", (1200, 630), (0, 0, 0, 0))
from PIL import ImageDraw

d = ImageDraw.Draw(frame)
d.rectangle([40, 40, 1159, 589], outline=BROWN + (40,), width=1)
og.alpha_composite(frame)
og.convert("RGB").save(os.path.join(PUB, "og-image.png"))
print("wrote og-image.png")
