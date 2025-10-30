export type NivelCalidad = number

// Definición de todas las características posibles
interface CaracteristicasScooter {
    [key: string]: { label: string; value: string; nivel: NivelCalidad } | null;
}

export interface ScooterProduct {
    nombre: string;
    fotos: string[];
    precio: string;
    caracteristicas: CaracteristicasScooter;
}
