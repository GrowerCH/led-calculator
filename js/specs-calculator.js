function calculateVoltage(version, Current) {
    let Vf = version["voltage"];

    let performance = version["performance"];

    let VfPolyX3 = parseFloat(performance["VfPolyX3"]);
    let VfPolyX2 = parseFloat(performance["VfPolyX2"]);
    let VfPolyX1 = parseFloat(performance["VfPolyX1"]);
    let VfPolyA = parseFloat(performance["VfPolyA"]);

    return Vf * (VfPolyX3 * (Current * Current * Current) + VfPolyX2 * (Current * Current) + VfPolyX1 * Current + VfPolyA);
}

function calculateFlux(version, Current) {

    let Flux = version["flux"];

    let performance = version["performance"];

    let FluxPolyX3 = parseFloat(performance["FluxPolyX3"]);
    let FluxPolyX2 = parseFloat(performance["FluxPolyX2"]);
    let FluxPolyX1 = parseFloat(performance["FluxPolyX1"]);
    let FluxPolyA = parseFloat(performance["FluxPolyA"]);

    return Flux * (FluxPolyX3 * (Current * Current * Current) + FluxPolyX2 * (Current * Current) + FluxPolyX1 * Current + FluxPolyA);
}

function calculate(module, moduleVersion, led, ledVersion, current, lumenInput, areaInput, usageInput) {
    let series = module["series_count"];
    let parallel = module["parallel_count"];
    let count = series * parallel;

    let ledCurrent = current / parallel;
    let maxCurrent = led["max_current"];

    let parConversion = ledVersion["par_conversion"];

    let price = moduleVersion["price"] * 1.19;

    let dimensions = module["dimensions"];
    let length = dimensions["length"] / 1000;
    let width = dimensions["width"] / 1000;

    //

    let voltage = calculateVoltage(ledVersion, ledCurrent) * series;
    let flux = calculateFlux(ledVersion, ledCurrent) * count;

    let amount = Math.round(lumenInput * areaInput / flux);

    let totalVoltage = voltage * amount;
    let totalWattage = totalVoltage * current;

    let totalFlux = flux * amount;
    let efficiency = totalFlux / totalWattage;
    let workload = ledCurrent / maxCurrent * 100;

    let ppfd = totalFlux / areaInput * parConversion;
    let parEfficiency = totalFlux * parConversion / totalWattage;

    let totalPrice = price * amount;
    let diodePrice = price / count;

    let electricityCosts = totalWattage / 1000 * usageInput * 0.30;
    let expensesAfter5 = totalPrice + electricityCosts * 5;

    let illumination = amount * length * width / areaInput * 100;

    return new Specs(
        amount,
        current.toFixed(3),
        Math.round(totalVoltage),
        Math.round(totalWattage),
        Math.round(workload),
        Math.round(totalFlux),
        Math.round(efficiency),
        Math.round(ppfd),
        parEfficiency.toFixed(2),
        Math.round(totalPrice),
        diodePrice.toFixed(2),
        Math.round(electricityCosts),
        Math.round(expensesAfter5),
        Math.round(illumination)
    );
}