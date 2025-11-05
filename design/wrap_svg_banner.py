#!/usr/bin/env python3
"""
Wrap a source SVG (any aspect, e.g. 1024x1024) into a transparent 800x200 banner
without distortion. The source SVG is embedded as a data URI and scaled to fit
within margins while preserving aspect ratio and centered.

Usage:
  python3 design/wrap_svg_banner.py \
    --src /path/to/source.svg \
    --out assets/banner-collab.svg \
    --width 800 --height 200 --margin 20
"""

from __future__ import annotations

import argparse
import base64
import os
import re


def parse_svg_size(svg_text: str) -> tuple[int, int]:
    width = 1024
    height = 1024
    # Attempt to read width/height from the root <svg>
    m = re.search(r"<svg[^>]*\bwidth=\"(\d+)\"[^>]*\bheight=\"(\d+)\"", svg_text)
    if m:
        try:
            width = int(m.group(1))
            height = int(m.group(2))
        except Exception:
            pass
    return width, height


def wrap_svg(src_path: str, out_path: str, width: int, height: int, margin: int) -> None:
    with open(src_path, "rb") as f:
        raw = f.read()
    text = raw.decode("utf-8", errors="ignore")
    src_w, src_h = parse_svg_size(text)

    content_w = max(1, width - 2 * margin)
    content_h = max(1, height - 2 * margin)

    scale = min(content_w / src_w, content_h / src_h)
    disp_w = int(src_w * scale)
    disp_h = int(src_h * scale)
    x = (width - disp_w) // 2
    y = (height - disp_h) // 2

    data_uri = "data:image/svg+xml;base64," + base64.b64encode(raw).decode("ascii")

    svg_out = f"""
<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" preserveAspectRatio="xMidYMid meet">
  <!-- Transparent background (no rect) -->
  <image href="{data_uri}" x="{x}" y="{y}" width="{disp_w}" height="{disp_h}" preserveAspectRatio="xMidYMid meet"/>
</svg>
""".strip()

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(svg_out)
    print(f"Saved banner: {out_path}")


def main() -> None:
    p = argparse.ArgumentParser(description="Wrap a source SVG into an 800x200 transparent banner")
    p.add_argument("--src", required=True, help="Path to source SVG (e.g. square 1024x1024)")
    p.add_argument("--out", default=os.path.join("assets", "banner-collab.svg"), help="Output SVG path")
    p.add_argument("--width", type=int, default=800, help="Output width")
    p.add_argument("--height", type=int, default=200, help="Output height")
    p.add_argument("--margin", type=int, default=20, help="Outer margin on all sides")
    args = p.parse_args()

    wrap_svg(args.src, args.out, args.width, args.height, args.margin)


if __name__ == "__main__":
    main()


