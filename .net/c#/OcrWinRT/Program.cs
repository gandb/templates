using System;
using System.IO;
using System.Threading.Tasks;
using Windows.Graphics.Imaging;
using Windows.Media.Ocr;
using Windows.Storage;
using Windows.Storage.Streams;
 
namespace OcrWinRT
{
    class Program
    {
        static void Main(string[] args)
        {
            Run(args).GetAwaiter().GetResult();
        }

        static async Task Run(string[] args)
        {
           /* if (args.Length == 0)
            {
                Console.WriteLine("Uso: OcrWinRT.exe <caminho-da-imagem>");
                return;
            }
*/
            string path = "C:\\Users\\gandnegro\\Downloads\\OcrWinRT\\teste.jpg";// args[0];

            if (!File.Exists(path))
            {
                Console.WriteLine($"Arquivo não encontrado: {path}");
                return;
            }

            try
            {
                 Console.WriteLine("dbg1");
                StorageFile file = await StorageFile.GetFileFromPathAsync(path);
                 Console.WriteLine("dbg2");

                using (IRandomAccessStream stream = await file.OpenAsync(FileAccessMode.Read))
                {
                                     Console.WriteLine("dbg3");

                    BitmapDecoder decoder = await BitmapDecoder.CreateAsync(stream);
                                     Console.WriteLine("dbg4");

                    SoftwareBitmap bitmap = await decoder.GetSoftwareBitmapAsync();
                 Console.WriteLine("dbg5");

                    var lang = new Windows.Globalization.Language("pt-BR");
                                     Console.WriteLine("dbg6");

                    OcrEngine engine = OcrEngine.TryCreateFromLanguage(lang);
                                     Console.WriteLine("dbg7");

                                     if(engine==null)
                                     {
                                         Console.WriteLine("Erro: OcrEngine não pôde ser criado.");
                                         return;
                                     }


                                     if(bitmap==null)
                                     {
                                         Console.WriteLine("Erro: bitmap não pôde ser criado.");
                                         return;
                                     }
                                     
                    OcrResult result = await engine.RecognizeAsync(bitmap);
   Console.WriteLine("dbg8");
                    SaveTextToFile(result.Text,"saida.txt");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erro: " + ex.Message);
            }
        }
        
         static void SaveTextToFile(string text, string filePath)
        {
            try
            {
                // Usando StreamWriter para escrever no arquivo
                using (StreamWriter writer = new StreamWriter(filePath))
                {
                    writer.WriteLine(text);  // Escreve o texto extraído no arquivo
                }
                Console.WriteLine($"Texto salvo com sucesso em: {filePath}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao salvar o arquivo: {ex.Message}");
            }
        }
    }

    
}
