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
        backgroundColor: "var(--background)",
    },
};

const tertiaryLayout: LayoutProps = {
    navbar: {
        fixed: false,
        showTitle: false,
        backgroundColor: "var(--news-background)",
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
};
