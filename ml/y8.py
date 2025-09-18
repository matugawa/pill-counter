from ultralytics import YOLO

# 学習済みモデルをロード
model = YOLO("runs/detect/yolo8_pill/weights/best.pt")

# 推論
results = model("images/png/test/IMG_9867.png")

# 検出結果を表示
results[0].show()

# 検出数を確認
print("検出pill数:", len(results[0].boxes))
