import React from 'react';

/**
 * @fileoverview Este módulo define el componente React `ExpCarr`, que representa
 * la página de exploración de carreras en la aplicación UniNavigator. Permite a los usuarios
 * buscar y filtrar carreras universitarias, y muestra los resultados en un formato de tarjeta
 * utilizando el Web Component `x-card`.
 */

/**
 * `ExpCarr` (Componente React)
 *
 * Este componente funcional de React renderiza la interfaz de usuario para explorar carreras.
 * Proporciona campos de entrada para buscar por nombre de carrera y un desplegable para filtrar por área.
 * Los resultados de la búsqueda/filtro se muestran como una cuadrícula de tarjetas (`x-card`),
 * cada una representando una carrera con su imagen, título, universidad asociada y un botón "Ver más".
 *
 * @export
 * @returns {JSX.Element}
 * @example
 * // Este componente se renderizaría típicamente dentro de un enrutador o un contenedor principal.
 * <ExpCarr />
 */
export function ExpCarr() {
    // Estado para el valor del input de búsqueda de carrera.
    const [carrera, setCarrera] = React.useState('');

    /**
     * Manejador de cambios para el input de búsqueda de carrera.
     * Actualiza el estado `carrera` con el nuevo valor del input.
     * @param {Event} event - El evento de cambio, puede ser un evento nativo o un CustomEvent de `x-input`.
     */
    const handleInputChange = (event) => {
        setCarrera(event.detail ? event.detail.value : event.target.value);
    };

    // Estado para el valor seleccionado del dropdown de área.
    const [selectedDropdownValue, setSelectedDropdownValue] = React.useState('');

    /**
     * Manejador de cambios para el componente `x-dropdown`.
     * Registra el valor y la etiqueta seleccionados en la consola y actualiza el estado `selectedDropdownValue`.
     * @param {CustomEvent} event - El evento personalizado de cambio despachado por `x-dropdown`.
     */
    const handleDropdownChange = (event) => {
        console.log(event)
        const newValue = event.detail.value;
        const newLabel = event.detail.label;
        console.log('Dropdown selected:', newValue, newLabel);
        setSelectedDropdownValue(newValue);
    };

    // Opciones para el dropdown de áreas.
    const options = [
        { value: 'estado_1', label: 'Área' },
        { value: 'estado_2', label: 'Área' },
        { value: 'estado_3', label: 'Área' },
    ];

    return (
        <>
            {/* Estilos CSS internos para el diseño de la página de exploración de carreras. */}
            <style>
                {
                    `.cards-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 60px;
                        justify-items: center;
                        align-items: center;
                        padding: 40px;
                        width: 100%;
                        box-sizing: border-box;
                    }

                    .filters{
                        display: flex;
                        flex-direction: row;
                        align-items: flex-end;
                        gap: 20px;
                        padding: 20px 40px;
                    }
                    `
                }
            </style>
            <div>
                {/* Título principal de la sección de búsqueda de carreras */}
                <x-typography component='h1' font-family='Montserrat'>Buscar Carreras</x-typography>
                <div className='filters'>
                    {/* Componente de input para buscar por nombre de carrera */}
                    <x-input
                        label="Buscar por nombre"
                        placeholder="Nombre de la universidad"
                        value={carrera}
                        onchange={(e) => handleInputChange(e)}
                    ></x-input>

                    {/* Componente de dropdown para filtrar por área */}
                    <x-dropdown
                        placeholder="Área"
                        options={options}
                        value={selectedDropdownValue}
                        onchange={handleDropdownChange}
                    ></x-dropdown>
                </div>
                {/* Cuadrícula de tarjetas para mostrar los resultados de las carreras */}
                <div className="cards-grid">
                    {/* Ejemplos de tarjetas de carrera (x-card) */}
                    <x-card
                        type="carrera"
                        image="https://blog.ucq.edu.mx/hubfs/iStock-832282452.jpg"
                        title="Ingeniería en Sistemas"
                        content="UASLP"
                        buttonPriority='alternative-card'
                        buttonLabel='Ver más'>
                    </x-card>
                    <x-card
                        type="carrera"
                        image="https://merida.anahuac.mx/hs-fs/hubfs/Canva%20images/ingenieria-mecatronica-que-hace-que-es.png?width=700&height=394&name=ingenieria-mecatronica-que-hace-que-es.png"
                        title="Ingeniería mecatrónica"
                        content="UASLP"
                        buttonPriority='alternative-card'
                        buttonLabel='Ver más'>
                    </x-card>
                    <x-card
                        type="carrera"
                        image="https://web.flavisur.edu.pe/wp-content/uploads/2023/02/mecanica-automotriz-1024x677.jpg"
                        title="Ingeniería mecánica"
                        content="UG"
                        buttonPriority='alternative-card'
                        buttonLabel='Ver más'>
                    </x-card>
                    <x-card
                        type="carrera"
                        image="https://cdn.ufidelitas.ac.cr/wp-content/uploads/2025/04/16122548/La-ingenieria-electricablog.jpg"
                        title="Ingeniería eléctrica"
                        content="ITN"
                        buttonPriority='alternative-card'
                        buttonLabel='Ver más'>
                    </x-card>
                    <x-card
                        type="carrera"
                        image="https://cms.areandina.edu.co/sites/default/files/styles/large/public/2022-08/ingenieria-biomedica.jpg?itok=BskUlWcH"
                        content="UNAM"
                        buttonPriority='alternative-card'
                        buttonLabel='Ver más'>
                    </x-card>
                    <x-card
                        type="carrera"
                        image="https://cipcajamarca.org.pe/wp-content/uploads/2024/01/hidraulico2.jpg"
                        title="Ingeniería hidráulica"
                        content="UAA"
                        buttonPriority='alternative-card'
                        buttonLabel='Ver más'>
                    </x-card>
                </div>
            </div>
        </>
    );
}