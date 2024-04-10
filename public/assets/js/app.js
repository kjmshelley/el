const nl = document.querySelector("#navigation-menu");

async function getMenu() {
    const resp = await fetch("/api/menu");
    const menu = await resp.json();
    nl.innerHTML = menu.map(m => {
        return `<li class="nav-item">
        <a class="nav-link d-flex align-items-center gap-2" href="${m.menuLink}">
          <svg class="bi"><use xlink:href="#file-earmark"/></svg>
          ${m.menuItem}
        </a>
      </li>`;
    }).join("");
}


(async () => {
    await getMenu();
})();