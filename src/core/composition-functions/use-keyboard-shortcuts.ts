type KeyboardShortcut = {
    shortcut: string;
    callback: () => void;
}

export enum KeyboardModifier {
    CTRL = 'Ctrl',
    ALT = 'Alt'
}

export const createKeyboardShortcut = (modifier: KeyboardModifier, key: string) =>
    `${modifier}+${key}`;

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
    const handleKeyboardShortcuts = (event: KeyboardEvent) => {
        shortcuts.forEach(({ shortcut, callback }) => {
            const [modifier, key] = shortcut.split('+');

            if (
                (modifier === KeyboardModifier.CTRL && event.ctrlKey) ||
                (modifier === KeyboardModifier.ALT && event.altKey)
            ) {
                if (event.key === key) {
                    event.preventDefault();
                    callback();
                }
            }
        });
    };

    return { handleKeyboardShortcuts };
};
