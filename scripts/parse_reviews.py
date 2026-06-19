"""Parse the scraped Google reviews TXT into structured JSON.

Filters to 4+ star reviews (Quiet-Luxury curation: hides the two 1-star
entries) while keeping the true aggregate rating/count for the trust badge
and JSON-LD schema.
"""

import json
import os
import re

SRC = os.path.expanduser("~/Downloads/AlSafi_Google_Reviews.txt")
OUT = os.path.join(os.path.dirname(__file__), "..", "data", "google-reviews.json")
OUT = os.path.abspath(OUT)
os.makedirs(os.path.dirname(OUT), exist_ok=True)

with open(SRC, encoding="utf-8") as f:
    raw = f.read()

# Header aggregates
overall = float(re.search(r"Overall Rating:\s*([\d.]+)", raw).group(1))
total = int(re.search(r"Total Reviews:\s*(\d+)", raw).group(1))

blocks = re.split(r"REVIEW #\d+", raw)[1:]

reviews = []
for b in blocks:
    name = re.search(r"Reviewer Name\s*:\s*(.+)", b)
    info = re.search(r"Reviewer Info\s*:\s*(.+)", b)
    rating = re.search(r"Star Rating\s*:\s*(\d+)/5", b)
    date = re.search(r"Date / Timing\s*:\s*(.+)", b)
    text = re.search(r"Review Text\s*:\s*(.+)", b)
    if not (name and rating):
        continue
    rtext = text.group(1).strip() if text else ""
    if rtext.startswith("(No text"):
        rtext = ""
    reviews.append(
        {
            "name": name.group(1).strip(),
            "info": info.group(1).strip() if info else "",
            "rating": int(rating.group(1)),
            "date": date.group(1).strip() if date else "",
            "text": rtext,
        }
    )

MIN_RATING = 4
displayed = [r for r in reviews if r["rating"] >= MIN_RATING]
# Sort: reviews with text first (5-star with text are strongest), then rating
displayed.sort(key=lambda r: (r["text"] == "", -r["rating"]))

data = {
    "businessName": "Al Safi Furniture Manufacturing LLC",
    "sourceUrl": "https://share.google/JGbRT4g9vkgRiW2Gp",
    "overallRating": overall,
    "totalReviewCount": total,
    "displayedReviewCount": len(displayed),
    "minRatingDisplayed": MIN_RATING,
    "scrapedAt": "2026-06",
    "reviews": displayed,
}

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Parsed {len(reviews)} total, displaying {len(displayed)} (>= {MIN_RATING}*)")
print(f"Wrote {OUT}")
