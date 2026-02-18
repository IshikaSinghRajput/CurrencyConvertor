const populate = async (value, currency) => {
    let myStr = "";

    const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_tN14EINE77iAZtv6kpRKNTuaH5xO7XikkCLxaSjF&base_currency=${currency}`;

    const response = await fetch(url);
    const rJson = await response.json();
    document.querySelector(".output").style.display = "block"

    // Safety check
    if (!rJson.data) {
        alert("Invalid currency selected or API error.");
        console.log(rJson);
        return;
    }

    for (let key of Object.keys(rJson.data)) {
        myStr += `
            <tr>
                <td>${key}</td>
                <td>${rJson.data[key].code}</td>
                <td>${Math.round(rJson.data[key].value * value)}</td>
            </tr>
        `;
    }

    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = myStr;
};

const btn = document.querySelector(".btn");

btn.addEventListener("click", (e) => {
    e.preventDefault();

    const value = parseInt(document.querySelector("input[name='quantity']").value);
    const currency = document.querySelector("select[name='currency']").value;  // ✅ FIXED

    populate(value, currency);
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        hamburger.textContent = "✖";   // show cut icon
    } else {
        hamburger.textContent = "☰";   // show hamburger icon
    }
});
