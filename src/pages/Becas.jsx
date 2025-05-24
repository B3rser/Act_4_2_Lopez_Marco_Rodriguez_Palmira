/**
 * Description placeholder
 *
 * @export
 * @returns {*} 
 */
export function Becas() {
  return (
    <>
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
            flex-wrap: nowrap;       
                  
            margin-bottom: 40px;
            box-sizing: border-box;
          }

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
        <x-typography component="h1" font-family="Montserrat" class="section-title">
          Becas y apoyo económico
        </x-typography>

        <div>
          <x-typography component="h2" font-family="Montserrat" class="section-title">
            Categorías de becas
          </x-typography>
          <div className="cards-row2">
            <x-textcard2 icon="credit-card" description="Ayuda económica" />
            <x-textcard2 icon="pin" description="Movilidad académica" />
          </div>
        </div>

        <div>
          <x-typography component="h2" font-family="Montserrat" class="section-title">
            Becas destacadas
          </x-typography>
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
