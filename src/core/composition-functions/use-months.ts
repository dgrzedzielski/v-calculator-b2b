export const useMonths = () => {
    const months = [
        { value: '01', label: 'Styczeń' },
        { value: '02', label: 'Luty' },
        { value: '03', label: 'Marzec' },
        { value: '04', label: 'Kwiecień' },
        { value: '05', label: 'Maj' },
        { value: '06', label: 'Czerwiec' },
        { value: '07', label: 'Lipiec' },
        { value: '08', label: 'Sierpień' },
        { value: '09', label: 'Wrzesień' },
        { value: '10', label: 'Październik' },
        { value: '11', label: 'Listopad' },
        { value: '12', label: 'Grudzień' }
    ];

    const getMonthName = (month: string) => months.find(({ value }) => value === month)?.label;

    return { months, getMonthName };
};
