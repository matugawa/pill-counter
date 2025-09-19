import re
import os
import asyncpg
from dotenv import load_dotenv
from fastapi import FastAPI, Response, Query as FQuery
from fastapi.responses import JSONResponse

import uvicorn

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



if __name__ == "__main__":
    uvicorn.run("index:app", host="0.0.0.0", port=8502)