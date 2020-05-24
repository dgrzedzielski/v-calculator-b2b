class NumberUtils {
    static as2Decimals = (val: number): number => parseFloat(val.toFixed(2));

    static as2Digits = (val: number): string => ('0' + val).slice(-2);
}

export default NumberUtils;
