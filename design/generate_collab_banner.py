#!/usr/bin/env python3
"""
Generate an 800x200 premium collaboration banner:
  - Composition: Bearboom (left) x BMFireworks (right), side-by-side, no overlap
  - Text centered: "Bearboom x BMFireworks"
  - Style: premium, fireworks vibe, dramatic glow/sparks, glossy finish

Usage:
  python3 design/generate_collab_banner.py \
      --bear assets/bearboom.png \
      --bm assets/bmfireworks.png \
      --out assets/banner-collab.png

Requires: Pillow
  pip install pillow

Place higher-resolution transparent PNGs if possible for best results.
"""

from __future__ import annotations

import argparse
import math
import os
import random
from typing import Optional, Tuple

from PIL import Image, ImageDraw, ImageFilter, ImageFont


WIDTH = 800
HEIGHT = 200
MARGIN_X = 28
MARGIN_Y = 20
TEXT_AREA_H = 44  # reserved height for the centered title text


def _find_bold_font(preferred_size: int) -> ImageFont.FreeTypeFont:
    """Best-effort discovery of a bold, modern font.
    Falls back to PIL's default if none found.
    """
    candidate_names = [
        # Common system fonts
        "Montserrat-Bold.ttf",
        "Inter-Bold.ttf",
        "Poppins-Bold.ttf",
        "SFNSDisplay-Bold.ttf",
        "HelveticaNeue-Bold.ttf",
        "Arial Bold.ttf",
        "Arial-Bold.ttf",
        "Arial-BoldMT.ttf",
        # DejaVu (usually bundled with PIL)
        "DejaVuSans-Bold.ttf",
    ]

    search_paths = [
        os.path.dirname(__file__),
        os.path.join(os.path.dirname(__file__), "fonts"),
        "/usr/share/fonts",
        "/usr/local/share/fonts",
        os.path.expanduser("~/Library/Fonts"),
        "/Library/Fonts",
        "/System/Library/Fonts",
        os.path.expanduser("~/.fonts"),
        os.path.expanduser("~/.local/share/fonts"),
    ]

    for base in search_paths:
        if not os.path.isdir(base):
            continue
        for name in candidate_names:
            path = os.path.join(base, name)
            if os.path.isfile(path):
                try:
                    return ImageFont.truetype(path, preferred_size)
                except Exception:
                    pass

    # Fallback
    return ImageFont.load_default()


def _draw_linear_gradient(size: Tuple[int, int], colors: Tuple[Tuple[int, int, int], Tuple[int, int, int]]) -> Image.Image:
    """Create a vertical linear gradient background image.
    colors: (top_rgb, bottom_rgb)
    """
    w, h = size
    top, bottom = colors
    gradient = Image.new("RGB", (1, h), color=0)
    draw = ImageDraw.Draw(gradient)
    for y in range(h):
        t = y / max(1, h - 1)
        r = int(top[0] + (bottom[0] - top[0]) * t)
        g = int(top[1] + (bottom[1] - top[1]) * t)
        b = int(top[2] + (bottom[2] - top[2]) * t)
        draw.point((0, y), fill=(r, g, b))
    return gradient.resize((w, h), resample=Image.Resampling.NEAREST)


def _add_vignette(canvas: Image.Image, strength: float = 0.6) -> None:
    """Darken edges subtly to add focus."""
    w, h = canvas.size
    vignette = Image.new("L", (w, h), 0)
    dv = ImageDraw.Draw(vignette)
    max_radius = math.hypot(w / 2, h / 2)
    for y in range(h):
        for x in range(w):
            dx = x - w / 2
            dy = y - h / 2
            d = math.hypot(dx, dy) / max_radius
            v = int(255 * min(1.0, max(0.0, (d ** 1.7) * strength)))
            dv.point((x, y), fill=v)
    vignette = vignette.filter(ImageFilter.GaussianBlur(radius=16))
    dark = Image.new("RGB", (w, h), color=(0, 0, 0))
    canvas.paste(dark, (0, 0), mask=vignette)


