"""Retain two distinct first-year design works and generate gallery previews."""

from pathlib import Path
import hashlib
import json
import shutil

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[2]
CATALOG = json.loads((ROOT / "content-catalog.json").read_text(encoding="utf-8"))
MANIFEST_PATH = ROOT / "assets/previews/manifest.json"
manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
NEW_FILES = {
    "assets/graphics/hamilton-vogue-monochrome-cover-study.jpg",
    "assets/graphics/lando-norris-concept-poster-study.jpg",
}


def derivative(source, destination, max_side, quality):
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        image.thumbnail((max_side, max_side), Image.Resampling.LANCZOS)
        image.save(destination, "WEBP", quality=quality, method=6)
        width, height = image.size
    with Image.open(destination) as check:
        check.verify()
    return {"preview": destination.relative_to(ROOT).as_posix(), "width": width, "height": height, "bytes": destination.stat().st_size}


for project in CATALOG["graphics"]:
    for file in project["files"]:
        if file["retained"] not in NEW_FILES:
            continue
        source = Path(file["source"])
        original = ROOT / file["retained"]
        shutil.copy2(source, original)
        assert hashlib.sha256(source.read_bytes()).digest() == hashlib.sha256(original.read_bytes()).digest()
        full = derivative(original, ROOT / "assets/previews/graphics" / f"{original.stem}.webp", 1600, 84)
        thumb = derivative(original, ROOT / "assets/previews/graphics" / f"{original.stem}-thumb.webp", 900, 82)
        item = {
            "source": file["retained"], "label": file["label"], **full,
            "thumbnail": thumb["preview"], "thumbnail_width": thumb["width"],
            "thumbnail_height": thumb["height"], "thumbnail_bytes": thumb["bytes"],
        }
        group = next((group for group in manifest["graphics"] if group["id"] == project["id"]), None)
        if group is None:
            group = {"id": project["id"], "cover": thumb["preview"], "files": []}
            manifest["graphics"].append(group)
        group["files"] = [existing for existing in group["files"] if existing["source"] != file["retained"]] + [item]
        if file["retained"] == project["cover"]:
            group["cover"] = thumb["preview"]

manifest["total_bytes"] = (
    sum(file["bytes"] + file["thumbnail_bytes"] for project in manifest["graphics"] for file in project["files"])
    + sum(site["bytes"] for site in manifest["websites"])
    + manifest["profile"]["bytes"]
)
MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"graphics": len(CATALOG["graphics"]), "artworks": sum(len(project["files"]) for project in CATALOG["graphics"]), "preview_bytes": manifest["total_bytes"]}))
