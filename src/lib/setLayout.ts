import { writable } from "svelte/store";

interface LayoutProps {
    navbar: {
        fixed: boolean;
        title: string | null;
        backgroundColor: string;
    };
}

const setLayout = (layoutProps: LayoutProps) => {
    layout.set(layoutProps);
};

const mainLayout: LayoutProps = {
    navbar: {
        fixed: true,
        title: "Профилирана природоматематическа гимназия “Гео Милев”",
        backgroundColor: "#000000",
    },
};

const secondaryLayout: LayoutProps = {
    navbar: {
        fixed: false,
        title: null,
        backgroundColor: "#4F0D0D",
    },
};

const layout = writable(mainLayout);

export { layout, LayoutProps, setLayout, mainLayout, secondaryLayout };
