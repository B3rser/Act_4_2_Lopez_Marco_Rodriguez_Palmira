import React from 'react';

/**
 * @fileoverview Este módulo define el componente React `ExpUni`, que representa
 * la página de exploración de universidades en la aplicación UniNavigator. Permite a los usuarios
 * buscar y filtrar universidades, y muestra los resultados en un formato de tarjeta
 * utilizando el Web Component `x-card`.
 */

/**
 * `ExpUni` (Componente React)
 *
 * Este componente funcional de React renderiza la interfaz de usuario para explorar universidades.
 * Proporciona campos de entrada para buscar por nombre de universidad y un desplegable para filtrar por estado.
 * Los resultados de la búsqueda/filtro se muestran como una cuadrícula de tarjetas (`x-card`),
 * cada una representando una universidad con su imagen, título, contenido asociado y un botón "Ver más".
 *
 * @export
 * @returns {JSX.Element}
 * @example
 * // Este componente se renderizaría típicamente dentro de un enrutador o un contenedor principal.
 * <ExpUni />
 */
export function ExpUni() {
    // Estado para el valor del input de búsqueda de universidad.
    const [universidad, setUniversidad] = React.useState('');

    /**
     * Manejador de cambios para el input de búsqueda de universidad.
     * Actualiza el estado `universidad` con el nuevo valor del input.
     * @param {Event} event - El evento de cambio, puede ser un evento nativo o un CustomEvent de `x-input`.
     */
    const handleInputChange = (event) => {
        setUniversidad(event.detail ? event.detail.value : event.target.value);
    };

    // Estado para el valor seleccionado del dropdown de estado.
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

    // Opciones para el dropdown de estados.
    const options = [
        { value: 'estado_1', label: 'Estado' },
        { value: 'estado_2', label: 'Estado' },
        { value: 'estado_3', label: 'Estado' },
    ];

    return (
        <>
            {/* Estilos CSS internos para el diseño de la página de exploración de universidades. */}
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
                {/* Título principal de la sección de búsqueda de universidades */}
                <x-typography component='h1' font-family='Montserrat'> Buscar Universidades</x-typography>
                <div className='filters'>
                    {/* Componente de input para buscar por nombre de universidad */}
                    <x-input
                        label="Buscar por nombre"
                        placeholder="Nombre de la universidad"
                        value={universidad}
                        onchange={(e) => handleInputChange(e)}
                    ></x-input>

                    {/* Componente de dropdown para filtrar por estado */}
                    <x-dropdown
                        placeholder="Estado"
                        options={options}
                        value={selectedDropdownValue}
                        onchange={handleDropdownChange}
                    ></x-dropdown>
                </div>
                {/* Cuadrícula de tarjetas para mostrar los resultados de las universidades */}
                <div className="cards-grid">
                    {/* Ejemplos de tarjetas de universidad (x-card) */}
                    <x-card
                        type="universidad"
                        image="https://wp.uaslp.mx/noticias/wp-content/uploads/sites/5/2024/04/thumbnail_UASLP-1024x682.jpg"
                        title="UASLP"
                        content="Content"
                        buttonPriority='alternative-card'
                        buttonLabel='Ver más'>
                    </x-card>
                    <x-card
                        type="universidad"
                        image="https://mr.travelbymexico.com/imgBase/2018/02/ipn2-compressor.jpg"
                        title="IPN"
                        content="Content"
                        buttonPriority='alternative-card'
                        buttonLabel='Ver más'>
                    </x-card>
                    <x-card
                        type="universidad"
                        image="https://www.mexicoescultura.com/galerias/espacios/principal/ugto2013ok.jpg"
                        title="UG"
                        content="Content"
                        buttonPriority='alternative-card'
                        buttonLabel='Ver más'>
                    </x-card>
                    <x-card
                        type="universidad"
                        image="https://www.liderempresarial.com/wp-content/uploads/2022/02/UAA2.jpg"
                        title="UAA"
                        content="Content"
                        buttonPriority='alternative-card'
                        buttonLabel='Ver más'>
                    </x-card>
                    <x-card
                        type="universidad"
                        image="https://sic.cultura.gob.mx/images/40508"
                        title="UAZ"
                        content="Content"
                        buttonPriority='alternative-card'
                        buttonLabel='Ver más'>
                    </x-card>
                    <x-card
                        type="universidad"
                        image="https://media.admagazine.com/photos/62d6c4b73ef2f3a790e18e88/master/pass/618279976"
                        title="UNAM"
                        content="Content"
                        buttonPriority='alternative-card'
                        buttonLabel='Ver más'>
                    </x-card>
                </div>
            </div>
        </>
    );
}