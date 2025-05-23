import React from 'react';

export function ExpUni() {
    const [universidad, setUniversidad] = React.useState('');

    const handleInputChange = (event) => {
        setUniversidad(event.detail ? event.detail.value : event.target.value);
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
        { value: 'estado_1', label: 'Estado' },
        { value: 'estado_2', label: 'Estado' },
        { value: 'estado_3', label: 'Estado' },
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
                <x-typography component='h1' font-family='Montserrat'> Buscar Universidades</x-typography>
                <div className='filters'>
                    <x-input
                        label="Buscar por nombre"
                        placeholder="Nombre de la universidad"
                        value={universidad}
                        onchange={(e) => handleInputChange(e)}
                    ></x-input>

                    <x-dropdown
                        placeholder="Estado"
                        options={options}
                        value={selectedDropdownValue}
                        onchange={handleDropdownChange}
                    ></x-dropdown>
                </div>
                <div className="cards-grid">
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