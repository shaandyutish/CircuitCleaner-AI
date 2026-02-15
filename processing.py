import cv2
import numpy as np
from PIL import Image


def upscale_image(img, scale=2):
    height, width = img.shape[:2]
    return cv2.resize(img, (width * scale, height * scale), interpolation=cv2.INTER_CUBIC)


def unsharp_mask(image):
    gaussian = cv2.GaussianBlur(image, (9, 9), 10.0)
    return cv2.addWeighted(image, 1.5, gaussian, -0.5, 0)


def enhance_image(image: Image.Image, mode: str):
    img = np.array(image)

    # Basic upscale for all modes
    img = upscale_image(img, scale=2)

    if mode == "clean":
        img = cv2.bilateralFilter(img, 9, 75, 75)
        img = unsharp_mask(img)

    elif mode == "vector":
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 40, 120)
        img = cv2.threshold(edges, 127, 255, cv2.THRESH_BINARY)[1]

    elif mode == "noise":
        img = cv2.fastNlMeansDenoisingColored(img, None, 10, 10, 7, 21)

    elif mode == "pro":
        lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
        l, a, b = cv2.split(lab)
        l = cv2.equalizeHist(l)
        img = cv2.merge((l, a, b))
        img = cv2.cvtColor(img, cv2.COLOR_LAB2BGR)
        img = unsharp_mask(img)

    elif mode == "negative":
        img = cv2.bitwise_not(img)

    return Image.fromarray(img)
