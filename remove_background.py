#!/usr/bin/env python3
"""
Script to remove backgrounds from all member images using rembg.
Processes all images in public/images/members/ and saves them with transparent backgrounds.
"""

import os
import io
from pathlib import Path
from rembg import remove
from PIL import Image

def remove_background_from_images(input_folder, output_folder=None):
    """
    Remove background from all images in the input folder.

    Args:
        input_folder: Path to folder containing images
        output_folder: Path to save processed images (default: overwrites originals)
    """
    input_path = Path(input_folder)

    if not input_path.exists():
        print(f"Error: Input folder '{input_folder}' does not exist")
        return

    # If no output folder specified, use the same folder
    if output_folder is None:
        output_path = input_path
        print(f"Processing images in: {input_folder}")
        print("WARNING: Original images will be overwritten")
    else:
        output_path = Path(output_folder)
        output_path.mkdir(parents=True, exist_ok=True)
        print(f"Processing images from: {input_folder}")
        print(f"Saving to: {output_folder}")

    # Supported image extensions
    image_extensions = {'.jpg', '.jpeg', '.png', '.webp', '.bmp'}

    # Find all images recursively
    image_files = []
    for ext in image_extensions:
        image_files.extend(input_path.rglob(f'*{ext}'))
        image_files.extend(input_path.rglob(f'*{ext.upper()}'))

    if not image_files:
        print(f"No images found in {input_folder}")
        return

    print(f"\nFound {len(image_files)} images to process\n")

    processed = 0
    failed = 0

    for image_file in image_files:
        try:
            print(f"Processing: {image_file.name}...", end=' ')

            # Read input image
            with open(image_file, 'rb') as f:
                input_data = f.read()

            # Remove background
            output_data = remove(input_data)

            # Open as PIL Image from bytes
            img = Image.open(io.BytesIO(output_data))

            # Determine output path
            if output_folder is None:
                output_file = image_file
            else:
                # Maintain folder structure
                relative_path = image_file.relative_to(input_path)
                output_file = output_path / relative_path
                output_file.parent.mkdir(parents=True, exist_ok=True)

            # Save as PNG to preserve transparency
            output_file_png = output_file.with_suffix('.png')
            img.save(output_file_png, 'PNG')

            # If original wasn't PNG and we're overwriting, remove old file
            if output_folder is None and output_file.suffix.lower() != '.png':
                output_file.unlink()

            print(f"✓ Saved as {output_file_png.name}")
            processed += 1

        except Exception as e:
            print(f"✗ Failed: {str(e)}")
            failed += 1

    print(f"\n{'='*50}")
    print(f"Processing complete!")
    print(f"Successfully processed: {processed}")
    print(f"Failed: {failed}")
    print(f"{'='*50}")

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Remove backgrounds from member images')
    parser.add_argument(
        '--input',
        default='public/images/members',
        help='Input folder containing images (default: public/images/members)'
    )
    parser.add_argument(
        '--output',
        default=None,
        help='Output folder for processed images (default: overwrites originals)'
    )
    parser.add_argument(
        '--backup',
        action='store_true',
        help='Create backup of original images'
    )

    args = parser.parse_args()

    # Create backup if requested
    if args.backup and args.output is None:
        import shutil
        backup_folder = args.input + '_backup'
        print(f"Creating backup in: {backup_folder}")
        shutil.copytree(args.input, backup_folder, dirs_exist_ok=True)
        print(f"Backup created!\n")

    remove_background_from_images(args.input, args.output)
