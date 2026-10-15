"""Create lightweight video thumbnails and retain verified YouTube metadata."""

from pathlib import Path
import json

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[2]
ITEMS = [
    {
        "id": "osaka-travel",
        "videoId": "YQMzI5l7iTs",
        "title": "Travel to osaka 🇯🇵",
        "description": "A short Osaka travel video shared by the creator on YouTube.",
        "subtitle": "Travel videography",
        "duration": "0:31",
        "thumbnail_stem": "osaka",
        "thumbnail_url": "https://i.ytimg.com/vi/YQMzI5l7iTs/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AH8CYAC0AWKAgwIABABGE8gWShlMA8=&rs=AOn4CLBBVMF_dHxx2VRv0kA3H7ev_zdavw",
    },
    {
        "id": "sri-lanka-seminar",
        "videoId": "qisv9WsInZU",
        "title": "スリランカ ― 遺産とおもてなしの国 🇱🇰 (Sri Lanka – The Land of Heritage and Hospitality)",
        "description": "A Sri Lanka seminar presentation video introducing the country's heritage and hospitality.",
        "subtitle": "Seminar presentation video",
        "duration": "3:36",
        "thumbnail_stem": "sri-lanka-seminar",
        "thumbnail_url": "https://i.ytimg.com/vi/qisv9WsInZU/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGHIgSCgzMA8=&rs=AOn4CLBn5uembFhQMzficefPRwhFnbKdgQ",
    },
]

entries = []
for item in ITEMS:
    source = ROOT / "assets/previews/video" / f"{item['thumbnail_stem']}.jpg"
    destination = source.with_suffix(".webp")
    entry = {key: value for key, value in item.items() if key not in ["thumbnail_stem", "thumbnail_url"]}
    entry.update({
        "source_url": f"https://www.youtube.com/watch?v={item['videoId']}",
        "embed_url": f"https://www.youtube.com/embed/{item['videoId']}",
        "user_authorship_asserted": True,
    })
    if source.exists():
        with Image.open(source) as original:
            image = ImageOps.exif_transpose(original).convert("RGB")
            image.thumbnail((1400, 1400), Image.Resampling.LANCZOS)
            image.save(destination, "WEBP", quality=84, method=6)
            width, height = image.size
        entry["thumbnail"] = {"path": destination.relative_to(ROOT).as_posix(), "width": width, "height": height, "bytes": destination.stat().st_size}
        entry["thumbnail_source"] = {"path": source.relative_to(ROOT).as_posix(), "url": item["thumbnail_url"], "bytes": source.stat().st_size}
    else:
        entry["thumbnail"] = {"path": item["thumbnail_url"]}
    entries.append(entry)

manifest = {"videography": entries}
manifest_path = ROOT / "assets/videography/manifest.json"
manifest_path.parent.mkdir(parents=True, exist_ok=True)
manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps(manifest, ensure_ascii=True))
