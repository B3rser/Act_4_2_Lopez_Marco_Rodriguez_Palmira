export function Becas() {
    return (
        <>
            <style>
                {
                    `.cards-row {
                        display: flex;
                        justify-content: center; /* Centra horizontalmente todas las cards */
                        align-items: center;     /* Centra verticalmente (si es necesario) */
                        gap: 20px;               /* Espacio entre las cards */
                        flex-wrap: nowrap;       /* Evita que se vayan a otra línea */
                        padding: 40px 20px;      /* Espaciado interior opcional */
                        overflow-x: auto;        /* Opcional: para que no haya scroll horizontal si no cabe */
                        box-sizing: border-box;
                        }
                        .cards-row2 {
                        display: flex;
                        justify-content: start; /* Centra horizontalmente todas las cards */
                        align-items: center;     /* Centra verticalmente (si es necesario) */
                        gap: 60px;               /* Espacio entre las cards */
                        flex-wrap: nowrap;       /* Evita que se vayan a otra línea */
                        padding: 40px 20px;      /* Espaciado interior opcional */
                        overflow-x: auto;        /* Opcional: para que no haya scroll horizontal si no cabe */
                        box-sizing: border-box;
                        }
                    `

                }
            </style>

            <div>
                <h3> Becas y apoyo económico </h3>
                <div>
                    <h4>
                        Categorías de becas
                    </h4>
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
                    <h4>
                        Becas destacadas
                    </h4>
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