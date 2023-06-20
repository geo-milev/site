const documentViewerSorts = {
    alphabetical: (documents) => {
        return documents.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
    },
    reverseAlphabetical: (documents) => {
        return documents.sort((a, b) => {
            return -a.name.localeCompare(b.name);
        });
    },
    default: (documents) => documents,
    random: (documents) =>
        documents
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value),
};

export { documentViewerSorts };
