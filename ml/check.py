from pathlib import Path

for txt in Path("dataset/labels/train").glob("*.txt"):
    with open(txt) as f:
        for line in f:
            parts = line.strip().split()
            if not parts:  # 空行
                continue
            cid = int(parts[0])
            if cid != 0:
                print(f"⚠️ {txt} に不正なクラスID {cid}")