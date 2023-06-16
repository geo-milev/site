const getClassNumberName = (index) => {
    if (classNumberNames[index - 1] !== undefined) {
        return classNumberNames[index - 1];
    } else {
        return index;
    }
};

const classNumberNames = [
    "Първи",
    "Втори",
    "Трети",
    "Четвърти",
    "Пети",
    "Шести",
    "Седми",
    "Осми",
    "Девети",
    "Десети",
    "Единадесети",
    "Дванадесети",
];

export { getClassNumberName };
