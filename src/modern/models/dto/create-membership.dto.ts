import { BillingInterval } from "../enum/billing-interval.enum";
import { MembershipState } from "../enum/membership-state.enum";
import { PaymentMethod } from "../enum/payment-method.enum";

export class CreateMembershipDto {
    name!: string;
    user!: number;
    recurringPrice!: number;
    validFrom!: string;
    validUntil!: string;
    state!: MembershipState;
    paymentMethod!: PaymentMethod;
    billingInterval!: BillingInterval;
    billingPeriods!: number;
}