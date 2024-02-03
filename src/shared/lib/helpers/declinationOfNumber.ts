export function declinationOfNumber(value: number, text: string[]) {
    value = Math.abs(value) % 100;
    const n1 = value % 10;
    if (value > 10 && value < 20) {
        return text[2];
    }
    if (n1 > 1 && n1 < 5) {
        return text[1];
    }
    if (n1 === 1) {
        return text[0];
    }
    return text[2];
}
