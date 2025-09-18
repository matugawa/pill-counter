from PIL import Image

# 読み込む画像ファイル
files = [
    "images/edit/y11o_1.png",
    "images/edit/y11o_2.png",
    "images/edit/y11o_3.png",
]

# 画像を開く
imgs = [Image.open(f) for f in files]

# 高さは揃え、横幅を合計
widths = [img.width for img in imgs]
heights = [img.height for img in imgs]

total_width = sum(widths)
max_height = max(heights)

# 出力キャンバスを作成
new_img = Image.new("RGB", (total_width, max_height))

# 横に並べて貼り付け
x_offset = 0
for img in imgs:
    new_img.paste(img, (x_offset, 0))
    x_offset += img.width

# 保存
new_img.save("images/edit/y11o_merged.png")
print("✅ 保存完了: images/edit/y11o_merged.png")