import fitz
import os

for p in os.listdir("./"):
    if "." in p:
        continue
    for f in os.listdir(p):
        f_path = os.path.join(p, f)
        try:
            doc = fitz.open(f_path)
            page = next(iter(doc))
            img_name = f"{os.path.splitext(f)[0]}.png"
            img_path = os.path.join(p, img_name)
            page.get_pixmap().save(img_path)
        except Exception as e:
            print(e)
