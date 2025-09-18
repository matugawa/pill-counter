import os
import random
import shutil
from pathlib import Path

"""
python split_dataset.py
train, valに自動振り分け
"""

# 元データ
src_img = Path("images/png/label")
src_lbl = Path("images/png/label")

# 出力先
dst_base = Path("dataset")
for sub in ["images/train", "images/val", "labels/train", "labels/val"]:
    (dst_base / sub).mkdir(parents=True, exist_ok=True)

# ファイル一覧（.pngのみ）
all_images = list(src_img.glob("*.png"))
random.shuffle(all_images)

# 8:2 で分割
split_idx = int(len(all_images) * 0.8)
train_imgs = all_images[:split_idx]
val_imgs = all_images[split_idx:]

def copy_pair(img_list, split):
    for img_path in img_list:
        label_path = src_lbl / (img_path.stem + ".txt")
        # 画像コピー
        shutil.copy(img_path, dst_base / f"images/{split}" / img_path.name)
        # ラベルコピー
        shutil.copy(label_path, dst_base / f"labels/{split}" / label_path.name)

copy_pair(train_imgs, "train")
copy_pair(val_imgs, "val")

print(f"✅ Done: train={len(train_imgs)}, val={len(val_imgs)}")