import React from 'react'

/**
 * Description placeholder
 *
 * @export
 * @returns {*} 
 */
export function Asesorias() {
    return (
        <>
            <style>
                {
                    `.cards-row {
                        display: flex;
                        justify-content: flex-start; 
                        align-items: center;     
                        gap: 20px;               
                        flex-wrap: nowrap;       
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
                <x-typography component="h1" font-family="Montserrat" > Asesoría y orientación vocacional </x-typography>

                <img src='assets/asesorias.png' className='image' style={{
                    width: 1300,
                    height: 745
                }} />

                <div>
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
                            label="Test  laboral"
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
