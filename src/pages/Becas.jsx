import React from 'react'

/**
 * @fileoverview Este módulo define el componente React `Becas`, que representa
 * la página o sección de becas y apoyo económico de la aplicación UniNavigator.
 * Este componente organiza la presentación de diferentes categorías de becas y becas destacadas,
 * utilizando otros Web Components como `x-typography`, `x-textcard`, y `x-textcard2`
 * para estructurar el contenido de manera visualmente atractiva.
 */

/**
 * `Becas` (Componente React)
 *
 * Este componente funcional de React renderiza la interfaz de usuario para la sección
 * de "Becas y apoyo económico". Incluye un título principal, secciones para "Categorías de becas"
 * y "Becas destacadas", las cuales muestran tarjetas interactivas. Define estilos CSS internos
 * para la disposición de estas secciones y el comportamiento de las tarjetas.
 *
 * @export
 * @returns {JSX.Element}
 */
export function Becas() {
  return (
    <>
      {/* Estilos CSS internos para el diseño general de la página de becas. */}
      <style>
        {`
          .main-container {
            max-width: 100%;
            padding: 40px 20px;
            box-sizing: border-box;
          }

          .section-title {
            margin-bottom: 20px;
          }

          .cards-row,
          .cards-row2 {
            margin-top:60px;
            margin-bottom: 100px;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 20px;
            flex-wrap: nowrap;}
            margin-bottom: 40px;
            box-sizing: border-box;
          }

          /* Estilos para la barra de desplazamiento en .cards-row para navegadores WebKit (Chrome, Safari) */
          .cards-row::-webkit-scrollbar {
            height: 6px;
          }

          .cards-row::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 4px;
          }
        `}
      </style>

      <div className="main-container">
        {/* Título principal de la sección de Becas y apoyo económico */}
        <x-typography component="h1" font-family="Montserrat" class="section-title">
          Becas y apoyo económico
        </x-typography>

        <div>
          {/* Subtítulo para la sección de Categorías de becas */}
          <x-typography component="h2" font-family="Montserrat" class="section-title">
            Categorías de becas
          </x-typography>
          {/* Fila de tarjetas para categorías de becas, utilizando x-textcard2 */}
          <div className="cards-row2">
            <x-textcard2 icon="credit-card" description="Ayuda económica" />
            <x-textcard2 icon="pin" description="Movilidad académica" />
          </div>
        </div>

        <div>
          {/* Subtítulo para la sección de Becas destacadas */}
          <x-typography component="h2" font-family="Montserrat" class="section-title">
            Becas destacadas
          </x-typography>
          {/* Fila de tarjetas para becas destacadas, utilizando x-textcard */}
          <div className="cards-row">
            <x-textcard
              label="Verano intercultural"
              description="Placeholder text"
              type="card-boton"
              buttonpriority="button-icon"
              buttonlabel="Ver más"
            />
            <x-textcard
              label="Gastronomía - ER 2025"
              description="Placeholder text"
              type="card-boton"
              buttonpriority="button-icon"
              buttonlabel="Ver más"
            />
            <x-textcard
              label="Máster banca"
              description="Placeholder text"
              type="card-boton"
              buttonpriority="button-icon"
              buttonlabel="Ver más"
            />
            <x-textcard
              label="2025 NAFSA Annual"
              description="Placeholder text"
              type="card-boton"
              buttonpriority="button-icon"
              buttonlabel="Ver más"
            />
          </div>
        </div>
      </div>
    </>
  );
}
