const key = "2ee5c41f9ee1b64158f6116897e22723";
const btn_search = document.getElementById("btn_search");
const ipt_search = document.getElementById("ipt_city");
const elemento = document.querySelector(".elements");

btn_search.addEventListener("click", () => {
	takeCity();
});
ipt_search.addEventListener("keydown", ({ key }) => {
	if (key == "Enter") {
		takeCity();
	}
});
function takeCity() {
	const cidade = ipt_search.value;
	chamarDados(cidade);
}
async function chamarDados(cidade) {
	const loadingElement = document.getElementById("loading");
	loadingElement.style.display = "block"; // Mostra o elemento de carregamento

	let dados = await fetch(
		"https://api.openweathermap.org/data/2.5/weather?q=" +
			cidade +
			"&appid=" +
			key +
			"&lang=pt_br" +
			"&units=metric"
	).then((resposta) => resposta.json());
	loadingElement.style.display = "none";
	inserir(dados);
	console.log(dados);
}
const desc = document.querySelector(".desc");

function inserir(dados) {
	const city_name = document.getElementById("city_name");
	const temp = document.querySelector(".temp");
	const humidity = document.querySelector(".humidty");
	const icon = document.querySelector(".icon");
	const fellsLk = document.querySelector(".fellsLk");
	const maxT = document.querySelector(".max_temp");
	const minT = document.querySelector(".min_temp");

	fellsLk.innerHTML = `Feels Like: ${Math.floor(dados.main.feels_like)}°C`;
	maxT.innerHTML = `Max-temp: ${Math.floor(dados.main.temp_max)}°C`;
	minT.innerHTML = `Min-temp: ${Math.floor(dados.main.temp_min)}°C`;

	elemento.classList.toggle("mudou");

	city_name.innerHTML = `${dados.name} - ${dados.sys.country}`;
	temp.innerHTML = `Temperature: ${Math.floor(dados.main.temp)}°C`;
	humidity.innerHTML = `humidity: ${dados.main.humidity}%`;
	desc.innerHTML = `${dados.weather[0].description}`;
	icon.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}
const checkbox = document.getElementById("mud");
const body = document.body;
const icons = document.querySelectorAll("#icon, #icon2, #icon3");

function toggleDarkMode() {
  body.classList.toggle("dark");
  const iconColor = checkbox.checked ? "#eeeeee" : "#333";
  icons.forEach(icon => {
    icon.colors = `primary:${iconColor}`;
  });
}

checkbox.addEventListener("input", toggleDarkMode);

const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)");
if (prefersColorScheme.matches) {
  body.classList.add("dark");
  checkbox.checked = true;
  icons.forEach(icon => {
    icon.colors = "primary:#eeeeee";
  });
}

const theme = window.localStorage.getItem("theme");
if (theme === "dark") {
  body.classList.add("dark");
  icons.forEach(icon => {
    icon.colors = "primary:#eeeeee";
  });
}