def _add_rays(canvas: Image.Image, color=(255, 230, 120), alpha=75, rays=12) -> None:
    """Add subtle radial light rays from center for festival vibe."""
    w, h = canvas.size
    cx, cy = w // 2, h // 2
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    length = max(w, h)
    for i in range(rays):
        angle = (i / rays) * 2 * math.pi
        x = cx + length * math.cos(angle)
        y = cy + length * math.sin(angle)
        d.line((cx, cy, x, y), fill=(color[0], color[1], color[2], alpha), width=4)
    layer = layer.filter(ImageFilter.GaussianBlur(radius=12))
    canvas.alpha_composite(layer)


def _draw_gloss(canvas: Image.Image, opacity: int = 70) -> None:
    """Glossy top highlight overlay."""
    w, h = canvas.size
    gloss = Image.new("RGBA", (w, h), (255, 255, 255, 0))
    gdraw = ImageDraw.Draw(gloss)
    for y in range(h // 2):
        t = y / max(1, (h // 2) - 1)
        a = int(opacity * (1.0 - t) ** 1.8)
        gdraw.rectangle([0, y, w, y], fill=(255, 255, 255, a))
    gloss = gloss.filter(ImageFilter.GaussianBlur(radius=4))
    canvas.alpha_composite(gloss)


def _load_fit(image_path: str, max_box: Tuple[int, int]) -> Image.Image:
    """Load image and fit into max_box maintaining aspect ratio; returns RGBA."""
    img = Image.open(image_path).convert("RGBA")
    max_w, max_h = max_box
    img_w, img_h = img.size
    scale = min(max_w / img_w, max_h / img_h)
    new_size = (max(1, int(img_w * scale)), max(1, int(img_h * scale)))
    return img.resize(new_size, Image.Resampling.LANCZOS)


def _add_soft_glow(canvas: Image.Image, bbox: Tuple[int, int, int, int], color: Tuple[int, int, int], spread: int = 40, blur: int = 24, alpha: int = 110) -> None:
    """Add a soft colored glow around a bounding box."""
    w, h = canvas.size
    glow_layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    g = ImageDraw.Draw(glow_layer)
    x0, y0, x1, y1 = bbox
    pad = spread
    g.rectangle((x0 - pad, y0 - pad, x1 + pad, y1 + pad), fill=(color[0], color[1], color[2], alpha))
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(radius=blur))
    canvas.alpha_composite(glow_layer)


def _add_sparks(canvas: Image.Image, count: int = 140, seed: Optional[int] = None) -> None:
    """Add subtle glowing particles and light sparks around products."""
    if seed is not None:
        random.seed(seed)
    w, h = canvas.size
    particles = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(particles)

    for _ in range(count):
        x = random.randint(12, w - 12)
        y = random.randint(8, h - 8)
        size = random.choice([1, 1, 1, 2, 2, 3])
        brightness = random.randint(140, 255)
        color = (255, 230, 150, random.randint(120, 200))
        d.ellipse((x - size, y - size, x + size, y + size), fill=color)
        if random.random() < 0.15:
            # occasional streak
            length = random.randint(6, 18)
            angle = random.random() * 2 * math.pi
            x2 = x + int(length * math.cos(angle))
            y2 = y + int(length * math.sin(angle))
            d.line((x, y, x2, y2), fill=(brightness, brightness, brightness, 160), width=1)

    particles = particles.filter(ImageFilter.GaussianBlur(radius=1.2))
    canvas.alpha_composite(particles)


def _compose(bear_path: str, bm_path: str, output_path: str) -> None:
    # Background: Emerald → Deep Teal gradient for Raya/festival; warmed by rays and vignette
    bg = _draw_linear_gradient((WIDTH, HEIGHT), ((22, 54, 44), (7, 26, 36)))
    canvas = bg.convert("RGBA")

    _add_rays(canvas, color=(255, 220, 110), alpha=70, rays=14)
    _add_vignette(canvas, strength=0.55)

    # Layout boxes
    content_top = MARGIN_Y
    text_top = content_top
    content_top += TEXT_AREA_H  # allocate space for centered text at the top
    content_bottom = HEIGHT - MARGIN_Y

    # Product area (logos treated as products)
    area_h = content_bottom - content_top
    left_box = (MARGIN_X, content_top, WIDTH // 2 - 8, content_bottom)
    right_box = (WIDTH // 2 + 8, content_top, WIDTH - MARGIN_X, content_bottom)

    # Fit images into their half boxes
    max_left_w = left_box[2] - left_box[0]
    max_left_h = left_box[3] - left_box[1]
    max_right_w = right_box[2] - right_box[0]
    max_right_h = right_box[3] - right_box[1]

    bear_img = _load_fit(bear_path, (max_left_w, max_left_h))
    bm_img = _load_fit(bm_path, (max_right_w, max_right_h))

    # Compute positions to center inside their boxes
    bear_x = left_box[0] + (max_left_w - bear_img.size[0]) // 2
    bear_y = left_box[1] + (max_left_h - bear_img.size[1]) // 2
    bm_x = right_box[0] + (max_right_w - bm_img.size[0]) // 2
    bm_y = right_box[1] + (max_right_h - bm_img.size[1]) // 2

    # Glow colors inspired by brand palettes
    _add_soft_glow(canvas, (bear_x, bear_y, bear_x + bear_img.size[0], bear_y + bear_img.size[1]), (255, 205, 60), spread=34, blur=26, alpha=120)
    _add_soft_glow(canvas, (bm_x, bm_y, bm_x + bm_img.size[0], bm_y + bm_img.size[1]), (70, 220, 170), spread=34, blur=26, alpha=120)

    # Paste images
    canvas.alpha_composite(bear_img, (bear_x, bear_y))
    canvas.alpha_composite(bm_img, (bm_x, bm_y))

    # Sparks around products
    _add_sparks(canvas, count=150)

    # Centered Title Text
    title = "Bearboom x BMFireworks"
    font = _find_bold_font(preferred_size=30)
    draw = ImageDraw.Draw(canvas)
    tw, th = draw.textbbox((0, 0), title, font=font)[2:]  # width, height
    tx = (WIDTH - tw) // 2
    ty = text_top + (TEXT_AREA_H - th) // 2

    # Text glow
    text_glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    tg = ImageDraw.Draw(text_glow)
    tg.text((tx, ty), title, font=font, fill=(255, 240, 200, 255))
    text_glow = text_glow.filter(ImageFilter.GaussianBlur(radius=3))
    canvas.alpha_composite(text_glow)

    # Solid text
    draw.text((tx, ty), title, font=font, fill=(255, 255, 255, 255))

    # Subtle glossy finish
    _draw_gloss(canvas, opacity=60)

    # Final pass: slight clarity boost via unsharp mask
    final_img = canvas.filter(ImageFilter.UnsharpMask(radius=1.2, percent=130, threshold=3))

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    final_img.save(output_path, format="PNG")
    print(f"Saved banner: {output_path}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate Bearboom x BMFireworks collaboration banner (800x200)")
    parser.add_argument("--bear", required=True, help="Path to Bearboom logo/product PNG (prefer transparent background)")
    parser.add_argument("--bm", required=True, help="Path to BMFireworks logo/product PNG (prefer transparent background)")
    parser.add_argument("--out", default=os.path.join("assets", "banner-collab.png"), help="Output PNG path")
    args = parser.parse_args()

    for p in (args.bear, args.bm):
        if not os.path.isfile(p):
            raise FileNotFoundError(f"Input not found: {p}")

    _compose(args.bear, args.bm, args.out)


if __name__ == "__main__":
    main()


