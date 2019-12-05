let MODULE_LIST;
let LED_LIST;

function loadData() {
    return Promise.all(
        [
            fetch("json/modules.json"),
            fetch("json/leds.json")
        ]
    ).then(
        ([modules, leds]) => Promise.all([modules.json(), leds.json()])
    ).then(
        ([modules, leds]) => {
            MODULE_LIST = modules;
            LED_LIST = leds;
        });
}

function cloneArray(array) {
    return JSON.parse(JSON.stringify(array));
}

function filterModulesByArea(modules, areaLength, areaWidth) {
    return modules.filter(function (module) {
        let length = module.dimensions.length;
        return !(length > areaLength * 1000 && length > areaWidth * 1000);
    });
}

function filterModulesByCCT(modules, cct) {
    return modules.filter(function (module) {
        module.versions = module.versions.filter(function (version) {
            return cct == version.cct;
        });
        return module.versions.length > 0;
    });
}

function calculateModules(modules, lumenInput, areaInput, usageInput) {
    return modules.filter(function (module) {
        module.versions = module.versions.filter(function (version) {
            let ledData = getLEDData(module.led, version.cct);
            let price = version.price;

            version.specs = [];
            version.performances.forEach(function (performance) {
                let specs = calculateSpecs(module, ledData, performance, price, lumenInput, areaInput, usageInput);
                if (specs.illumination <= 100) {
                    version.specs.push(specs);
                }
            });

            return version.specs.length > 0;
        });

        return module.versions.length > 0;
    });
}

function filterModulesByEfficiency(modules, minEfficiency) {
    return modules.filter(function (module) {
        module.versions = module.versions.filter(function (version) {
            version.specs = version.specs.filter(function (spec) {
                return spec.efficiency >= minEfficiency
            });
            return version.specs.length > 0;
        });
        return module.versions.length > 0;
    });
}

function compareEfficiency(a, b) {
    let efficiencyA = a.versions[0].specs[0].efficiency;
    let efficiencyB = b.versions[0].specs[0].efficiency;

    if (efficiencyA > efficiencyB) {
        return -1;
    } else if (efficiencyA < efficiencyB) {
        return 1;
    } else {
        return 0;
    }
}

function getEfficiencyRange(modules) {
    let result = {};
    result.best = 0;
    result.worst = 1000;
    for (let module of modules) {
        for (let version of module.versions) {

            let specs = version.specs[0];
            if (specs.efficiency > result.best) {
                result.best = Math.floor(specs.efficiency);
            }

            specs = version.specs[version.specs.length - 1];
            if (specs.efficiency < result.worst) {
                result.worst = Math.floor(specs.efficiency);
            }
        }
    }
    return result;
}

//

function getCCTValues(modules) {
    let result = [];
    for (let module of modules) {
        for (let version of module.versions) {
            let cct = version.cct;
            if (!result.includes(cct)) {
                result.push(cct);
            }
        }
    }
    return result;
}

function getLEDData(ledName, cct) {
    let result = {};
    for (let led of LED_LIST) {
        if (led.name != ledName) {
            continue;
        }
        result.maxCurrent = led.max_current;
        for (let version of led.versions) {
            if (version.cct == cct) {
                result.parConstant = version.par_constant;
                return result;
            }
        }
    }
    return result;
}