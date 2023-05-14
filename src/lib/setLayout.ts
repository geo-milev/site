import { writable } from "svelte/store";

interface LayoutProps {
    navbar: {
        fixed: boolean;
        showTitle: boolean;
        backgroundColor: string;
    };
}

const setLayout = (layoutProps: LayoutProps) => {
    layout.set(layoutProps);
};

const mainLayout: LayoutProps = {
    navbar: {
        fixed: true,
        showTitle: true,
        backgroundColor: "#000000",
    },
};

const secondaryLayout: LayoutProps = {
    navbar: {
        fixed: false,
        showTitle: false,
        backgroundColor: "#4F0D0D",
    },
};

const layout = writable(mainLayout);

export { layout, LayoutProps, setLayout, mainLayout, secondaryLayout };
