export const isClickOutsideElement = (element: Node, event: MouseEvent): boolean => {
    return !(element === event.target || element.contains(event.target as Node));
};

const focusableElements = 'a[href], area[href], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';

export const getFocusableElements = (target: HTMLElement) => {
    const result = target.querySelectorAll(focusableElements) as NodeListOf<HTMLElement>;

    return Array.from(result)
        // @ts-ignore
        .filter(item => !item.disabled && item.tabIndex !== -1 && !item.hidden);
};
