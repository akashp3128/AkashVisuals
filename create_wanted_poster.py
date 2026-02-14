#!/usr/bin/env python3
"""
Create wanted poster using the official One Piece template.
"""

from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter
import os

# Paths
TEMPLATE_PATH = "/Users/akash/Downloads/one-piece-wanted-poster-template-a3-150dpi.png"
HEADSHOT_PATH = "/Users/akash/Developer/Personal_site/public/headshot.png"
OUTPUT_PATH = "/Users/akash/Developer/Personal_site/public/wanted-poster.png"

def create_wanted_poster():
    # Load template
    template = Image.open(TEMPLATE_PATH).convert('RGBA')
    template_w, template_h = template.size
    print(f"Template size: {template_w}x{template_h}")

    # Exact black box dimensions from template analysis
    photo_left = 163
    photo_right = 1590
    photo_top = 532
    photo_bottom = 1564

    photo_width = photo_right - photo_left + 1   # 1428
    photo_height = photo_bottom - photo_top + 1  # 1033
    print(f"Photo area: {photo_width}x{photo_height}")

    # Load and process headshot
    headshot = Image.open(HEADSHOT_PATH).convert('RGBA')
    orig_w, orig_h = headshot.size
    print(f"Headshot size: {orig_w}x{orig_h}")

    # Crop to match exact photo area aspect ratio (1428:1033 = 1.382:1)
    target_ratio = photo_width / photo_height  # 1.382

    # Calculate crop to match this ratio
    crop_width = orig_w
    crop_height = int(crop_width / target_ratio)

    # Position crop to show full face with good framing
    crop_top = int(orig_h * 0.16)  # Bring up a bit more
    crop_bottom = crop_top + crop_height

    if crop_bottom > orig_h:
        crop_bottom = orig_h
        crop_top = crop_bottom - crop_height

    headshot = headshot.crop((0, crop_top, crop_width, crop_bottom))

    # Convert to grayscale
    headshot = headshot.convert('L')

    # Increase contrast for manga look
    enhancer = ImageEnhance.Contrast(headshot)
    headshot = enhancer.enhance(1.2)

    # Resize to exact photo area dimensions (already cropped to correct ratio)
    headshot = headshot.resize((photo_width, photo_height), Image.Resampling.LANCZOS)

    # Position exactly at photo area
    paste_x = photo_left
    paste_y = photo_top

    # Convert headshot back to RGBA for pasting
    headshot = headshot.convert('RGBA')

    # Paste headshot onto template
    template.paste(headshot, (paste_x, paste_y))

    # Add text - Name and Bounty
    draw = ImageDraw.Draw(template)

    # Try to load appropriate fonts
    def get_font(size):
        font_paths = [
            "/System/Library/Fonts/Supplemental/Impact.ttf",
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
            "/Library/Fonts/Arial Bold.ttf",
            "/System/Library/Fonts/Helvetica.ttc",
        ]
        for path in font_paths:
            try:
                return ImageFont.truetype(path, size)
            except:
                continue
        return ImageFont.load_default()

    # Colors - match the aged paper brown color of the template text
    text_color = (62, 47, 33, 255)  # Dark brown matching template

    # Name - positioned between DEAD OR ALIVE and the bottom
    name_font = get_font(int(template_h * 0.055))
    name_text = "AKASH"
    name_y = int(template_h * 0.72)

    # Draw each character with spacing
    name_spacing = int(template_w * 0.025)
    # Calculate total width to center it
    total_name_width = 0
    for char in name_text:
        bbox = draw.textbbox((0, 0), char, font=name_font)
        total_name_width += bbox[2] - bbox[0] + name_spacing
    total_name_width -= name_spacing  # Remove last spacing

    name_x = (template_w - total_name_width) // 2
    current_x = name_x
    for char in name_text:
        draw.text((current_x, name_y), char, font=name_font, fill=text_color)
        bbox = draw.textbbox((0, 0), char, font=name_font)
        char_width = bbox[2] - bbox[0]
        current_x += char_width + name_spacing

    # Bounty - positioned next to the B (Berry symbol) on template
    bounty_font = get_font(int(template_h * 0.042))  # Slightly larger
    bounty_text = "7,410,000,000"
    bounty_x = int(template_w * 0.20)  # Slightly to the right
    bounty_y = int(template_h * 0.845)  # Up a tad to align with B symbol

    # Draw each character with extra spacing
    char_spacing = int(template_w * 0.022)
    current_x = bounty_x
    for char in bounty_text:
        draw.text((current_x, bounty_y), char, font=bounty_font, fill=text_color)
        bbox = draw.textbbox((0, 0), char, font=bounty_font)
        char_width = bbox[2] - bbox[0]
        current_x += char_width + (char_spacing if char != ',' else int(char_spacing * 0.3))

    # Convert to grayscale for consistency with site design
    template = template.convert('L')

    # Save
    template.save(OUTPUT_PATH, 'PNG')
    print(f"Saved to {OUTPUT_PATH}")

    # Get final dimensions
    final = Image.open(OUTPUT_PATH)
    print(f"Final dimensions: {final.size}")

if __name__ == "__main__":
    create_wanted_poster()
