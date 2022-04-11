const NumberUtils = {
    as2Decimals: (val: number): number => parseFloat(val.toFixed(2)),

    as2Digits: (val: number): string => ('0' + val).slice(-2),
};

export default NumberUtils;
