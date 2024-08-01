import { Membership } from "../entity/membership.entity";
import { BillingInterval } from "../enum/billing-interval.enum";
import { MembershipState } from "../enum/membership-state.enum";
import { PaymentMethod } from "../enum/payment-method.enum";

export class MembershipDto {
    id: number;
    uuid: string;
    name: string;
    userId: number;
    recurringPrice: number;
    validFrom: string;
    validUntil: string;
    state: MembershipState;
    assignedBy: string;
    paymentMethod: PaymentMethod;
    billingInterval: BillingInterval;
    billingPeriods: number;

    constructor(membership: Membership | any) {
        this.id = membership.id;
        this.uuid = membership.uuid;
        this.name = membership.name;
        this.state = membership.state;
        this.userId = membership.userId;
        this.assignedBy = membership.assignedBy;
        this.paymentMethod = membership.paymentMethod;
        this.billingPeriods = membership.billingPeriods;
        this.recurringPrice = membership.recurringPrice;
        this.billingInterval = membership.billingInterval;
        this.validFrom = new Date(membership.validFrom).toISOString().split('T')[0];
        this.validUntil = new Date(membership.validUntil).toISOString().split('T')[0];
    }
}