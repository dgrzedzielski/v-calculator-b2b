export const isClickOutsideElement = (element: Node, event: MouseEvent): boolean => {
    return !(element === event.target || element.contains(event.target as Node));
};
