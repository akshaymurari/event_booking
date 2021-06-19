interface events {
    id:string,
    userUsername:string,
    title:string,
    description:string,
    price:number,
    date:string
}

interface bookings{
    id:string,
    event:{
        owner:string,
        date:string,
        title:string
    }
}

export const EventReducer = (state:events[]=[],action:{payload:events[],type:string}) => {
    switch(action.type){
        case "addevent":return [...state,...action.payload];
        case "addallevents":return action.payload;
        default : return state;
    }
}

export const BookingReducer = (state:bookings[]=[],action:{payload:bookings[],type:string}) => {
    switch(action.type){
        case "addbooking":return [...state,...action.payload];
        case "addallbookings":return action.payload;
        default : return state;
    }
}

