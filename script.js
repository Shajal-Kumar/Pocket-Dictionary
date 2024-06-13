async function getMeaning(){
    let word = document.getElementById("wInp").value;
    const sound = document.getElementById("sound");
    const result = document.getElementById("result");
    try{
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok){
            throw new Error("Invalid Word!");
        }
        const data = await response.json();
        result.innerHTML = `
        <div class="wordDisp">
                <h3>${word}</h3>
                <button onclick="playSound()">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
               
                <p>${data[0].phonetic || data[0].phonetics[1].text}</p>
            </div>
            <p class="meaning">${data[0].meanings[0].definitions[0].definition}</p>
            <p class="example">${data[0].meanings[0].definitions[0].example || ""}</p>`
        try{
            sound.setAttribute("src", data[0].phonetics[0].audio || data[0].phonetics[1].audio || data[0].phonetics[2].audio || "");
        }
        catch(error){
            console.log("");
        }
    }
    catch (error){
        result.innerHTML = `<h3>Couldn't Find The Word 😞</h3>`;
        console.error(error);
    }
}

function playSound(){
    const sound = document.getElementById("sound");
    sound.play()
}
