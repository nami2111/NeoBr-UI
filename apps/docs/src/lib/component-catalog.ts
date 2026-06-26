import type { ComponentProps } from "svelte";
import type { Icon } from "@neobr/svelte";
import {
    Alert01Icon,
    DashboardSquare01Icon,
    GridViewIcon,
    LayoutGridIcon,
    Task01Icon,
    Touch01Icon,
    ViewIcon,
} from "@hugeicons/core-free-icons";

type ComponentIcon = ComponentProps<typeof Icon>["icon"];

export type ComponentItem = {
    name: string;
    href: string;
    description: string;
};

export type ComponentCategory = {
    title: string;
    icon: ComponentIcon;
    items: ComponentItem[];
};

export const componentCategories: ComponentCategory[] = [
    {
        title: "Forms",
        icon: Task01Icon,
        items: [
            {
                name: "Button",
                href: "/components/button",
                description: "Interactive elements for actions",
            },
            { name: "Input", href: "/components/input", description: "Single-line form control" },
            { name: "Checkbox", href: "/components/checkbox", description: "Toggle check states" },
            { name: "Toggle", href: "/components/toggle", description: "Two-state button" },
            { name: "Slider", href: "/components/slider", description: "Range selection" },
            {
                name: "Textarea",
                href: "/components/textarea",
                description: "Multi-line text input",
            },
            { name: "Select", href: "/components/select", description: "Dropdown selection" },
            {
                name: "Radio Group",
                href: "/components/radio-group",
                description: "Single selection from options",
            },
            {
                name: "Form",
                href: "/components/form",
                description: "Forms with Zod validation helpers",
            },
            { name: "Label", href: "/components/label", description: "Accessible form labels" },
        ],
    },
    {
        title: "Layout",
        icon: LayoutGridIcon,
        items: [
            {
                name: "Accordion",
                href: "/components/accordion",
                description: "Collapsible sections",
            },
            { name: "Card", href: "/components/card", description: "Content container" },
            {
                name: "Bento Grid",
                href: "/components/bento-grid",
                description: "Variable-sized grid",
            },
            {
                name: "Collapsible",
                href: "/components/collapsible",
                description: "Expand/collapse panels",
            },
            { name: "Separator", href: "/components/separator", description: "Visual divider" },
            {
                name: "Aspect Ratio",
                href: "/components/aspect-ratio",
                description: "Content ratio container",
            },
        ],
    },
    {
        title: "Overlays",
        icon: ViewIcon,
        items: [
            { name: "Modal", href: "/components/modal", description: "Focus-managed dialog" },
            {
                name: "Popover",
                href: "/components/popover",
                description: "Triggered floating content",
            },
            { name: "Sheet", href: "/components/sheet", description: "Slide-in panel" },
            { name: "Toast", href: "/components/toast", description: "Notification message" },
            {
                name: "Tooltip",
                href: "/components/tooltip",
                description: "Hover and focus information",
            },
        ],
    },
    {
        title: "Navigation",
        icon: Touch01Icon,
        items: [
            {
                name: "Breadcrumbs",
                href: "/components/breadcrumbs",
                description: "Path navigation",
            },
            { name: "Tabs", href: "/components/tabs", description: "Layered content panels" },
            { name: "Pagination", href: "/components/pagination", description: "Page navigation" },
            { name: "Link", href: "/components/link", description: "Styled anchors" },
        ],
    },
    {
        title: "Feedback",
        icon: Alert01Icon,
        items: [
            { name: "Alert", href: "/components/alert", description: "User messages" },
            { name: "Badge", href: "/components/badge", description: "Status labels" },
            { name: "Progress", href: "/components/progress", description: "Completion indicator" },
            { name: "Loading", href: "/components/loading", description: "Spinner animation" },
            { name: "Skeleton", href: "/components/skeleton", description: "Loading placeholder" },
            { name: "Marquee", href: "/components/marquee", description: "Scrolling ticker" },
        ],
    },
    {
        title: "Data Display",
        icon: DashboardSquare01Icon,
        items: [
            { name: "Avatar", href: "/components/avatar", description: "User image with fallback" },
            { name: "Calendar", href: "/components/calendar", description: "Date calendar" },
            {
                name: "Date Picker",
                href: "/components/date-picker",
                description: "Date input and calendar",
            },
            { name: "Table", href: "/components/table", description: "Semantic data table" },
            {
                name: "Scroll Area",
                href: "/components/scroll-area",
                description: "Custom scroll container",
            },
            { name: "Icon", href: "/components/icon", description: "HugeIcons wrapper" },
        ],
    },
    {
        title: "Advanced",
        icon: GridViewIcon,
        items: [
            {
                name: "Dropdown Menu",
                href: "/components/dropdown-menu",
                description: "Action menu",
            },
            {
                name: "Command",
                href: "/components/command",
                description: "Command palette primitives",
            },
            { name: "Switch", href: "/components/switch", description: "On/off toggle" },
            {
                name: "Toggle Group",
                href: "/components/toggle-group",
                description: "Single or multiple button group",
            },
            {
                name: "Error Boundary",
                href: "/components/error-boundary",
                description: "Render error fallback",
            },
            { name: "Sticker", href: "/components/sticker", description: "Decorative badge" },
            { name: "Window", href: "/components/window", description: "OS window container" },
        ],
    },
];

export const componentItems = componentCategories.flatMap((category) => category.items);
export const componentCount = componentItems.length;
