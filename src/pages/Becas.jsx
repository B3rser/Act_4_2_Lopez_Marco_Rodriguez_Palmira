export function Becas() {
    return (
        <>
            <style>
                {
                    `.cards-row {
                        display: flex;
                        justify-content: center; 
                        align-items: center;    
                        gap: 20px;              
                        flex-wrap: nowrap;       
                        padding: 40px 20px;     
                        overflow-x: auto;        
                        box-sizing: border-box;
                        }
                        .cards-row2 {
                        display: flex;
                        justify-content: start; 
                        align-items: center;     
                        gap: 60px;               
                        flex-wrap: nowrap;       
                        padding: 40px 20px;     
                        overflow-x: auto;        
                        box-sizing: border-box;
                        }
                    `
                }
            </style>

            <div>
                <x-typography component='h1' font-family='Montserrat'>Becas y apoyo económico</x-typography>
                <div>
                    <x-typography component='h2' font-family='Montserrat'>Categorías de becas</x-typography>
                    <div className="cards-row2 ">
                        <x-textcard2
                            icon="credit-card"
                            description="Ayuda económica">

                        </x-textcard2>
                        <x-textcard2
                            icon="pin"
                            description="Movilidad académica">

                        </x-textcard2>

                    </div>
                </div>
                <div>
                    <x-typography component='h2' font-family='Montserrat'>Becas destacadas</x-typography>
                    <div className="cards-row ">
                        <x-textcard
                            label="Verano intercultural"
                            description="Placeholder text"
                            type="card-boton"
                            buttonpriority="button-icon"
                            buttonlabel="Ver más"
                            icon=""
                        ></x-textcard>
                        <x-textcard
                            label="Gatronomía - ER 2025"
                            description="Placeholder text"
                            type="card-boton"
                            buttonpriority="button-icon"
                            buttonlabel="Ver más"
                            icon=""
                        ></x-textcard>
                        <x-textcard
                            label="Máster banca"
                            description="Placeholder text"
                            type="card-boton"
                            buttonpriority="button-icon"
                            buttonlabel="Ver más"
                            icon=""
                        ></x-textcard>
                        <x-textcard
                            label="2025 NAFSA Annua"
                            description="Placeholder text"
                            type="card-boton"
                            buttonpriority="button-icon"
                            buttonlabel="Ver más"
                            icon=""
                        ></x-textcard>
                    </div>
                </div>
            </div>

        </>
    );
}