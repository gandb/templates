import ChatOpenAI from "openai";

const openai_api_key = process.env.OPENAI_API_KEY;
const openai = new ChatOpenAI( openai_api_key )

const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
          {
            role: "user",
            content: "Traduza para o português considerando que o conteúdo a seguir é para RPG dnd5ed: The Candlekeep Mysteries table summarizes the adventures in this anthology. Each adventure is designed for four to six characters of a particular level, but you can adjust it for larger or smaller groups as well as for characters of higher or lower level by swapping one monster or trap for another, changing the number of foes in an encounter, and adjusting DCs to make important tasks easier or harder for the characters to accomplish.",
        },
    ],
});

console.log(completion.choices[0].message);