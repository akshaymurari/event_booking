import React from 'react';

const Button = (props:{buttontext:string,takebuttontext:boolean}) => {
    return (
        <>
            <button data-testid="button">{
                (!props.takebuttontext)?props?.buttontext:"button"
            } hii</button>
        </>
    )
}

export default Button;