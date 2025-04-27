
let poemsGenerated = [];
const sujets_base = ["Le vent", "La nuit", "Un oiseau", "Le silence", "Un rêve", "La galaxie", "L'ombre", "L'aurore boréale", "La rivière", "Le papillon", "La brume", "La montagne", "Le matin", "La lumière", "L'azur", "L'éclair", "La poussière", "Le rocher", "Le mirage", "Le nuage"];
const verbes_base = ["danse", "respire", "s'envole", "murmure", "étincelle", "tourbillonne", "s'efface", "s'endort", "scintille", "chuchote", "caresse", "pleure", "explose", "resplendit", "frémit", "flotte", "s'effrite", "éclate", "miroite", "ruisselle"];
const complements_base = ["sous la lune", "dans les vallées", "parmi les étoiles", "sur la mer", "dans l'univers", "au matin doux", "dans la clairière", "sous la pluie d'or", "à travers les ombres", "au sommet du monde", "dans le brouillard", "entre les cieux", "dans l'oubli", "sous les constellations", "au bord du rêve", "dans l'invisible", "dans le murmure du vent", "sous l'arc-en-ciel", "dans la nuit éternelle", "parmi les astres"];

const rimes = [["lune", "fortune"], ["mer", "clair"], ["brume", "coutume"], ["étoiles", "voiles"]];

const themes = {
  "Nature": { sujets: ["La forêt", "Le ruisseau", "La montagne", "La rivière", "L'étang", "La prairie"], verbes: ["chante", "murmure", "s'étend", "respire", "glisse", "s'épanouit"], complements: ["dans la clairière", "sous la pluie", "au sommet", "dans les vallées", "dans le vent", "sous l'orage"] },
  "Rêves": { sujets: ["Un songe", "Un rêve", "L'imagination", "La chimère", "La vision"], verbes: ["vole", "chuchote", "s'épanouit", "fleurit", "grandit"], complements: ["au creux de la nuit", "dans les étoiles", "au matin blanc", "au bord du sommeil"] },
  "Nuit": { sujets: ["La nuit", "Le silence", "L'ombre", "La brume", "Le crépuscule"], verbes: ["chante", "murmure", "s'envole", "pleure", "respire"], complements: ["sous la lune", "dans l'obscurité", "au fond du cœur", "dans le vent froid"] },
  "Amour": { sujets: ["Ton regard", "Le baiser", "Mon cœur", "L'étreinte", "La caresse"], verbes: ["danse", "s'embrase", "s'efface", "palpite", "flambe"], complements: ["dans l'éternité", "sous la pluie d'or", "dans un souffle", "au seuil du destin"] }
};

function getRandomElement(array, usedElements = []) {
  let availableElements = array.filter(el => !usedElements.includes(el));
  if (availableElements.length === 0) {
    usedElements.length = 0;
    availableElements = array;
  }
  const element = availableElements[Math.floor(Math.random() * availableElements.length)];
  usedElements.push(element);
  return element;
}

function typeWriterEffect(text, elementId, delay = 30) {
  let i = 0;
  const element = document.getElementById(elementId);
  element.innerHTML = "";

  function typing() {
    if (i < text.length) {
      if (text.substring(i, i+4) === "<br>") {
        element.innerHTML += "<br>";
        i += 4;
      } else {
        element.innerHTML += text.charAt(i);
      playTypewriterSound();
        i++;
      }
      setTimeout(typing, delay);
    }
  }

  typing();
}

function getWordLists() {
  const selectedTheme = document.getElementById('themeSelector').value;
  if (selectedTheme === "random") {
    return { sujets: sujets_base, verbes: verbes_base, complements: complements_base };
  } else {
    return themes[selectedTheme];
  }
}

function generateSinglePoem() {
  let { sujets, verbes, complements } = getWordLists();
  let usedSujets = [], usedVerbes = [], usedComplements = [];
  let poeme = "";
  for (let i = 0; i < 4; i++) {
    const sujet = getRandomElement(sujets, usedSujets);
    const verbe = getRandomElement(verbes, usedVerbes);
    const complement = getRandomElement(complements, usedComplements);
    poeme += `${sujet} ${verbe} ${complement}.<br>`;
  }
  typeWriterEffect(poeme, 'result');
}

function generatePoemHTML() {
  let { sujets, verbes, complements } = getWordLists();
  let usedSujets = [], usedVerbes = [], usedComplements = [];
  let poeme = "";
  for (let i = 0; i < 4; i++) {
    const sujet = getRandomElement(sujets, usedSujets);
    const verbe = getRandomElement(verbes, usedVerbes);
    const complement = getRandomElement(complements, usedComplements);
    poeme += `${sujet} ${verbe} ${complement}.<br>`;
  }
  poemsGenerated.push(poeme);
  return poeme;
}

function generateMultiplePoems() {
  let count = document.getElementById('poemCount').value || 5;
  poemsGenerated = [];
  const poems = [];
  for (let i = 0; i < count; i++) {
    poems.push(generatePoemHTML());
  }
  typeMultiplePoems(poems);
}

function typeMultiplePoems(poems) {
  const element = document.getElementById('multipleResults');
  element.innerHTML = "";

  let currentPoemIndex = 0;

  function typeNextPoem() {
    if (currentPoemIndex >= poems.length) return;

    const poemDiv = document.createElement('div');
    poemDiv.style.padding = "10px";
    poemDiv.style.marginBottom = "15px";
    poemDiv.style.background = "#fff8f0";
    poemDiv.style.borderRadius = "10px";
    poemDiv.style.border = "1px solid #ccc";

    element.appendChild(poemDiv);

    let text = poems[currentPoemIndex];
    let i = 0;

    function typingPoem() {
      if (i < text.length) {
        if (text.substring(i, i+4) === "<br>") {
          poemDiv.innerHTML += "<br>";
          i += 4;
        } else {
          poemDiv.innerHTML += text.charAt(i);
          i++;
        }
        setTimeout(typingPoem, 20);
      } else {
        currentPoemIndex++;
        setTimeout(typeNextPoem, 500);
      }
    }

    typingPoem();
  }

  typeNextPoem();
}

function generateHaiku() {
  const lignes = [
    "Sous la lune d'or", 
    "La brise danse doucement", 
    "Le rêve s'endort"
  ];
  const haiku = lignes.join("<br>");
  typeWriterEffect(haiku, 'result');
}

function generatePoemWithRimes() {
  let rime = getRandomElement(rimes);
  const poeme = `Sous la ${rime[0]},<br>Brille une ${rime[1]},<br>Mon cœur s'y abîme.`;
  typeWriterEffect(poeme, 'result');
}

function exportPoems() {
  if (poemsGenerated.length === 0) {
    alert("Génère d'abord des poèmes !");
    return;
  }
  const element = document.createElement('a');
  const file = new Blob([poemsGenerated.join('\n\n')], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = 'mes_poemes.txt';
  document.body.appendChild(element);
  element.click();
}


// Ajout automatique par GPT pour fonctions musique et partage

function toggleMusic() {
    const music = document.getElementById('backgroundMusic');
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

function sharePoem() {
    const poemText = document.getElementById('result').innerText || "Découvrez ce générateur de poésie magique !";
    const url = encodeURIComponent(window.location.href);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(poemText)}&url=${url}`;
    window.open(tweetUrl, '_blank');
}

function playTypewriterSound() {
    const sound = document.getElementById('typewriterSound');
    if (sound) {
        sound.currentTime = 0;
        sound.play();
    }
}
