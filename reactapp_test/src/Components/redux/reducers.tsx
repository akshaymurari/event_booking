interface events {
    id:string,
    userUsername:string,
    title:string,
    description:string,
    price:number,
    date:string
}


export const EventReducer = (state:events[]=[],action:{payload:events[],type:string}) => {
    switch(action.type){
        case "addevent":return [...state,...action.payload];
        case "addallevents":return action.payload;
        default : return state;
    }
}

