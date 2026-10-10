import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { busquedaBinaria, peorCaso, Resultado } from './src/binarySearch';

const TAMANOS = [10, 100, 1_000, 1_000_000, 1_000_000_000];

export default function App() {
  const [entrada, setEntrada] = useState('42, 7, 19, 3, 88, 56, 21, 64, 11, 30');
  const [objetivo, setObjetivo] = useState('56');
  const [orden, setOrden] = useState<number[]>([]);
  const [res, setRes] = useState<Resultado | null>(null);
  const [error, setError] = useState('');

  const ejecutar = () => {
    const nums = entrada.split(',').map(s => s.trim()).filter(Boolean).map(Number);
    const obj = Number(objetivo);
    if (nums.length === 0 || nums.some(isNaN) || objetivo.trim() === '' || isNaN(obj)) {
      setError('Ingresa números válidos separados por coma y un objetivo numérico.');
      setRes(null);
      return;
    }
    setError('');
    const ordenado = [...nums].sort((a, b) => a - b);
    setOrden(ordenado);
    setRes(busquedaBinaria(ordenado, obj));
  };

  const n = orden.length;

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.container}>
        <Text style={s.titulo}>Búsqueda Binaria</Text>
        <Text style={s.sub}>Cálculo de T(n) y Big O</Text>

        <Text style={s.label}>Números (separados por coma)</Text>
        <TextInput style={s.input} value={entrada} onChangeText={setEntrada} />
        <Text style={s.label}>Valor a buscar</Text>
        <TextInput style={s.input} value={objetivo} onChangeText={setObjetivo} keyboardType="numeric" />

        <Pressable style={s.boton} onPress={ejecutar}>
          <Text style={s.botonTxt}>Buscar</Text>
        </Pressable>
        {error ? <Text style={s.error}>{error}</Text> : null}

        {res && (
          <View style={s.card}>
            <Text style={s.h2}>Resultado</Text>
            <Text>Arreglo ordenado: [{orden.join(', ')}]</Text>
            <Text style={s.bold}>
              {res.indice >= 0 ? `Encontrado en el índice ${res.indice}` : 'No encontrado'}
            </Text>

            <Text style={s.h2}>Pasos</Text>
            {res.pasos.map(p => (
              <Text key={p.iteracion} style={s.mono}>
                #{p.iteracion} low={p.low} mid={p.mid} high={p.high} → arr[mid]={p.valorMedio} ({p.resultado})
              </Text>
            ))}

            <Text style={s.h2}>Análisis de complejidad</Text>
            <Text>n = {n}</Text>
            <Text>Comparaciones reales T(n) = {res.comparaciones}</Text>
            <Text>Peor caso teórico = ⌊log₂({n})⌋ + 1 = {peorCaso(n)}</Text>
            <Text>Tiempo medido: {res.tiempoMs.toFixed(4)} ms</Text>
            <Text style={s.mono}>
              Recurrencia: T(n) = T(n/2) + c, T(1) = c{'\n'}
              Solución:    T(n) = c·log₂(n) + c{'\n'}
              Big O:       O(log n)   (mejor caso: O(1))   Espacio: O(1)
            </Text>
          </View>
        )}

        <View style={s.card}>
          <Text style={s.h2}>Crecimiento: búsqueda binaria vs lineal</Text>
          {TAMANOS.map(t => (
            <Text key={t} style={s.mono}>
              n = {t.toLocaleString()} → binaria: {peorCaso(t)} | lineal: {t.toLocaleString()}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f4f6fa' },
  container: { padding: 20, maxWidth: 800, width: '100%', alignSelf: 'center' },
  titulo: { fontSize: 28, fontWeight: '700' },
  sub: { color: '#555', marginBottom: 16 },
  label: { marginTop: 10, marginBottom: 4, fontWeight: '600' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccd', borderRadius: 8, padding: 10 },
  boton: { backgroundColor: '#2d5be3', padding: 12, borderRadius: 8, marginTop: 16, alignItems: 'center' },
  botonTxt: { color: '#fff', fontWeight: '700' },
  error: { color: '#c00', marginTop: 8 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 16, marginTop: 16 },
  h2: { fontSize: 18, fontWeight: '700', marginTop: 10, marginBottom: 6 },
  bold: { fontWeight: '700', marginTop: 4 },
  mono: { fontFamily: 'monospace', marginTop: 2 },
});
