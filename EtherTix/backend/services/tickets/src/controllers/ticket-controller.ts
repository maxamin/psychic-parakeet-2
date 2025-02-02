import { isValidObjectId } from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Response } from 'express';
import { Ticket } from '../models/ticket-model';
import asyncHandler from 'express-async-handler'
import { ErrorResponse } from '../utils/error-response';

// @desc      Fetch All Tickets
// @route     GET /api/v1/tickets
// @access    Private (Authorization Token Required

export const fetchAllTickets = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any | Response> => {
        const tickets = await Ticket.find();

        if(!tickets) {
           return next(new ErrorResponse(`No tickets found. Please try again`, StatusCodes.BAD_REQUEST));
        }

        return response.status(StatusCodes.OK).json({success: true, tickets});
     } 
   
)

export const fetchEventTicket = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any | Response> => {
   const eventID = request.body.eventID;
   const tickets = await Ticket.findById({event: eventID});

   if(!tickets) {
      return next(new ErrorResponse(`No tickets found. Please try again`, StatusCodes.BAD_REQUEST));
   }

   return response.status(StatusCodes.OK).json({success: true, tickets});
})




// @desc      Get Event Ticket By ID
// @route     GET /api/v1/tickets/:id
// @access    Private (Authorization Token Required)

export const fetchTicketByID = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
      const id = request.params.id;
      const ticket = await Ticket.findById(id)

      if(!isValidObjectId(id)) {
          return next(new ErrorResponse(`Ticket ID is malformed`, StatusCodes.BAD_REQUEST));
      }
 
      if(!ticket) {
         return next(new ErrorResponse(`Could not find that ticket with ID : ${id} `, StatusCodes.BAD_REQUEST))
      }

      return response.status(StatusCodes.OK).json({success: true, ticket})
  } 
  
)

export const createNewTicket = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
        const {issuer, event, name, ticketClass, currentStock, description, price} = request.body;

        if(!name || !ticketClass || !currentStock || !description || !price) {
            return next(new ErrorResponse(`One or more ticket entries are missing. Please check again`, StatusCodes.BAD_REQUEST));
        }

        const ticket = await Ticket.create({event, issuer, name, ticketClass, currentStock, description, price});
        await ticket.save();

        return response.status(StatusCodes.CREATED).json({success: true, ticket});
   } 

)

// @desc      Edit Ticket By ID
// @route     POST /api/v1/tickets/:ticketId
// @access    Private (JWT Authorization Token Required)

export const editTicketByID = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {

      const id = request.params.id;
      let ticket = await Ticket.findById(id);

      if(!isValidObjectId(id)) {
         return next(new ErrorResponse(`The ticket ID to edit is invalid. Please check the ID again`, StatusCodes.BAD_REQUEST));
      }

      if(!ticket) {
         return next(new ErrorResponse(`No ticket found with that ID`, StatusCodes.BAD_REQUEST));
      }

      ticket = await Ticket.findByIdAndUpdate(id, request.body, {new: true, runValidators: true});
      return response.status(StatusCodes.OK).json({success: true, ticket});

   } 
   
)

// @desc      Delete All Tickets For A specific event
// @route     POST /api/v1/events/:eventId/tickets
// @access    Private (JWT Authorization Token Required)

export const deleteAllTickets = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
      await Ticket.deleteMany();
      return response.status(StatusCodes.NO_CONTENT).json({success: true, data: {}, message: "Tickets Deleted"});
  }    
  
)

export const deleteTicketByID = async (request: any, response: any, next: NextFunction): Promise<any> => {
    const id = request.params.id;

    if(!isValidObjectId(id)) {
      return next(new ErrorResponse(`The Ticket ID to delete is invalid. Please check the ID again`, StatusCodes.BAD_REQUEST));
    }

    await Ticket.findByIdAndDelete(id);
    return response.status(StatusCodes.NO_CONTENT).json({success: true, message: "Ticket Deleted"});
}

export const fetchPremiumTickets = async (request: any, response: any, next: NextFunction): Promise<any> => {
   const premiumTickets = await Ticket.find({ticketClass: "premium"})
   return response.status(StatusCodes.OK).json({success: true, premiumTickets})
}

export const fetchBasicTickets = asyncHandler(async (request: any, response: any, next: NextFunction): Promise<any> => {
   const {ticketType} = request.query;

   if(ticketType !== 'basic') {
      return next(new ErrorResponse(`We are sorry but you provided the wrong query parameter`, StatusCodes.BAD_REQUEST));
   }

   const basicTickets = await Ticket.find({ticketClass: ticketType})
   return response.status(StatusCodes.OK).json({success: true, basicTickets});

})

export const fetchStandardTickets = async (request: any, response: any, next: NextFunction): Promise<any> => {
    const standardTickets = await Ticket.find({ticketClass: "standard"})
    return response.status(StatusCodes.OK).json({success: true, standardTickets})
}