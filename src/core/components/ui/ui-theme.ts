export type ThemeVariant =
    | 'primary'
    | 'primary-gradient'
    | 'success'
    | 'danger';

export interface Themable {
    theme: ThemeVariant;
}
