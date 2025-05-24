import React from 'react'

/**
 * @fileoverview Este módulo define el componente React `Asesorias`, que representa
 * la página de asesoría y orientación vocacional de la aplicación UniNavigator.
 * Este componente orquesta la presentación de contenido informativo, imágenes y
 * varias tarjetas interactivas que utilizan otros Web Components para ofrecer
 * funcionalidades relacionadas con la asesoría.
 */

/**
 * `Asesorias` (Componente React)
 *
 * Este componente funcional de React renderiza la interfaz de usuario para la sección
 * de asesoría vocacional. Incluye un título principal, una imagen ilustrativa,
 * y secciones con tarjetas (`x-textcard`) para contactar asesores y realizar tests
 * de orientación vocacional. Define estilos CSS internos para la disposición de las tarjetas.
 *
 * @export
 * @returns {JSX.Element}
 * @example
 * // Este componente se renderizaría típicamente dentro de un enrutador o un contenedor principal.
 * <Asesorias />
 */
export function Asesorias() {
    return (
        <>
            {/* Estilos CSS internos para la disposición de las tarjetas y el contenido. */}
            <style>
                {
                    `.cards-row {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        gap: 20px;
                        flex-wrap: nowrap; /* Evita que las tarjetas se envuelvan a la siguiente línea */
                        padding: 40px 20px;
                        overflow-x: auto;
                        box-sizing: border-box;
                    }

                    .content{
                        padding: 35px 60px;
                        align-items: 'center';
                        justify-content: center;
                    }
                    `

                }
            </style>

            <div className='content'>
                {/* Título principal de la sección */}
                <x-typography component="h1" font-family="Montserrat" > Asesoría y orientación vocacional </x-typography>

                {/* Imagen ilustrativa de la sección */}
                <img src='assets/asesorias.png' className='image' style={{
                    width: 1300,
                    height: 745
                }} />

                <div>
                    {/* Subtítulo para la sección de contacto con asesores */}
                    <x-typography component="h2" font-family="Montserrat" >
                        Contacta con nuestros asesores
                    </x-typography>
                    <div className="cards-row">
                        <x-textcard
                            label="Orientación vocacional"
                            type="defautl"
                            buttonpriority="primary"
                            icon="chat"
                        ></x-textcard>
                        <x-textcard
                            label="Profesores"
                            type="defautl"
                            buttonpriority="primary"
                            icon="edit"
                        ></x-textcard>

                    </div>
                </div>
                <div>
                    {/* Subtítulo para la sección de test de orientación vocacional */}
                    <x-typography component="h2" font-family="Montserrat" >
                        Test de orientación vocacional
                    </x-typography>
                    <div className="cards-row">
                        <x-textcard
                            label="Test general"
                            description="Este test presenta una serie de preguntas sobre ti, para poder ir armando un camino sobre tu posible futuro académico."
                            type="card-boton"
                            buttonpriority="primary"
                            buttonlabel="Tomar test"
                            icon="bar-chart"
                        ></x-textcard>
                        <x-textcard
                            label="Test laboral"
                            description="Este test presenta una serie de preguntas sobre ti, para poder ir armando un camino sobre tu posible futuro académico."
                            type="card-boton"
                            buttonpriority="primary"
                            buttonlabel="Tomar test"
                            icon="map"
                        ></x-textcard>
                        <x-textcard
                            label="Test de personalidad"
                            description="Este test presenta una serie de preguntas sobre ti, para poder ir armando un camino sobre tu posible futuro académico."
                            type="card-boton"
                            buttonpriority="primary"
                            buttonlabel="Tomar test"
                            icon="map"
                        ></x-textcard>
                    </div>
                </div>
            </div>

        </>
    );
}
