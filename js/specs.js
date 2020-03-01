const SPECS_LIST = [new Spec("Modul", "", ""),
    new Spec("Anzahl", "x", ""),
    new Spec("Strom", "A", ""),
    new Spec("Spannung", "V", ""),
    new Spec("Leistung", "W", "Zeigt den Stromverbrauch."),
    new Spec("Auslastung", "%", "Zeigt zu wieviel Prozent eine einzelne LED Diode ausgelastet ist. Es ist nicht empfohlen die LEDs mehr als 75% auszulasten."),
    new Spec("Lumen", "lm", "Zeigt den Lichtstrom, nicht zu verwechseln mit Lux (lm/m²), was die Beleuchtungsstärke (Lichstrom auf Fläche) angibt."),
    new Spec("Effizienz", "lm/W", "Zeigt die Effizienz des Moduls."),
    new Spec("PPFD (PAR)", "µmol/(m²s)", "PAR ist die photosynthetisch aktive Strahlung, also das von den Pflanzen verwertbare Licht. Dieser Wert wird als PPFD angegeben, was die Stromdichte der Photonen im photosynthetisch aktiven Sonnenspektrum ist."),
    new Spec("Effizienz (PAR)", "µmol/J", "Zeigt die Effizienz des Moduls."),
    new Spec("Preis", "€", "Zeigt den günstigsten Preis (inkl. Mwst.) für die Module (Zuletzt aktualisiert am 1. März 2020). Auf den Modulnamen klicken, um aktuellen Bestpreis anzuzeigen."),
    new Spec("Preis/Diode", "€", "Zeigt den Preis einer einzelnen LED Diode."),
    new Spec("Stromk./Grow", "€", "Zeigt die Stromkosten (bei 30 Cent kWh Strompreis) für einen Grow (Vegetation -> 18h, Blüte -> 12h)."),
    new Spec("Ausgb. n. 5 Grows", "€", "Zeigt die Gesamtausgaben (Module + Stromkosten) nach 5 Grows."),
    new Spec("Abdeckung", "%", "Zeigt zu wieviel Prozent die Fläche durch die Module abgedeckt ist."),
    new Spec("Treiber", "", "Zeigt eine geeignete Kombination aus Konstantstromquellen (von allen MeanWell ELG-C und HLG-C Modellen). Die KSQs arbeiten am effizientesten wenn sie voll ausgelastet sind."),
];

function Spec(name, unit, description) {
    this.name = name;
    this.unit = unit;
    this.description = description;
}

function Specs(amount, current, voltage, power, workload, lumen, efficiency, ppfd, parEfficiency, price, diodePrice, electricityCosts, expenses, illumination) {
    this.amount = amount;
    this.current = current;
    this.voltage = voltage;
    this.power = power;
    this.workload = workload;
    this.lumen = lumen;
    this.efficiency = efficiency;
    this.ppfd = ppfd;
    this.parEfficiency = parEfficiency;
    this.price = price;
    this.diodePrice = diodePrice;
    this.electricityCosts = electricityCosts;
    this.expenses = expenses;
    this.illumination = illumination;
}
