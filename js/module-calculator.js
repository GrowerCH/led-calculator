function calculateSpecs(module, ledData, performance, price, lumenInput, areaInput, usageInput) {
    let amount = Math.round(lumenInput * areaInput / performance.flux);

    let current = performance.current;
    let voltage = performance.voltage * amount;
    let wattage = voltage * current;

    let workload = current / module.parallel_number / ledData.maxCurrent * 100;
    let lumen = performance.flux * amount;
    let efficiency = lumen / wattage;

    let ppfd = performance.flux * amount / areaInput * ledData.parConstant;
    let parEfficiency = performance.flux * amount * ledData.parConstant / wattage;

    let totalPrice = price * amount;
    let diodePrice = price / (module.series_number * module.parallel_number);

    let electricityCosts = wattage / 1000 * usageInput * 0.30;
    let expensesAfter5 = totalPrice * 1.19 + electricityCosts * 5;

    let illumination = amount * module.dimensions.length / 1000 * module.dimensions.width / 1000 / areaInput * 100;

    return new Specs(
        amount,
        current.toFixed(3),
        Math.round(voltage),
        Math.round(wattage),
        Math.round(workload),
        Math.round(lumen),
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