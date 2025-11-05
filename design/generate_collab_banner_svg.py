#!/usr/bin/env python3
"""
Generate an 800x200 SVG collaboration banner with transparent background.
- Side-by-side layout: Bearboom (left) x BMFireworks (right), no overlap
- Centered title text: "Bearboom x BMFireworks"
- Option to crop bottom of BMFireworks image to remove trailing "HQ"

Usage:
  python3 design/generate_collab_banner_svg.py \
      --bear /path/to/bearboom.png \
      --bm /path/to/bmfireworks.png \
      --out assets/banner-collab.svg

Requires: Pillow (for optional cropping and PNG encoding)
  python3 -m pip install pillow
"""

from __future__ import annotations

import argparse
import base64
import io
import os
from typing import Tuple

from PIL import Image, ImageFont, ImageDraw

WIDTH = 800
HEIGHT = 200
MARGIN_X = 28
MARGIN_Y = 20
TEXT_AREA_H = 44


def load_and_optionally_crop(path: str, crop_bottom_ratio: float = 0.0) -> Image.Image:
    img = Image.open(path).convert("RGBA")
    if crop_bottom_ratio > 0.0:
        w, h = img.size
        cut = int(h * (1.0 - crop_bottom_ratio))
        cut = max(1, min(h, cut))
        img = img.crop((0, 0, w, cut))
    return img


def fit_within(img: Image.Image, max_box: Tuple[int, int]) -> Image.Image:
    mw, mh = max_box
    w, h = img.size
    scale = min(mw / w, mh / h)
    new_size = (max(1, int(w * scale)), max(1, int(h * scale)))
    return img.resize(new_size, Image.Resampling.LANCZOS)


def as_png_data_uri(img: Image.Image) -> str:
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    b64 = base64.b64encode(buf.getvalue()).decode("ascii")
    return f"data:image/png;base64,{b64}"


def compute_text_position(text: str, font_size: int) -> Tuple[int, int, int]:
    # Use PIL to measure approximate width; final rendering is in SVG
    try:
        font = ImageFont.truetype("DejaVuSans-Bold.ttf", font_size)
    except Exception:
        font = ImageFont.load_default()
    dummy = Image.new("RGBA", (1, 1))
    d = ImageDraw.Draw(dummy)
    bbox = d.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    x = (WIDTH - tw) // 2
    y = MARGIN_Y + (TEXT_AREA_H - th) // 2
    return x, y, th


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate transparent SVG banner (800x200)")
    parser.add_argument("--bear", required=True, help="Path to Bearboom image (PNG with transparency preferred)")
    parser.add_argument("--bm", required=True, help="Path to BMFireworks image")
    parser.add_argument("--out", default=os.path.join("assets", "banner-collab.svg"), help="Output SVG path")
    parser.add_argument("--remove_hq", action="store_true", help="Crop bottom 18% of BM image to remove 'HQ'")
    parser.add_argument("--bm_crop_ratio", type=float, default=0.18, help="Bottom crop ratio for BM image when --remove_hq is set")
    parser.add_argument("--font_size", type=int, default=28, help="Title font size")
    parser.add_argument("--gap", type=int, default=16, help="Gap between left and right halves")
    parser.add_argument("--sparks", action="store_true", help="Add subtle glowing spark elements around products")
    parser.add_argument("--title", default="Bearboom x BMFireworks", help="Title text")
    args = parser.parse_args()

    bear = load_and_optionally_crop(args.bear)
    bm = load_and_optionally_crop(args.bm, crop_bottom_ratio=(args.bm_crop_ratio if args.remove_hq else 0.0))

    # Layout areas (transparent background)
    content_top = MARGIN_Y + TEXT_AREA_H
    content_bottom = HEIGHT - MARGIN_Y
    area_h = content_bottom - content_top
    half_gap = max(0, args.gap // 2)
    left_w = WIDTH // 2 - MARGIN_X - half_gap
    right_w = WIDTH - MARGIN_X - (WIDTH // 2 + half_gap)

    bear_fit = fit_within(bear, (left_w, area_h))
    bm_fit = fit_within(bm, (right_w, area_h))

    # Positions
    bear_x = MARGIN_X + (left_w - bear_fit.width) // 2
    bear_y = content_top + (area_h - bear_fit.height) // 2
    bm_x = WIDTH // 2 + half_gap + (right_w - bm_fit.width) // 2
    bm_y = content_top + (area_h - bm_fit.height) // 2

    # Prepare data URIs
    bear_uri = as_png_data_uri(bear_fit)
    bm_uri = as_png_data_uri(bm_fit)

    # Title
    title = args.title
    tx, ty, th = compute_text_position(title, args.font_size)

    # Optional sparks SVG chunk
    sparks_svg = ""
    if args.sparks:
        positions = [
            (bear_x + 20, bear_y - 6, 6),
            (bear_x + bear_fit.width - 10, bear_y + 8, 5),
            (bear_x + bear_fit.width // 2, bear_y - 10, 7),
            (bm_x - 12, bm_y + 4, 5),
            (bm_x + bm_fit.width + 12, bm_y + 10, 6),
            (bm_x + bm_fit.width // 2, bm_y - 8, 7),
        ]
        circles = "\n  ".join([
            f'<circle cx="{x}" cy="{y}" r="{r}" fill="url(#sparkGrad)" />'
            for (x, y, r) in positions
        ])
        sparks_svg = (
            "<defs><radialGradient id=\"sparkGrad\" cx=\"50%\" cy=\"50%\" r=\"50%\">"
            "<stop offset=\"0%\" stop-color=\"#FFE6A0\" stop-opacity=\"1\"/>"
            "<stop offset=\"100%\" stop-color=\"#FFD36B\" stop-opacity=\"0\"/>"
            "</radialGradient></defs>\n  " + circles
        )

    # Build SVG
    svg = f"""
<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"{WIDTH}\" height=\"{HEIGHT}\" viewBox=\"0 0 {WIDTH} {HEIGHT}\" preserveAspectRatio=\"xMidYMid meet\">
  <defs>
    <filter id=\"textGlow\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\"> 
      <feGaussianBlur in=\"SourceGraphic\" stdDeviation=\"1.8\" result=\"blur\"/>
      <feMerge>
        <feMergeNode in=\"blur\"/>
        <feMergeNode in=\"SourceGraphic\"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Centered title, no background -->
  <text x=\"{tx}\" y=\"{ty + th}\" font-family=\"Inter, Montserrat, Arial, sans-serif\" font-weight=\"700\" font-size=\"{args.font_size}\" fill=\"#ffffff\" filter=\"url(#textGlow)\">{title}</text>

  <!-- Left (Bearboom) -->
  <image href=\"{bear_uri}\" x=\"{bear_x}\" y=\"{bear_y}\" width=\"{bear_fit.width}\" height=\"{bear_fit.height}\" preserveAspectRatio=\"xMidYMid meet\"/>

  <!-- Right (BMFireworks) -->
  <image href=\"{bm_uri}\" x=\"{bm_x}\" y=\"{bm_y}\" width=\"{bm_fit.width}\" height=\"{bm_fit.height}\" preserveAspectRatio=\"xMidYMid meet\"/>

  <!-- Optional sparks -->
  {sparks_svg}
</svg>
""".strip()

    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as f:
        f.write(svg)
    print(f"Saved banner: {args.out}")


if __name__ == "__main__":
    main()


