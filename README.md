# Búsqueda Binaria – T(n) y Big O

Aplicación hecha con Expo (React Native + TypeScript) que implementa búsqueda binaria,
muestra cada paso y calcula su complejidad.

## Ejecutar
```bash
npm install
npx expo start --web
```

## Análisis
- Recurrencia: T(n) = T(n/2) + c, T(1) = c
- Solución: T(n) = c·log2(n) + c
- Peor caso: floor(log2 n) + 1 comparaciones -> **O(log n)**
- Mejor caso: O(1) | Espacio (iterativa): O(1)
