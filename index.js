function renderColors(color = "0047AB", choice = "monochrome") {
  // Remove the '#' if present
  if (color.startsWith("#")) {
    color = color.slice(1);
  }

  fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${choice}&count=5`)
    .then(res => res.json())
    .then(data => {
      if (!data.colors) {
        console.error("Colors property is undefined", data);
        return;
      }
      const hexCodes = data.colors.map(color => color.hex.value);
      let htmlStr = "";
      for (const code of hexCodes) {
        htmlStr += `
          <div class="color-container">
            <div class="color-display" style="background-color: ${code}"></div>
            <p>${code}</p>
          </div>
        `;
      }
      document.querySelector("main").innerHTML = htmlStr;
    })
}

renderColors();

document.getElementById("color-scheme-form").addEventListener("submit", function(e) {
  e.preventDefault()
  
  const color = document.getElementById("color-picker").value
  const scheme = document.getElementById("scheme-selector").value
  
  renderColors(color, scheme)
});

