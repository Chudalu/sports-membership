import { CreateMembershipDto } from "../models/dto/create-membership.dto";
import { MembershipPeriodDto } from "../models/dto/membership-period.dto";
import { MembershipResponseDto } from "../models/dto/membership-response.dto";
import { MembershipDto } from "../models/dto/membership.dto";
import { MembershipPeriod } from "../models/entity/membership-period.entity";
import { Membership } from "../models/entity/membership.entity";
import { BillingInterval } from "../models/enum/billing-interval.enum";
import { MembershipPeriodState } from "../models/enum/membership-period-state.enum";
import { Response } from "express";
import { HttpStatus } from "../models/helpers/http-status.helper";
const Memberships: any[] = require('../../data/memberships.json');
const MembershipPeriods: any[] = require('../../data/membership-periods.json');

export class MembershipService {

    constructor() { }

    createMembership(createMembership: CreateMembershipDto, response: Response): Response<MembershipResponseDto> {
        let membership = new Membership(createMembership);
        this.persistMembership(membership);
        let membershipPeriodsDto = this.createMembershipPeriods(membership);
        let created = new MembershipResponseDto(new MembershipDto(membership), membershipPeriodsDto);
        return response.status(HttpStatus.CREATED).json(created);
    }

    getMemberships(response: Response): Response<MembershipResponseDto[]> {
        let membershipResponses: MembershipResponseDto[] = [];
        Memberships.forEach(membership => {
            let membershipDto = new MembershipDto(membership);
            let membershipPeriodsDto = MembershipPeriods.filter(p => Number(p.membership) == Number(membership.id))
                .map(p => new MembershipPeriodDto(p));
            membershipResponses.push(new MembershipResponseDto(membershipDto, membershipPeriodsDto));
        });
        return response.status(HttpStatus.SUCCESS).json(membershipResponses);
    }

    private createMembershipPeriods(membership: Membership): MembershipPeriodDto[] {
        let membershipPeriods: MembershipPeriod[] = [];
        let periodStart = membership.validFrom;
        for (let i = 0; i < membership.billingPeriods; i++) {
            let validFrom = periodStart;
            let validUntil = new Date(validFrom);
            if (membership.billingInterval === BillingInterval.MONTHLY)
                validUntil.setMonth(validFrom.getMonth() + 1);
            else if (membership.billingInterval === BillingInterval.YEARLY)
                validUntil.setMonth(validFrom.getMonth() + 12);
            else if (membership.billingInterval === BillingInterval.WEEKLY)
                validUntil.setDate(validFrom.getDate() + 7);
            let membershipPeriod = new MembershipPeriod(membership);
            membershipPeriod.start = validFrom;
            membershipPeriod.end = validUntil;
            membershipPeriod.state = MembershipPeriodState.PLANNED;
            membershipPeriods.push(membershipPeriod);
            this.persistMembershipPeriod(membershipPeriod);
            periodStart = validUntil;
        }
        return membershipPeriods.map(p => new MembershipPeriodDto(p));
    }

    private persistMembership(membership: Membership) {
        Memberships.push({
            ...membership,
            validFrom: membership.validFrom.toISOString().split('T')[0],
            validUntil: membership.validUntil.toISOString().split('T')[0],
        });
    }

    private persistMembershipPeriod(membershipPeriod: MembershipPeriod) {
        MembershipPeriods.push({
            ...membershipPeriod,
            start: membershipPeriod.start.toISOString().split('T')[0],
            end: membershipPeriod.end.toISOString().split('T')[0]
        });
    }
}