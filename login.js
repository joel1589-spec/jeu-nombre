document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById("loginMessage").textContent = "Connexion réussie ! Redirection...";
      setTimeout(() => {
        window.location.href = "jeu.html";
      }, 2000);
    } else {
      document.getElementById("loginMessage").textContent = data.message;
    }
  } catch (error) {
    console.error("Erreur :", error);
    document.getElementById("loginMessage").textContent = "Erreur réseau. Réessaie plus tard.";
  }
});
