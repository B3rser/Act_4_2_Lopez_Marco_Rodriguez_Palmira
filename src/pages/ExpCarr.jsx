import React from 'react';

export function ExpCarr() {
    const [carrera, setCarrera] = React.useState('');

    const handleInputChange = (event) => {
        setCarrera(event.detail ? event.detail.value : event.target.value);
    };

    const [selectedDropdownValue, setSelectedDropdownValue] = React.useState('');

    const handleDropdownChange = (event) => {
        console.log(event)
        const newValue = event.detail.value;
        const newLabel = event.detail.label;
        console.log('Dropdown selected:', newValue, newLabel);
        setSelectedDropdownValue(newValue);
    };

    const options = [
        { value: 'estado_1', label: 'Área' },
        { value: 'estado_2', label: 'Área' },
        { value: 'estado_3', label: 'Área' },
    ];

    return (
        <>
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
                    }

                    `
                }

        </style>
        <div>
            
            <x-typography component='h1' font-family='Montserrat'>Buscar Carreras</x-typography>
            <div className="cards-grid">
                <x-card
                        type="carrera"
                        image="https://blog.ucq.edu.mx/hubfs/iStock-832282452.jpg"
                        title="Ingenería en Sistemas"
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