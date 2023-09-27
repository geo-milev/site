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
        backgroundColor: "var(--black)",
    },
};

const secondaryLayout: LayoutProps = {
    navbar: {
        fixed: false,
        showTitle: false,
        backgroundColor: "var(--secondary)",
    },
};

const tertiaryLayout: LayoutProps = {
    navbar: {
        fixed: false,
        showTitle: false,
        backgroundColor: "#FFFFFF",
    },
};

const tertiaryLayoutDark: LayoutProps = {
    navbar: {
        fixed: false,
        showTitle: false,
        backgroundColor: "#121212",
    },
};

const layout = writable(mainLayout);

export {
    layout,
    LayoutProps,
    setLayout,
    mainLayout,
    secondaryLayout,
    tertiaryLayout,
    tertiaryLayoutDark,
};
