import base64
import io
import json
import re
import os
from PIL import Image
import asyncpg
from dotenv import load_dotenv
from fastapi import FastAPI, Response, Query as FQuery, WebSocket, WebSocketDisconnect
from fastapi.responses import JSONResponse
from ultralytics import YOLO
import uvicorn

model = YOLO("best.pt")

load_dotenv()


# @app.on_event("startup")は旧式
async def lifespan(app: FastAPI):
    print("Starting up...")

    # app.db = await asyncpg.create_pool(
    #     user=os.getenv("POSTGRES_USER"),
    #     password=os.getenv("POSTGRES_PASSWORD"),
    #     database=os.getenv("POSTGRES_DB"),
    #     host=os.getenv("POSTGRES_HOST", "db")
    # )
    # DbService.set_db_pool(app.db)

    yield
    print("Shutting down...")

    # db close
    # await app.db.close()

app = FastAPI(lifespan=lifespan)

@app.get("/")
async def read_root():
    return {"message": "FastAPI is running"}

@app.websocket("/predict")
async def websocket_predict(ws: WebSocket):
    await ws.accept()
    print('Client connected')
    try:
        while True:
            data = await ws.receive_bytes()
            print("WS received:", len(data))
            img = Image.open(io.BytesIO(data)).convert("RGB")
            results = model(img)

            detection = []
            for r in results:
                for b in r.boxes:
                    detection.append({
                        "class": model.names[int(b.cls[0])],
                        "confidence": float(b.conf[0]),
                        "bbox": b.xyxy[0].tolist(),
                    })
        
            await ws.send_text(json.dumps({
                "count": len(detection),
                "detection": detection,
            }))

            plotted = results[0].plot()
            buf = io.BytesIO()
            Image.fromarray(plotted[..., ::-1]).save(buf, format="JPEG")
            await ws.send_bytes(buf.getvalue())
            
    except WebSocketDisconnect:
        print("Client disconnected")
        


        

if __name__ == "__main__":
    uvicorn.run("index:app", host="0.0.0.0", port=8502)