let nombreSecret = Math.floor(Math.random() * 100) + 1;
let essais = 0;
const maxEssais = 10;

const sonWin = document.getElementById("sonWin");
const sonLose = document.getElementById("sonLose");

document.getElementById("testSonLose").addEventListener("click", () => {
  sonLose.pause();
  sonLose.currentTime = 0;
  sonLose.play().catch(e => console.log("Erreur sonLose :", e));
});

function verifier() {
  const input = document.getElementById("nombre");
  const resultat = document.getElementById("resultat");
  const info = document.getElementById("info");
  const rejouerBtn = document.getElementById("rejouer");

  const choix = parseInt(input.value);
  if (isNaN(choix)) {
    resultat.textContent = "⛔ Entre un nombre valide !";
    return;
  }

  essais++;

  if (essais >= maxEssais && choix !== nombreSecret) {
  resultat.textContent = `😒 Dommage ! Le nombre était ${nombreSecret}`;
  input.disabled = true;
  rejouerBtn.style.display = "inline";

  setTimeout(() => {
    sonLose.pause();
    sonLose.currentTime = 0;
    sonLose.play().catch(e => console.log("Erreur sonLose :", e));
  }, 100);  // 100ms de délai

  } else if (choix < nombreSecret) {
    resultat.textContent = `Essai ${essais}/${maxEssais} ➤ Trop petit !`;
  } else if (choix > nombreSecret) {
    resultat.textContent = `Essai ${essais}/${maxEssais} ➤ Trop grand !`;
  } else {
    resultat.textContent = `🎉 Bravo ! Tu as trouvé ${nombreSecret} en ${essais} essais !`;
    input.disabled = true;
    rejouerBtn.style.display = "inline";

    sonWin.pause();
    sonWin.currentTime = 0;
    sonWin.play().catch(e => console.log("Erreur sonWin :", e));
  }

  input.value = "";
  info.textContent = `Essai ${essais}/${maxEssais}`;
}

function rejouer() {
  nombreSecret = Math.floor(Math.random() * 100) + 1;
  essais = 0;
  document.getElementById("resultat").textContent = "";
  document.getElementById("info").textContent = "Tu as 10 essais";
  document.getElementById("nombre").disabled = false;
  document.getElementById("nombre").value = "";
  document.getElementById("rejouer").style.display = "none";
}


/*document.body.addEventListener("click", unlockSound, { once: true });

function unlockSound() {
  const silent = document.getElementById("unlockAudio");
  silent.play().catch((e) => console.log("🔇 Unlock failed:", e));
}*/
