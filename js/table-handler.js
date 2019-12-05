function createTable(table) {
    let head = table.createTHead();

    let headRow = head.insertRow();

    for (let spec of SPECS_LIST) {
        let headCell = document.createElement("TH");
        headCell.innerText = spec.name;
        headCell.title = spec.description;
        headCell.setAttribute("data-toggle", "tooltip");
        headRow.appendChild(headCell);
    }

    table.createTBody();
}

function updateTable(table, modules) {
    let body = table.tBodies[0];

    body.innerHTML = "";

    for (let module of modules) {

        for (let version of module.versions) {
            createSubHead(body, module, version);

            for (let specs of version.specs) {

                createRow(body, specs, specs.workload >= 75);
            }
        }
    }
}

function createSubHead(body, module, version) {
    let subHeadRow = body.insertRow();

    let subHeadCell = document.createElement("TH");
    subHeadCell.rowSpan = version.specs.length + 1;

    let url = document.createElement("A");
    url.innerText = module.model + " (" + (module.parallel_number * module.series_number) + "x " + module.led + ")";
    if (version.cri != 80) {
        url.innerText += " (CRI: " + version.cri + ")";
    }

    url.href = "https://octopart.com/search?q=" + version.product_code;
    url.target = "_blank";

    subHeadCell.appendChild(url);
    subHeadRow.appendChild(subHeadCell);
}

function createRow(body, specs, gray) {
    let row = body.insertRow();

    if (gray) {
        row.className = "text-secondary";
    }

    let i = 0;
    for (let spec of Object.values(specs)) {
        let unit = SPECS_LIST[i + 1].unit;
        addCell(row, spec + " " + unit);
        i++;
    }

    addDriverCell(row, specs.amount, specs.current, specs.voltage / specs.amount);
}

function addCell(row, text) {
    let cell = row.insertCell();
    if (text.includes("NaN")) {
        text = "";
    }
    cell.innerText = text;
}

function addDriverCell(row, amount, current, voltage) {
    let url = document.createElement("A");
    url.href = "https://growerch.github.io/driver-calculator?a=" + amount + "&c=" + current + "&v=" + voltage;
    url.target = "_blank";

    let icon = document.createElement("I");
    icon.className = "fas fa-external-link-alt";
    url.appendChild(icon);

    row.insertCell().appendChild(url);
}