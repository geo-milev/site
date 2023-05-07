import { writable } from "svelte/store";

interface Info {
    schoolName: string;
    logoHref: string;
    logoHrefAlt: string;
    contact: {
        address: string;
        principalPhone: string;
        assistantPrincipalPhone: string;
        mainEmail: string;
        secondaryEmail: string;
    };
}

const defaults: Info = {
    schoolName: "Профилирана природоматематическа гимназия “Гео Милев”",
    logoHref: "/logo.svg",
    logoHrefAlt: "Лого",
    contact: {
        address: "Августа Траяна 42, Стара Загора, 6000",
        principalPhone: "0899999999",
        assistantPrincipalPhone: "",
        mainEmail: "mgto@abv.bg",
        secondaryEmail: "",
    },
};

const mainInfo = writable(defaults);

// Dummy function
const fetchRemoteInfo = async () => {
    await new Promise((res) => {
        setTimeout(res, 3000);
    });
    const newObjects = Object.assign({}, defaults);
    newObjects.schoolName = "Природоматематическа гимназия “Гео Милев”";
    return newObjects;
};

fetchRemoteInfo().then((res) => {
    mainInfo.set(res);
});

export { mainInfo, Info };
