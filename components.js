async function loadComponent(id, file) {
    const html = await fetch(file).then(r => r.text());
    document.getElementById(id).innerHTML = html;
}

loadComponent("sidebar", "/components/sidebar.html");