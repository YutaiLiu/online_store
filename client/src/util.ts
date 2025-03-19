// if amount is null or undefined, "amount ?? 0" will set it as 0
// ?? is called the nullish coalescing operator
// btw
// || is called the logical OR operator, it also treats falsy values like 0, '' and false
// you can use it like this: var x = y || z;
// if y is falsy, x will be z
// if y is truthy, x will be y
// ?? is similar to ||, but it only treats null and undefined as falsy
export function currencyFormat(amount: number): string {
    return `$${((amount ?? 0) / 100).toFixed(2)}`;
}