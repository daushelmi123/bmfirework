#!/usr/bin/env python3
"""
Optimize a heavy SVG that embeds base64 PNG by:
  1) Extracting the first embedded PNG
  2) Resizing it to fit 800x200 (transparent canvas, centered, no distortion)
  3) Re-encoding the PNG with optimized compression
  4) Emitting a minimal SVG wrapper containing only the optimized PNG

Usage:
  python3 design/optimize_banner_svg.py \
    --src assets/banner-collab.svg \
    --out assets/banner-collab.svg

Requires: Pillow
"""

from __future__ import annotations

import argparse
import base64
import os
import re
from io import BytesIO
from typing import Optional

from PIL import Image

WIDTH = 800
HEIGHT = 200


def extract_first_png_data(svg_text: str) -> Optional[bytes]:
    m = re.search(r"data:image/png;base64,([A-Za-z0-9+/=]+)", svg_text)
    if not m:
        return None
    return base64.b64decode(m.group(1))


def build_min_svg(png_bytes: bytes, width: int, height: int) -> str:
    data_uri = "data:image/png;base64," + base64.b64encode(png_bytes).decode("ascii")
    return (
        f"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"{width}\" height=\"{height}\" "
        f"viewBox=\"0 0 {width} {height}\" preserveAspectRatio=\"xMidYMid meet\">"
        f"<image href=\"{data_uri}\" x=\"0\" y=\"0\" width=\"{width}\" height=\"{height}\" "
        f"preserveAspectRatio=\"xMidYMid meet\"/></svg>"
    )


def optimize_png_to_banner(png_data: bytes, width: int, height: int) -> bytes:
    img = Image.open(BytesIO(png_data)).convert("RGBA")
    # Fit into width x height canvas while preserving aspect
    src_w, src_h = img.size
    scale = min(width / src_w, height / src_h)
    new_size = (max(1, int(src_w * scale)), max(1, int(src_h * scale)))
    resized = img.resize(new_size, Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    x = (width - new_size[0]) // 2
    y = (height - new_size[1]) // 2
    canvas.alpha_composite(resized, (x, y))

    # Save optimized PNG
    out = BytesIO()
    canvas.save(out, format="PNG", optimize=True, compress_level=9)
    return out.getvalue()


def main() -> None:
    p = argparse.ArgumentParser(description="Optimize heavy embedded-PNG SVG into a minimal 800x200 SVG")
    p.add_argument("--src", required=True, help="Source SVG path (with embedded PNG)")
    p.add_argument("--out", required=True, help="Output SVG path (will overwrite if same as src)")
    args = p.parse_args()

    with open(args.src, "r", encoding="utf-8", errors="ignore") as f:
        svg_text = f.read()

    png_data = extract_first_png_data(svg_text)
    if not png_data:
        raise SystemExit("No embedded PNG found in SVG.")

    optimized_png = optimize_png_to_banner(png_data, WIDTH, HEIGHT)
    min_svg = build_min_svg(optimized_png, WIDTH, HEIGHT)

    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as f:
        f.write(min_svg)
    print(f"Optimized SVG saved: {args.out} (size ~{len(min_svg)} bytes)")


if __name__ == "__main__":
    main()






