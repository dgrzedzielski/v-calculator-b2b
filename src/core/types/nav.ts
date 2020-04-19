export interface ToPropType {
    path?: string;
    name?: string;
    params?: { [key: string]: string }
}

export type NavItem = {
    to: string | ToPropType;
    title: string;
    icon: string;
}
