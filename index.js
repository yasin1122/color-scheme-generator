function renderColors(color = "0047AB", scheme = "monochrome") {
  // Remove the '#' if present
  if (color.startsWith("#")) {
    color = color.slice(1);
  }

  fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${scheme}&count=5`)
    .then(res => res.json())
    .then(data => {
      if (!data.colors) {
        console.error("Colors property is undefined", data);
        return;
      }
      
      // Create HTML for each color using a data attribute to store the hex code
      const htmlStr = data.colors
        .map(colorObj => {
          const hex = colorObj.hex.value;
          return `
            <div class="color-container" data-code="${hex}">
              <div class="color-display" style="background-color: ${hex}"></div>
              <p class="color-code">${hex}</p>
            </div>
          `;
        })
        .join("");

      // Insert the generated HTML into <main>
      document.querySelector("main").innerHTML = htmlStr;

      // Attach a click event listener to each .color-container
      document.querySelectorAll('.color-container').forEach(container => {
        container.addEventListener("click", function() {
          // Get the hex code stored in the data attribute
          const code = container.getAttribute("data-code");

          // Copy the hex code to the clipboard
          navigator.clipboard.writeText(code)
            .then(() => {
              console.log(`Copied ${code} to clipboard`);
              // Optionally, provide visual feedback to the user here.
            })
            .catch(err => console.error("Failed to copy the color code:", err));
        });
      });
    })
    .catch(error => console.error("Error fetching color scheme:", error));
}

// Initial render of the default scheme
renderColors();

// Listen for the form submit to update the scheme
document.getElementById("color-scheme-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const color = document.getElementById("color-picker").value;
  const scheme = document.getElementById("scheme-selector").value;
  renderColors(color, scheme);
});
