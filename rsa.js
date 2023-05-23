function encryptRSA() {  
    //Euler függvény értéke
    const phiN = (p - BigInt(1)) * (q - BigInt(1));
    const d = calculateModuloInverse(e, phiN);
    const encryptedMessage = calculateModuloPow(message, e, n);
    const decryptedMessage = calculateModuloPow(encryptedMessage, d, n);
  
    window.alert(`Eredeti üzenet: ${message.toString()}
                \nTitkosított üzenet: ${encryptedMessage.toString()}
                \nVisszafejtett üzenet: ${decryptedMessage.toString()}
                \np és q nagy prímszám modulusza: ${n}
                \nPublikus kulcs: (e, n) = (${e}, ${n})
                \nPrivát kulcs: (d, n) = (${d}, ${n})`)
}
  
// A modulo m hatványozást végző függvény
function calculateModuloPow(baseValue, exponent, modulus) {
    let result = BigInt(1);
    while (exponent > BigInt(0)) {
      if (exponent % BigInt(2) === BigInt(1)) {
        result = (result * baseValue) % modulus;
      }
      baseValue = (baseValue * baseValue) % modulus;
      exponent /= BigInt(2);
    }
    return result;
}
  
// A modulo m inverzét kiszámító függvény (kibővített Euklideszi algoritmus segítségével)
function calculateModuloInverse(a, m) {
    const m0 = m;
    let y = BigInt(0);
    let x = BigInt(1);
  
    if (m === BigInt(1)) {
      return BigInt(0);
    }
  
    while (a > BigInt(1)) {
      const q = a / m;
      let t = m;
  
      m = a % m;
      a = t;
      t = y;
  
      y = x - q * y;
      x = t;
    }
  
    if (x < BigInt(0)) {
      x += m0;
    }
  
    return x;
}

//Felhasználó input
const p = BigInt(window.prompt("p nagy prímszám (pl.: 61):"));
const q = BigInt(window.prompt("q nagy prímszám (pl.: 53):"));
const n = p * q;
const e = BigInt(window.prompt("relatív prím:"));
const message = BigInt(window.prompt("üzenet:"));

encryptRSA(n, e, message);