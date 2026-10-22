"use strict";
// Estoque demonstrativo. Substitua os dados e as fotos pelos veículos reais.
const vehicles = [
  {
    id: 1,
    brand: "VOLVO",
    model: "XC60",
    version: "2.0 B5 Momentum • Automático",
    category: "SUV",
    year: 2022,
    km: "32.000",
    price: 239900,
    photo: "assets/xc60.png",
    fallback: "photo-1606664515524-ed2f786a0bd6",
  },
  {
    id: 2,
    brand: "BMW",
    model: "320i",
    version: "2.0 Sport GP • Automático",
    category: "Sedã",
    year: 2021,
    km: "41.000",
    price: 219900,
    photo: "assets/320i.png",
  },
  {
    id: 3,
    brand: "MERCEDES-BENZ",
    model: "Classe A",
    version: "A 200 Style • Automático",
    category: "Hatch",
    year: 2020,
    km: "48.000",
    price: 159900,
    photo: "assets/classe-a.png",
  },
  {
    id: 4,
    brand: "AUDI",
    model: "Q3",
    version: "1.4 TFSI Prestige • Automático",
    category: "SUV",
    year: 2021,
    km: "39.000",
    price: 189900,
    photo: "assets/q3.png",
  },
  {
    id: 5,
    brand: "VOLKSWAGEN",
    model: "Polo",
    version: "1.0 TSI Comfortline • Automático",
    category: "Hatch",
    year: 2023,
    km: "24.000",
    price: 94900,
    photo: "assets/polo.png",
    fallback: "photo-1503376780353-7e6692767b70",
  },
  {
    id: 6,
    brand: "TOYOTA",
    model: "Corolla",
    version: "2.0 XEi • Automático CVT",
    category: "Sedã",
    year: 2022,
    km: "35.000",
    price: 139900,
    photo: "assets/corolla.png",
  },
];
const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});
const grid = document.querySelector("#vehicle-grid");
const query = document.querySelector("#query");
const category = document.querySelector("#category");
const price = document.querySelector("#price");
const dialog = document.querySelector("#vehicle-dialog");
const imageUrl = (photo) => photo;
const normalize = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
function render() {
  const term = normalize(query.value);
  const selected = vehicles.filter(
    (v) =>
      normalize(`${v.brand} ${v.model}`).includes(term) &&
      (!category.value || v.category === category.value) &&
      (!price.value || v.price <= Number(price.value)),
  );
  grid.innerHTML = selected
    .map(
      (v) =>
        `<article class="vehicle-card"><div class="vehicle-image"><img src="${imageUrl(v.photo)}" alt="Imagem ilustrativa de veículo ${v.brand}; consulte fotos do modelo ${v.model}" loading="lazy"><span class="badge">${v.category.toUpperCase()} • SELEÇÃO VÉRTICE</span></div><div class="vehicle-info"><small>${v.brand}</small><h3>${v.model}</h3><p class="version">${v.version}</p><div class="specs"><span>◷ ${v.year}</span><span>↗ ${v.km} km</span><span>⚙ Automático</span></div><div class="price-row"><strong>${money.format(v.price)}</strong><button class="detail-button" data-id="${v.id}" aria-label="Ver detalhes: ${v.brand} ${v.model}">Ver detalhes ↗</button></div></div></article>`,
    )
    .join("");
  grid.querySelectorAll("img").forEach((img) =>
    img.addEventListener(
      "error",
      () => {
        img.removeAttribute("src");
        img.alt = "Imagem indisponível — consulte as fotos do veículo";
      },
      { once: true },
    ),
  );
  document.querySelector("#result-count").textContent =
    `${selected.length} ${selected.length === 1 ? "veículo encontrado" : "veículos encontrados"}`;
  document.querySelector("#empty").hidden = selected.length > 0;
  document.querySelectorAll(".chip").forEach((button) => {
    const active = button.dataset.category === category.value;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}
document.querySelector("#filters").addEventListener("submit", (event) => {
  event.preventDefault();
  render();
  document.querySelector("#veiculos").scrollIntoView({ behavior: "smooth" });
});
category.addEventListener("change", render);
price.addEventListener("change", render);
query.addEventListener("input", render);
document.querySelectorAll(".chip").forEach((button) =>
  button.addEventListener("click", () => {
    category.value = button.dataset.category;
    render();
  }),
);
document.querySelector("#reset").addEventListener("click", () => {
  document.querySelector("#filters").reset();
  render();
  query.focus();
});
let detailTrigger;
grid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-id]");
  if (!button) return;
  const v = vehicles.find((item) => item.id === Number(button.dataset.id));
  detailTrigger = button;
  document.querySelector("#dialog-content").innerHTML =
    `<img src="${imageUrl(v.photo)}" alt="Foto ilustrativa de veículo ${v.brand}"><span class="eyebrow">${v.category} • ${v.year}</span><h2>${v.brand} ${v.model}</h2><p>${v.version}<br>${v.km} km • ${money.format(v.price)}</p><p class="demo-note">Anúncio demonstrativo. Foto ilustrativa. Disponibilidade, histórico, equipamentos e condições devem ser confirmados com a concessionária.</p><button class="button" id="vehicle-interest">Tenho interesse ↗</button>`;
  document.querySelector("#vehicle-interest").addEventListener("click", () => {
    document.querySelector('[name="message"]').value =
      `Olá! Tenho interesse no ${v.brand} ${v.model} ${v.year}, anunciado por ${money.format(v.price)}. Gostaria de saber mais e agendar uma visita.`;
    dialog.close();
    document.querySelector("#contato").scrollIntoView();
    document.querySelector('[name="name"]').focus({ preventScroll: true });
  });
  dialog.showModal();
});
document
  .querySelector("#close-dialog")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close();
  }
});
dialog.addEventListener("close", () => {
  if (detailTrigger?.isConnected) detailTrigger.focus({ preventScroll: true });
});
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");
function closeMenu() {
  menu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}
menuToggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});
menu
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = `Olá, equipe Vértice Motors!\n\nMeu nome é ${String(data.get("name")).trim()}.\nE-mail para retorno: ${String(data.get("email")).trim()}\n\n${String(data.get("message")).trim()}`;
  document.querySelector("#prepared-message").value = message;
  document.querySelector("#message-output").hidden = false;
  document.querySelector("#contact-status").textContent =
    "Mensagem pronta. Copie o texto e envie pelo canal oficial da concessionária. Nenhum dado foi enviado ou armazenado.";
});
document.querySelector("#copy-message").addEventListener("click", async () => {
  const area = document.querySelector("#prepared-message");
  try {
    if (!navigator.clipboard) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(area.value);
    document.querySelector("#contact-status").textContent =
      "Mensagem copiada. Agora você pode enviá-la pelo canal oficial.";
  } catch {
    area.focus();
    area.select();
    document.querySelector("#contact-status").textContent =
      "Selecione e copie a mensagem acima (Ctrl+C ou o comando Copiar do dispositivo).";
  }
});
document.querySelector("#year").textContent = new Date().getFullYear();
render();
