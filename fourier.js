function dft(x) {
  let X = [];
  const N = x.length;
  for (let k = 0; k < N; k++) {
    let re = 0;
    let im = 0;
    for (let n = 0; n < N; n++) {
      const phi = TWO_PI * k * n / N;
      re += x[n] * cos(phi);
      im -= x[n] * sin(phi);
    }

    re /= N;
    im /= N;

    const amp = sqrt(re*re + im*im);
    const phase = atan2(im, re);
    const freq = k;

    X[k] = {re: re, im: im, amp: amp, freq: freq, phase: phase};
  }
  return X;
}
