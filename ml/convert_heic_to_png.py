import sys
from pathlib import Path
from PIL import Image
import pillow_heif

# HEIC 読み込み用のオプションを登録
pillow_heif.register_heif_opener()

# 引数チェック
if len(sys.argv) < 3:
    print("Usage: python convert_heic_to_png.py <input_subdir> <output_subdir>")
    sys.exit(1)

input_subdir = sys.argv[1]   # 入力ディレクトリ (例: heic, raw)
output_subdir = sys.argv[2]  # 出力サブディレクトリ (例: set1, nnnn)

# ディレクトリ設定
src_dir = Path("images") / input_subdir
dst_dir = Path("images/png") / output_subdir
dst_dir.mkdir(parents=True, exist_ok=True)

# HEIC / PNG / JPG などを対象に変換
for file in src_dir.glob("*.*"):
    if file.suffix.lower() in [".heic", ".HEIC", ".jpg", ".jpeg"]:
        img = Image.open(file)
        out_file = dst_dir / (file.stem + ".png")
        img.save(out_file, "PNG")
        print(f"Converted: {file.name} -> {out_file}")

print(f"✅ 変換完了: 出力先 {dst_dir}")