import { writable } from "svelte/store";

interface LayoutProps {
    navbar: {
        fixed: boolean;
        showTitle: boolean;
        backgroundColor: string;
    };
    themeSwitchShown: boolean;
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
    themeSwitchShown: false,
};

const secondaryLayout: LayoutProps = {
    navbar: {
        fixed: false,
        showTitle: false,
        backgroundColor: "var(--background)",
    },
    themeSwitchShown: true,
};

const tertiaryLayout: LayoutProps = {
    navbar: {
        fixed: false,
        showTitle: false,
        backgroundColor: "var(--news-background)",
    },
    themeSwitchShown: true,
};

const layout = writable(mainLayout);

export {
    layout,
    LayoutProps,
    setLayout,
    mainLayout,
    secondaryLayout,
    tertiaryLayout,
};
