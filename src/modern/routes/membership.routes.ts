import express, { Request, Response, Router } from "express";
import { MembershipController } from "../controllers/membership.controller";
import { ClassValidator } from "../middlewares/class.validator";
import { CreateMembershipDto } from "../models/dto/create-membership.dto";

export class MembershipRoutes {
  private router: Router;
  private membershipController: MembershipController;

  constructor() {
    this.router = express.Router();
    this.membershipController = new MembershipController();
  }

  intializeRoutes(): Router {
    this.router.get('/', this.membershipController.getMemberships);
    this.router.post('/', ClassValidator(CreateMembershipDto), this.membershipController.createMembership);
    return this.router;
  }
}
