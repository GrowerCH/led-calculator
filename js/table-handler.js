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
}

function updateTable(table, modules) {
    for (let tbody of Array.from(table.tBodies)) {
        tbody.remove();
    }

    for (let module of modules) {

        for (let version of module["versions"]) {
            let body = table.createTBody();

            createHeaderRow(body, module, version);

            for (let specs of version["specs"]) {

                createSpecsRow(body, specs, specs.workload >= 75);
            }
        }
    }
}

function createHeaderRow(body, module, version) {
    let subHeadRow = body.insertRow();

    let subHeadCell = document.createElement("TH");
    subHeadCell.rowSpan = version.specs.length + 1;

    let seller = module["seller"];
    let sellerText = document.createElement("SMALL");
    sellerText.innerText = seller + " ";

    let url = document.createElement("A");
    url.innerText = module["model"];
    if (seller == "Samsung") {
        url.href = "https://octopart.com/search?q=";
    } else if (seller == "led-tech") {
        url.href = "https://www.led-tech.de/de/";
    } else if (seller == "kingbrite") {
        url.href = "https://kingbriteled.en.alibaba.com/";
    }
    url.href += version["product_code"];
    url.target = "_blank";

    let ledText = document.createElement("SMALL");
    let count = module["parallel_count"] * module["series_count"];
    ledText.innerText = " " + count + "x " + module["led"] + " ";

    let hideButton = document.createElement("BUTTON");
    hideButton.className = minusButtonClass;
    hideButton.addEventListener("click", () => {
        hideButtonClick(body, hideButton);
    });

    subHeadCell.appendChild(sellerText);
    subHeadCell.appendChild(url);
    subHeadCell.appendChild(ledText);
    subHeadCell.appendChild(hideButton);
    subHeadRow.appendChild(subHeadCell);
}

const minusButtonClass = "btn far fa-minus-square";
const plusButtonClass = "btn far fa-plus-square";

function hideButtonClick(body, button) {
    let hidden = button.className == plusButtonClass;
    button.className = hidden ? minusButtonClass : plusButtonClass;
    for (let child of body.childNodes) {
        if (child == body.firstChild) {
            continue;
        }
        if (hidden) {
            child.removeAttribute("hidden");
        } else {
            child.setAttribute("hidden", true);
        }
    }
}

function createSpecsRow(body, specs, gray) {
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
    url.className = "fas fa-external-link-alt";

    row.insertCell().appendChild(url);
}