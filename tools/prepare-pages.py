"""Package the tracked static website, with real media rather than LFS pointers."""
import argparse
from pathlib import Path
import shutil
import subprocess

ROOT = Path(__file__).resolve().parent.parent
ENTRY_FILES = {"index.html", "styles.css", "script.js", "cinematic.js", "projects-data.js"}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("destination", nargs="?", type=Path)
    parser.add_argument("--check", action="store_true", help="Verify without copying files")
    args = parser.parse_args()
    if not args.check and args.destination is None:
        parser.error("Provide a destination or use --check")

    tracked = subprocess.check_output(["git", "ls-files", "-z"], cwd=ROOT).decode("utf-8").split("\0")
    paths = [Path(name) for name in tracked if name and (
        name in ENTRY_FILES or name.startswith(("assets/", "projects/"))
    ) and not name.endswith((".py", ".pyc"))]
    total = 0
    for relative in paths:
        source = ROOT / relative
        if source.is_symlink() or not source.is_file():
            raise RuntimeError(f"Expected a regular website file: {relative}")
        with source.open("rb") as handle:
            if handle.read(128).startswith(b"version https://git-lfs.github.com/spec/v1"):
                raise RuntimeError(f"Original media is missing; run git lfs pull: {relative}")
        total += source.stat().st_size
    if total >= 1024 ** 3:
        raise RuntimeError("The published website exceeds the GitHub Pages 1 GiB limit")

    if not args.check:
        destination = args.destination.resolve()
        if destination == ROOT or ROOT in destination.parents:
            raise RuntimeError("Use a destination outside the source checkout")
        destination.mkdir(parents=True, exist_ok=False)
        for relative in paths:
            target = destination / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(ROOT / relative, target)
        (destination / ".nojekyll").touch()
    print(f"Verified {len(paths)} website files ({total / 1024 ** 2:.1f} MiB), including original media.")


if __name__ == "__main__":
    main()
