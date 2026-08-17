from pathlib import Path
from PIL import Image, ImageOps

project = Path('/home/ubuntu/ai-image-studio')
out = project / 'amazon-assets'
out.mkdir(exist_ok=True)

icon_path = project / 'assets/images/icon.png'
screenshot_candidates = sorted(Path('/home/ubuntu/screenshots').glob('webdev-preview-root-*.png'), key=lambda p: p.stat().st_mtime, reverse=True)
if not screenshot_candidates:
    raise SystemExit('No web preview screenshot found')
screenshot_path = screenshot_candidates[0]

icon = Image.open(icon_path).convert('RGBA')
for size, name in [(512, 'ai-image-studio-icon-512x512.png'), (114, 'ai-image-studio-icon-114x114.png')]:
    icon.resize((size, size), Image.Resampling.LANCZOS).save(out / name, 'PNG', optimize=True)

source = Image.open(screenshot_path).convert('RGB')

def fit_canvas(image: Image.Image, size: tuple[int, int], name: str) -> None:
    canvas = Image.new('RGB', size, 'white')
    fitted = ImageOps.contain(image, size, method=Image.Resampling.LANCZOS)
    x = (size[0] - fitted.width) // 2
    y = (size[1] - fitted.height) // 2
    canvas.paste(fitted, (x, y))
    canvas.save(out / name, 'PNG', optimize=True)

for width, height in [(800, 480), (1024, 600), (1280, 720), (1280, 800), (1920, 1200), (2560, 1600)]:
    fit_canvas(source, (width, height), f'ai-image-studio-screenshot-{width}x{height}.png')

fit_canvas(source, (1024, 500), 'ai-image-studio-promotional-1024x500.png')

print(f'Source screenshot: {screenshot_path}')
for path in sorted(out.iterdir()):
    with Image.open(path) as image:
        print(f'{path.name}\t{image.size}\t{path.stat().st_size} bytes')
