import React from 'react';
import Button from '../components/Button';

export function Components() {
    return (
        <div>
            <Button
                label="Primary"
                priority="primary"
                onClick={() => alert('¡Clic real detectado!')}
            />
            <Button
                label="Primary D"
                priority="primary"
                state="disabled"
            />


            <Button
                label="Alternative"
                priority="alternative"
            
            />
            <Button
                label="Alternative D"
                priority="alternative"
                state="disabled"
            
            />


            <Button
                label="Secondary"
                priority="secondary"
            />
            <Button
                label="Secondary D"
                priority="secondary"
                state="disabled"
            />

            

        </div>
    )
}
