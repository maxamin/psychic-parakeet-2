import { ISingleTicket, ITickets } from './../types/ticket-types';
import { FETCH_ALL_TICKETS_REQUEST, FETCH_ALL_TICKETS_SUCCESS, FETCH_ALL_TICKETS_FAIL, FETCH_SINGLE_TICKET_REQUEST, FETCH_SINGLE_TICKET_SUCCESS, FETCH_SINGLE_TICKET_FAIL, CREATE_TICKET_REQUEST, CREATE_TICKET_SUCCESS, CREATE_TICKET_FAIL } from './../constants/ticket-constants';
import { initialTicketsState, singleTicketState } from 'state/tickets-state';

export const ticketsReducer = (state = initialTicketsState as ITickets, action: any) => {

    switch(action.type) {

        case FETCH_ALL_TICKETS_REQUEST:
            return {loading: true, tickets: []}

        case FETCH_ALL_TICKETS_SUCCESS:
            return {loading: false, ...state, tickets: action.payload}

        case FETCH_ALL_TICKETS_FAIL:
            return {loading: false, error: action.payload.error, message: action.payload.error.message}

        default:
            return state
    }
    
}

export const singleTicketReducer = (state = singleTicketState as ISingleTicket, action: any) => {

    switch(action.type) {

        case FETCH_SINGLE_TICKET_REQUEST: // In the event of requesting a single ticket
            return {loading: true, ticket: {} }

        case FETCH_SINGLE_TICKET_SUCCESS: // In the event that the ticket was fetched, we return all the state, then the payload object is set to the ticket object
            return {loading: false, ...state, ticket: action.payload.ticket}

        case FETCH_SINGLE_TICKET_FAIL:
            return {loading: false, error: action.payload.error, message: action.payload.error.message}

        case CREATE_TICKET_REQUEST:
                return {loading: true, error: undefined, ticket: {}}
    
        case CREATE_TICKET_SUCCESS:
                return {...state, loading: false, error: undefined, ticket: action.payload}
    
        case CREATE_TICKET_FAIL:
                return {...state, loading: false, error: action.payload, ticket: {}}

        default:
            return state;
    }

}