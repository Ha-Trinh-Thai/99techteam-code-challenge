export function sum_to_n_a(n: number): number {
  if (n === 0) return 0;
  if (n < 0) return -sum_to_n_a(-n);
  return (n * (n + 1)) / 2;
}

export function sum_to_n_b(n: number): number {
  if (n === 0) return 0;

  let sum: number = 0;
  const isNegative: boolean = n < 0;
  const absN: number = Math.abs(n);

  for (let i = 1; i <= absN; i++) {
    sum += i;
  }

  return isNegative ? -sum : sum;
}

export function sum_to_n_c(n: number): number {
  if (n === 0) return 0;
  if (n < 0) return -sum_to_n_c(-n);
  if (n === 1) return 1;
  return n + sum_to_n_c(n - 1);
}
