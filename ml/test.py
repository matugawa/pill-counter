import time
from pathlib import Path
from ultralytics import YOLO

# モデルをロード
yolo8 = YOLO("yolov8s.pt")
yolo11 = YOLO("yolo11s.pt")

# テスト画像ディレクトリ
png_dir = Path("images/png/test")

for img_path in png_dir.glob("*.png"):
    print(f"\n=== {img_path.name} ===")

    # YOLOv8s 推論
    # start = time.time()
    # results8 = yolo8(str(img_path))
    # end = time.time()
    # print("YOLOv8s - 検出数:", len(results8[0].boxes), "推論時間:", round(end - start, 3), "秒")

    # YOLO11s 推論
    start = time.time()
    results11 = yolo11(str(img_path))
    end = time.time()
    print("YOLO11s - 検出数:", len(results11[0].boxes), "推論時間:", round(end - start, 3), "秒")

    # 可視化
    # results8[0].show()
    results11[0].show()