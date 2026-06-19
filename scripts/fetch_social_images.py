#!/usr/bin/env python3
"""Fetch portfolio photos from Instagram + Google Business (via Yango mirror)."""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / ".src-images"
PUBLIC = ROOT / "public" / "images"

IG_USER = "alsafi_furniture"
IG_APP_ID = "936619743392459"

YANGO_PHOTOS = [
    "https://avatars.mds.yandex.net/get-altay/9916116/2a00000188a725086ca7f98f330c39a4aa07/orig",
    "https://avatars.mds.yandex.net/get-altay/901763/2a00000188a756aaa52bf453f64f3934bfa2/orig",
    "https://avatars.mds.yandex.net/get-altay/6529816/2a00000188a894281f244c65b80e08d3ea39/orig",
    "https://avatars.mds.yandex.net/get-altay/9717139/2a00000188c96349998ea4eb499acbcd1d6a/orig",
    "https://avatars.mds.yandex.net/get-altay/7690462/2a00000188aec7e27cfe6ab25c4c50b31184/orig",
    "https://avatars.mds.yandex.net/get-altay/9368060/2a00000188a8465561f1e75787b52aee2d25/orig",
]

# Curated best picks (Instagram + Google Business photos)
SITE_MAPPING = {
    "hero-interior.jpg": (".src-images/instagram/ig-07.jpg", 1700, 1900),
    "gallery-kitchen.jpg": (".src-images/instagram/ig-04.jpg", 1100, 1375),
    "gallery-wardrobe.jpg": (".src-images/instagram/ig-02.jpg", 1100, 1375),
    "gallery-paneling.jpg": (".src-images/instagram/ig-12.jpg", 1100, 1375),
    "gallery-joinery.jpg": (".src-images/instagram/ig-03.jpg", 1100, 1375),
    "gallery-hospitality.jpg": (".src-images/instagram/ig-10.jpg", 1100, 1375),
    "gallery-reception.jpg": (".src-images/google/g-04.jpg", 1100, 1375),
    "about-craft.jpg": (".src-images/instagram/ig-09.jpg", 1100, 1375),
}


def download(url: str, dest: Path) -> None:
    req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(req, timeout=45) as resp:
        dest.write_bytes(resp.read())


def fetch_instagram() -> None:
    dest_dir = SRC / "instagram"
    dest_dir.mkdir(parents=True, exist_ok=True)
    req = Request(
        f"https://www.instagram.com/api/v1/users/web_profile_info/?username={IG_USER}",
        headers={
            "User-Agent": "Mozilla/5.0",
            "X-IG-App-ID": IG_APP_ID,
        },
    )
    with urlopen(req, timeout=30) as resp:
        data = json.load(resp)
    edges = data["data"]["user"]["edge_owner_to_timeline_media"]["edges"]
    for i, edge in enumerate(edges, 1):
        url = edge["node"]["display_url"]
        download(url, dest_dir / f"ig-{i:02d}.jpg")
    print(f"Instagram: {len(edges)} posts saved")


def fetch_google() -> None:
    dest_dir = SRC / "google"
    dest_dir.mkdir(parents=True, exist_ok=True)
    for i, url in enumerate(YANGO_PHOTOS, 1):
        download(url, dest_dir / f"g-{i:02d}.jpg")
    print(f"Google Business (Yango mirror): {len(YANGO_PHOTOS)} photos saved")


def cover_crop(im, tw: int, th: int):
    from PIL import Image, ImageOps

    im = ImageOps.exif_transpose(im.convert("RGB"))
    scale = max(tw / im.width, th / im.height)
    im = im.resize((int(im.width * scale), int(im.height * scale)))
    left = (im.width - tw) // 2
    top = (im.height - th) // 2
    return im.crop((left, top, left + tw, top + th))


def build_site_images() -> None:
    from PIL import Image

    PUBLIC.mkdir(parents=True, exist_ok=True)
    for filename, (rel_src, w, h) in SITE_MAPPING.items():
        src = ROOT / rel_src
        if not src.exists():
            raise FileNotFoundError(f"Missing source image: {src}")
        out = PUBLIC / filename
        cover_crop(Image.open(src), w, h).save(out, "JPEG", quality=88, optimize=True)
        print(f"Built {filename}")


def main() -> int:
    fetch_instagram()
    fetch_google()
    build_site_images()
    return 0


if __name__ == "__main__":
    sys.exit(main())
