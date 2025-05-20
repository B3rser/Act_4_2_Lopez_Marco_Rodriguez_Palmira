import React, { useEffect, useRef } from 'react';

export function Components() {
    const handleClick = () => {
        alert('¡Botón presionado!');
    };

    React.useEffect(() => {
        const btn = document.querySelector('x-button');
        btn.onClick = handleClick;
    }, []);

    const cardRef = useRef(null);

    useEffect(() => {
        if (cardRef.current) {
            cardRef.current.onClick = () => {
                alert('¡Botón clickeado desde React!');
            };
        }
    }, []);

    const textCardRef = useRef(null);
    useEffect(() => {
        if (textCardRef.current) {
            textCardRef.current.onClick = () => {
                alert('¡Haz hecho clic en el botón del TextCard!');
            };
        }
    }, []);


    return (
        <div>
            <div>components</div>

            <x-typography component='h1' font_family='Montserrat' >
                Montserrat
            </x-typography>

            <x-typography component='p' font_family='Roboto'>
                Montserrat
            </x-typography>

            <x-typography component='small' font_family='DM Sans' >
                Montserrat
            </x-typography>

            <div>
                <x-icon name="home" size={20} ></x-icon>
                <x-icon name="help" size={20} ></x-icon>
                <x-icon name="success" size={20} ></x-icon>
                <x-icon name="error" size={20} ></x-icon>
                <x-icon name="arrow-right" size={20} ></x-icon>
                <x-icon name="cross" size={20} ></x-icon>
                <x-icon name="arrow-left" size={20} ></x-icon>
                <x-icon name="menu" size={20} ></x-icon>
                <x-icon name="edit" size={20} ></x-icon>
                <x-icon name="dropdown" size={20} ></x-icon>
                <x-icon name="bell" size={20} ></x-icon>
                <x-icon name="pin" size={20} ></x-icon>
                <x-icon name="download" size={20} ></x-icon>
                <x-icon name="bar-chart" size={20} ></x-icon>
                <x-icon name="inbox" size={20} ></x-icon>
                <x-icon name="filter" size={20} ></x-icon>
                <x-icon name="map" size={20} ></x-icon>
                <x-icon name="zap" size={20} ></x-icon>
                <x-icon name="share" size={20} ></x-icon>
                <x-icon name="credit-card" size={20} ></x-icon>
                <x-icon name="search" size={20} ></x-icon>
                <x-icon name="user" size={20} ></x-icon>
                <x-icon name="calendar" size={20} ></x-icon>
                <x-icon name="eye" size={20} ></x-icon>
                <x-icon name="closed-eye" size={20} ></x-icon>
                <x-icon name="heart" size={20} ></x-icon>
                <x-icon name="caret-right" size={20} ></x-icon>
                <x-icon name="analyze" size={20} ></x-icon>
                <x-icon name="chat" size={20} ></x-icon>
                <x-icon name="result" size={20} ></x-icon>
                <x-icon name="x" size={20} ></x-icon>
                <x-icon name="instagram" size={20} ></x-icon>
                <x-icon name="facebook" size={20} ></x-icon>
                <x-icon name="tiktok" size={20} ></x-icon>
            </div>

            <div>
                <x-button label="Clickeame" priority="primary" state="default"></x-button>
            </div>
            <div>
                <x-button label="Clickeame" priority="alternative" state="default"></x-button>
            </div>
            <div>
                <x-button label="Clickeame" priority="secondary" state="default"></x-button>
            </div>
            <div>
                <x-card
                    ref={cardRef}
                    type="universidad"
                    image="https://wp.uaslp.mx/noticias/wp-content/uploads/sites/5/2024/04/thumbnail_UASLP-1024x682.jpg"
                    title="uaslp"
                    content="jdeneodoekde"
                    buttonPriority='alternative'
                    buttonLabel='Ver más'>
                </x-card>

            </div>
            <div>
                <x-card
                    ref={cardRef}
                    type="carrera"
                    image="https://wp.uaslp.mx/noticias/wp-content/uploads/sites/5/2024/04/thumbnail_UASLP-1024x682.jpg"
                    title="uaslp"
                    content="jdeneodoekde jsbibsbwuibsuiw"
                    buttonPriority='alternative'
                    buttonLabel='Ver más'>
                </x-card>

            </div>
            <div>
                <x-textcard
                    ref={textCardRef}
                    label="Título de la tarjeta"
                    description="Descripción de la tarjeta."
                    type="card-boton"
                    buttonpriority="primary"
                    buttonlabel="Haz clic"
                />
            </div>

        </div>

    );
}
