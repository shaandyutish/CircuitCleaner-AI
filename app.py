from fastapi import FastAPI, UploadFile, Form
from fastapi.responses import Response
from PIL import Image
import io
from processing import enhance_image

app = FastAPI()

@app.post("/enhance")
async def enhance(file: UploadFile, mode: str = Form(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")

    result = enhance_image(image, mode)

    buffer = io.BytesIO()
    result.save(buffer, format="PNG")

    return Response(content=buffer.getvalue(), media_type="image/png")
