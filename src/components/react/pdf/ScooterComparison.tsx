import { useState } from 'react';

// Nivel de calidad: 1 (bajo) a 5 (alto)
type NivelCalidad =  number;

// Definición de todas las características posibles
interface CaracteristicasScooter {
  [key: string]: { label: string; value: string; nivel: NivelCalidad } | null;
}

interface Scooter {
  nombre: string;
  precio: string;
  caracteristicas: CaracteristicasScooter;
  fotos?: string[];
}

interface ScooterComparisonProps {
  scooters: Scooter[];
}

// Definir el orden y nombres de las características
type CaracteristicaKey = string;

// Función para obtener todas las características disponibles
const getAllCaracteristicas = (scooters: Scooter[]): CaracteristicaKey[] => {
  const allKeys = new Set<CaracteristicaKey>();
  scooters.forEach(scooter => {
    Object.keys(scooter.caracteristicas).forEach(key => {
      if (scooter.caracteristicas[key] !== null) {
        allKeys.add(key);
      }
    });
  });
  return Array.from(allKeys).sort(); // Ordenar alfabéticamente
};

// Componente para mostrar el indicador de mejor opción
const MejorIndicador = ({ isBetter }: { isBetter: boolean }) => {
  if (!isBetter) return null;

  return (
    <div className="flex justify-center mt-1">
      <div className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
        ✓
      </div>
    </div>
  );
};

export const ScooterComparison = ({ scooters }: ScooterComparisonProps) => {
  const [selectedScooter1, setSelectedScooter1] = useState<number>(0);
  const [selectedScooter2, setSelectedScooter2] = useState<number>(1);

  const scooter1 = scooters[selectedScooter1];
  const scooter2 = scooters[selectedScooter2];

  const getCaracteristicaValue = (scooter: Scooter, key: CaracteristicaKey): string => {
    return scooter.caracteristicas[key]?.value || '-';
  };

  const getCaracteristicaNivel = (scooter: Scooter, key: CaracteristicaKey): NivelCalidad | null => {
    const nivel = scooter.caracteristicas[key]?.nivel;
    // Si el nivel es 0, se considera que no tiene la característica
    return nivel === 0 ? null : nivel || null;
  };

  const getCaracteristicaLabel = (scooter: Scooter, key: CaracteristicaKey, defaultLabel: string): string => {
    return scooter.caracteristicas[key]?.label || defaultLabel;
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-5">
      <h2 className="text-3xl font-bold text-interbrasGreen-500 mb-6 text-center">
        COMPARADOR DE SCOOTERS
      </h2>

      {/* Leyenda de comparación */}
      <div className="bg-gradient-to-r from-interbrasGreen-50 to-green-50 rounded-xl p-4 mb-6 border border-interbrasGreen-200">
        <div className="flex items-center justify-center gap-4">
          <span className="text-sm font-medium text-gray-700">Indicador de mejor opción:</span>
          <div className="flex items-center gap-2">
            <div className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              ✓
            </div>
            <span className="text-xs text-gray-600">Producto superior en esta característica</span>
          </div>
        </div>
      </div>

      {/* Selectores */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Scooter 1
          </label>
          <select
            value={selectedScooter1}
            onChange={(e) => setSelectedScooter1(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-interbrasGreen-500 focus:border-transparent"
          >
            {scooters.map((scooter, index) => (
              <option key={index} value={index} disabled={index === selectedScooter2}>
                {scooter.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Scooter 2
          </label>
          <select
            value={selectedScooter2}
            onChange={(e) => setSelectedScooter2(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-interbrasGreen-500 focus:border-transparent"
          >
            {scooters.map((scooter, index) => (
              <option key={index} value={index} disabled={index === selectedScooter1}>
                {scooter.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla comparativa */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
        <div className="grid grid-cols-3 bg-interbrasGreen-500 text-white">
          <div className="p-4 font-semibold border-r border-white/20">
            CARACTERÍSTICA
          </div>
          <div className="p-4 text-center font-semibold border-r border-white/20">
            {scooter1.nombre}
          </div>
          <div className="p-4 text-center font-semibold">
            {scooter2.nombre}
          </div>
        </div>

        {/* Fotos */}
        <div className="grid grid-cols-3 border-b border-gray-200 bg-gray-50">
          <div className="p-4 font-medium text-interbrasGreen-500">
            FOTO
          </div>
          <div className="p-4 flex justify-center items-center bg-white">
            {scooter1.fotos && scooter1.fotos.length > 0 ? (
              <img 
                src={scooter1.fotos[0]} 
                alt={scooter1.nombre}
                className="h-32 object-contain"
              />
            ) : (
              <div className="h-32 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                </svg>
              </div>
            )}
          </div>
          <div className="p-4 flex justify-center items-center bg-white">
            {scooter2.fotos && scooter2.fotos.length > 0 ? (
              <img 
                src={scooter2.fotos[0]} 
                alt={scooter2.nombre}
                className="h-32 object-contain"
              />
            ) : (
              <div className="h-32 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Precio */}
        <div className="grid grid-cols-3 border-b border-gray-200">
          <div className="p-4 bg-gray-50 font-medium text-interbrasGreen-500">
            PRECIO
          </div>
          <div className="p-4 text-center bg-white font-bold text-interbrasGreen-500">
            {scooter1.precio ? `$${scooter1.precio}` : '-'}
          </div>
          <div className="p-4 text-center bg-white font-bold text-interbrasGreen-500">
            {scooter2.precio ? `$${scooter2.precio}` : '-'}
          </div>
        </div>

        {/* Características */}
        {getAllCaracteristicas(scooters).map((key, index) => {
          const value1 = getCaracteristicaValue(scooter1, key);
          const value2 = getCaracteristicaValue(scooter2, key);
          const nivel1 = getCaracteristicaNivel(scooter1, key);
          const nivel2 = getCaracteristicaNivel(scooter2, key);
          const label = getCaracteristicaLabel(scooter1, key, key); // Usar la key como defaultLabel
          const isDifferent = value1 !== value2;
          
          // Mostrar solo si al menos uno de los scooters tiene esta característica
          const hasValue = value1 !== '-' || value2 !== '-';
          
          if (!hasValue) return null;

          // Determinar cuál tiene mejor nivel
          const isBetter1 = nivel1 !== null && (nivel2 === null || nivel1 > nivel2);
          const isBetter2 = nivel2 !== null && (nivel1 === null || nivel2 > nivel1);

          return (
            <div 
              key={key} 
              className={`grid grid-cols-3 border-b border-gray-200 ${
                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
              }`}
            >
              <div className="p-4 text-interbrasGreen-500 font-medium">
                {label}
              </div>
              <div className={`p-4 flex justify-center items-center gap-2 text-center ${isDifferent ? 'font-semibold' : ''} ${isBetter1 ? 'bg-green-50 border-l-4 border-green-500' : ''}`}>
                <div>{value1}</div>
                <MejorIndicador isBetter={isBetter1} />
              </div>
              <div className={`p-4 flex justify-center items-center gap-2 text-center ${isDifferent ? 'font-semibold' : ''} ${isBetter2 ? 'bg-green-50 border-l-4 border-green-500' : ''}`}>
                <div>{value2}</div>
                <MejorIndicador isBetter={isBetter2} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
