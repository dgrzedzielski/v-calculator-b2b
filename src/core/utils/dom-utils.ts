const focusableElements =
    'a[href], area[href], input, select, textarea, button, iframe, object, embed, *[tabindex], *[contenteditable]';

const DomUtils = {
    isClickOutsideElement: (element: Node, event: MouseEvent): boolean => {
        return !(
            element === event.target || element.contains(event.target as Node)
        );
    },
    getFocusableElements: (target: HTMLElement) => {
        const result = target.querySelectorAll(focusableElements) as NodeListOf<
            HTMLElement
        >;

        return Array.from(result).filter(
            (item) =>
                // @ts-ignore
                !item.disabled && item.tabIndex !== -1 && !item.hidden
        );
    },
};

export default DomUtils;
