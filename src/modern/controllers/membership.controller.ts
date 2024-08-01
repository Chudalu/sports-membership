import { Request, Response } from "express";
import { MembershipService } from "../services/membership.service";
import { CreateMembershipDto } from "../models/dto/create-membership.dto";

export class MembershipController {

    private membershipService: MembershipService;
    constructor() {
        this.membershipService = new MembershipService();
    }

    createMembership = (request: Request, response: Response) => {
        let createMembershipDto: CreateMembershipDto = request.body;
        return this.membershipService.createMembership(createMembershipDto, response);
    };

    getMemberships = (request: Request, response: Response) => {
        return this.membershipService.getMemberships(response);
    };

}