import ChatOpenAI from "openai";

const openai_api_key = process.env.OPENAI_API_KEY;
const openai = new ChatOpenAI( openai_api_key )
const command = "Traduza o seguinte texto do inglês para o português, mantendo o contexto, estilo e terminologia característicos de Dungeons & Dragons 5ª Edição. Certifique-se de adaptar nomes de locais, criaturas, magias, itens e termos técnicos para seus equivalentes oficiais ou mais amplamente reconhecidos no cenário de RPG. Preserve a imersão narrativa e qualquer nuance que seja essencial para o gênero de fantasia medieval. Texto para tradução:"
const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.7,
   max_tokens: 800,
    messages: [
          {
            role: "user",
            content: command + " The Candlekeep Mysteries table summarizes the adventures in this anthology. Each adventure is designed for four to six characters of a particular level, but you can adjust it for larger or smaller groups as well as for characters of higher or lower level by swapping one monster or trap for another, changing the number of foes in an encounter, and adjusting DCs to make important tasks easier or harder for the characters to accomplish.",
        },
    ],
});

console.log(completion.choices[0].message); 