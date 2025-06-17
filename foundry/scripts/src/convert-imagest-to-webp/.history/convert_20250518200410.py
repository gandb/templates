from PIL import Image
import os
import sys

diretorio = ''

if len(sys.argv) > 1:
    diretorio = sys.argv[1]
    print(f"Caminho recebido: {diretorio}")
else:
    sys.exit("Erro: Nenhum parâmetro foi recebido.")

if not os.path.isdir(diretorio):
    sys.exit("O diretório não é válido ou não existe.")


for root, dirs, files in os.walk(diretorio):
    for filename in files:
        if not (filename.endswith(".png") or filename.endswith(".jpg") or filename.endswith(".jpeg")):
            continue
        
        caminho_completo =os.path.join(root, os.path.splitext(filename)[0] + ".webp")
        
        if os.path.exists(caminho_completo):
            print("Ignorated file already converted :",caminho_completo)
            continue

        print("converting :",filename)
        try:
            image = Image.open(os.path.join(root, filename))
            image = image.convert('RGBA')  
            image.save(os.path.join(root, os.path.splitext(filename)[0] + ".webp"), 'webp')
        except Exception:
            print("Divisão por zero não é permitida.")
