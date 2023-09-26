import { get, writable } from "svelte/store";

const key = "selectedClass";

interface Class {
    classNumber: string;
    classLetter: string;
}

const selectedClass = writable<Class>({
    classNumber: "-1",
    classLetter: "0",
});

const { subscribe, set } = selectedClass;

const isBrowser = () => typeof window != "undefined" && localStorage;

if (isBrowser()) {
    const selectedClassStored = localStorage.getItem(key);

    if (selectedClassStored) {
        selectedClass.set(JSON.parse(selectedClassStored));
    }
}

const saveValue = (value) => {
    if (value) {
        if (isBrowser()) {
            localStorage.setItem(key, JSON.stringify(value));
        }

        set(value);
    }
};

const selectedClassStore = {
    subscribe,
    set: (value) => saveValue(value),
    update: (updateFunction: (selectedClass) => Class) => {
        const updatedStore = updateFunction(get(selectedClass));

        saveValue(updatedStore);
    },
    get: () => get(selectedClass),
};

export { selectedClassStore };
