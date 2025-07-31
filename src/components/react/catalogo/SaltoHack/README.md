# SaltoHack - Versión Minimalista Hacker del Catálogo

## Descripción
SaltoHack es una versión especial del catálogo de Interbras con una estética hacker minimalista y moderna, utilizando tonos lilas y púrpuras para crear una interfaz limpia y tecnológica.

## Características Principales

### Diseño Minimalista Hacker
- **Colores**: Paleta monocromática en tonos lilas, púrpuras y violetas
- **Estética**: Interfaz limpia inspirada en terminales modernos con elementos como:
  - Texto tipo terminal sutil en el fondo
  - Gradientes suaves y bordes definidos
  - Tipografía monoespaciada (font-mono)
  - Sintaxis técnica minimalista (`>`, `$`, `//`, etc.)

### Elementos Visuales Limpios
- **Fondo de código**: Snippets minimalistas de terminal y comandos
- **Diseño sobrio**: Sin elementos decorativos excesivos
- **Efectos sutiles**: Gradientes suaves, bordes definidos sin sombras excesivas
- **Iconografía**: Iconos simples con efectos de iluminación minimalista

### Componentes Creados
1. **CategorySection.tsx**: Sección principal con temática hacker minimalista
2. **list.tsx**: Lista de productos con diseño limpio y técnico
3. **icons.tsx**: Iconos reutilizados de V2_2

### Integración
La versión SaltoHack se integra seamlessly con el sistema de versiones existente:
- Se agrega a `ALL_VERSIONS` en el store
- Se incluye en el selector de versiones del CatalogoSection principal
- Mantiene toda la funcionalidad del catálogo original

## Filosofía de Diseño
**Minimalismo Técnico**
- Interfaz limpia sin elementos decorativos excesivos
- Enfoque en la funcionalidad y legibilidad
- Estética profesional y moderna
- Colores consistentes y armoniosos

## Uso
Para usar esta versión, simplemente selecciona "SaltoHack" en el selector de versiones del catálogo.

## Paleta de Colores
- **Primarios**: purple-600, purple-700, purple-800, purple-900
- **Secundarios**: violet-700, violet-800
- **Acentos**: cyan-300, cyan-400, green-400
- **Fondo**: gray-800, gray-900
- **Texto**: white, purple-200

## Tipografía
- **Principal**: font-mono (monoespaciada)
- **Tamaños**: Jerarquía clara con tamaños moderados
- **Peso**: Medium y normal, evitando bold excesivo

## Elementos Técnicos
- **Comandos**: `$ init --catalog`, `> loading products...`, `[STATUS: ACTIVE]`
- **Comentarios**: `// catalog.render()`, `// version: timestamp`
- **Sintaxis**: Uso de corchetes `[]` y símbolos técnicos `>`

Este diseño representa una evolución hacia un estilo más profesional y minimalista, manteniendo la esencia hacker pero con un enfoque más limpio y sofisticado.
