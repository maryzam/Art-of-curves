
function calcGcd(first, second) {
    return second ? calcGcd(second, first % second) : first;
}

export function getRoseCoefficients(n = 1, d = 1) {
    if (typeof (n) != "number" || typeof (d) != "number" || n < 1 || d < 1) {
        throw Error("Invalid arguments. All arguments should be positive numbers");
    }
    const coeffs = [];
    for (let p = Math.floor(n); p > 0; p--) {
        for (let q = Math.floor(d); q > 0; q--) {
            const gcd = calcGcd(p, q);
            if (gcd !== 1) { continue; }
            coeffs.push({ p : p, q : q, k : (p / q) });
        }
    }
    coeffs.sort((a, b) => { return a.k - b.k; });
    return coeffs;
}
