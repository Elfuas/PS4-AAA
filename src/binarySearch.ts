export interface Paso {
  iteracion: number;
  low: number;
  mid: number;
  high: number;
  valorMedio: number;
  resultado: 'menor' | 'mayor' | 'encontrado';
}

export interface Resultado {
  indice: number; // -1 si no se encontró
  pasos: Paso[];
  comparaciones: number;
  tiempoMs: number;
}

/** Búsqueda binaria iterativa. El arreglo DEBE estar ordenado. */
export function busquedaBinaria(arr: number[], objetivo: number): Resultado {
  const inicio = performance.now();
  const pasos: Paso[] = [];
  let low = 0;
  let high = arr.length - 1;
  let indice = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const valorMedio = arr[mid];
    const iteracion = pasos.length + 1;

    if (valorMedio === objetivo) {
      pasos.push({ iteracion, low, mid, high, valorMedio, resultado: 'encontrado' });
      indice = mid;
      break;
    } else if (valorMedio < objetivo) {
      pasos.push({ iteracion, low, mid, high, valorMedio, resultado: 'menor' });
      low = mid + 1;
    } else {
      pasos.push({ iteracion, low, mid, high, valorMedio, resultado: 'mayor' });
      high = mid - 1;
    }
  }

  return {
    indice,
    pasos,
    comparaciones: pasos.length,
    tiempoMs: performance.now() - inicio,
  };
}

/** Peor caso teórico: T(n) = floor(log2(n)) + 1 comparaciones. */
export function peorCaso(n: number): number {
  return n <= 0 ? 0 : Math.floor(Math.log2(n)) + 1;
}
