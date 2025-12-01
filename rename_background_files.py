#!/usr/bin/env python3
"""
Script to add '_background' suffix to all files in public/images/members_background folder.
Renames files like 'name.jpg' to 'name_background.jpg'
"""

import os
from pathlib import Path

def rename_files_with_suffix(folder_path, suffix="_background"):
    """
    Rename all files in the folder by adding a suffix before the file extension.

    Args:
        folder_path: Path to folder containing files to rename
        suffix: Suffix to add before the file extension (default: "_background")
    """
    folder = Path(folder_path)

    if not folder.exists():
        print(f"Error: Folder '{folder_path}' does not exist")
        return

    # Find all files recursively
    files = [f for f in folder.rglob('*') if f.is_file()]

    if not files:
        print(f"No files found in {folder_path}")
        return

    print(f"Found {len(files)} files to rename\n")

    renamed = 0
    skipped = 0

    for file_path in files:
        # Get the file name without extension and the extension
        stem = file_path.stem
        extension = file_path.suffix

        # Check if suffix is already in the filename
        if stem.endswith(suffix):
            print(f"Skipping (already has suffix): {file_path.name}")
            skipped += 1
            continue

        # Create new filename with suffix
        new_name = f"{stem}{suffix}{extension}"
        new_path = file_path.parent / new_name

        # Check if the new file already exists
        if new_path.exists():
            print(f"Skipping (target exists): {file_path.name} -> {new_name}")
            skipped += 1
            continue

        # Rename the file
        try:
            file_path.rename(new_path)
            print(f"✓ Renamed: {file_path.name} -> {new_name}")
            renamed += 1
        except Exception as e:
            print(f"✗ Failed to rename {file_path.name}: {str(e)}")

    print(f"\n{'='*50}")
    print(f"Renaming complete!")
    print(f"Successfully renamed: {renamed}")
    print(f"Skipped: {skipped}")
    print(f"{'='*50}")

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Add suffix to filenames')
    parser.add_argument(
        '--folder',
        default='public/images/members_background',
        help='Folder containing files to rename (default: public/images/members_background)'
    )
    parser.add_argument(
        '--suffix',
        default='_background',
        help='Suffix to add before file extension (default: _background)'
    )

    args = parser.parse_args()

    rename_files_with_suffix(args.folder, args.suffix)
