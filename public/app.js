// public/app.js
window.addEventListener("DOMContentLoaded", () => {
  const box = document.getElementById("searchBox");
  const btn = document.getElementById("searchBtn");
  const out = document.getElementById("searchResult");

  // Only run if the elements exist on the page
  if (btn && box && out) {
    btn.addEventListener("click", async () => {
      const query = box.value.trim();

      // If nothing entered, show a gentle reminder
      if (!query) {
        out.textContent = "Please enter a search term.";
        return;
      }

      try {
        // Call the Express echo API endpoint
        const response = await fetch(`/api/echo?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error("Network response was not ok");

        // Parse the JSON response
        const data = await response.json();

        // Display the server response or an error message
        if (data.ok) {
          out.textContent = ` Server echo: "${data.q}"`;
        } else {
          out.textContent = " Server returned an error response.";
        }
      } catch (error) {
        console.error("Error fetching from /api/echo:", error);
        out.textContent = " Unable to connect to the server.";
      }
    });
  } else {
    console.warn("Search elements not found in DOM.");
  }
});

