import { MembershipState } from "../enum/membership-state.enum";
import { PaymentMethod } from "../enum/payment-method.enum";
import { BillingInterval } from "../enum/billing-interval.enum";
import { CreateMembershipDto } from "../dto/create-membership.dto";
const memberships: any[] = require('../../../data/memberships.json');

import { v4 as uuidv4 } from 'uuid';

export class Membership {
    id: number;
    uuid: string;
    name: string;
    userId: number;
    recurringPrice: number;
    validFrom: Date;
    validUntil!: Date;
    state!: MembershipState;
    assignedBy = 'Admin';
    paymentMethod: PaymentMethod;
    billingInterval: BillingInterval;
    billingPeriods: number;

    constructor(createMembership: CreateMembershipDto) {
        this.id = memberships.length + 1;
        this.uuid = uuidv4();
        this.name = createMembership.name;
        this.userId = createMembership.userId || Math.ceil(Math.random() * 10000);
        this.recurringPrice = createMembership.recurringPrice;
        this.validFrom = createMembership.validFrom ? new Date(createMembership.validFrom) : new Date();
        this.paymentMethod = createMembership.paymentMethod;
        this.billingInterval = createMembership.billingInterval;
        this.billingPeriods = createMembership.billingPeriods;
        this.setDynamicProps();
    }

    setDynamicProps() {
        this.setValidUntil();
        this.setState();
    }

    setValidUntil() {
        let validUntil = new Date(this.validFrom);
        if (this.billingInterval === BillingInterval.MONTHLY)
            validUntil.setMonth(this.validFrom.getMonth() + this.billingPeriods);
        else if (this.billingInterval === BillingInterval.YEARLY)
            validUntil.setMonth(this.validFrom.getMonth() + this.billingPeriods * 12);
        else if (this.billingInterval === BillingInterval.WEEKLY)
            validUntil.setDate(this.validFrom.getDate() + this.billingPeriods * 7);
        this.validUntil = validUntil;
    }

    setState() {
        let state = MembershipState.ACTIVE;
        if (this.validFrom > new Date()) state = MembershipState.PENDING;
        if (this.validUntil < new Date()) state = MembershipState.EXPIRED;
        this.state = state;
    }
}