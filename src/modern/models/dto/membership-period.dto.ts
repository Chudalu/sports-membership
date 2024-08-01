import { MembershipPeriod } from "../entity/membership-period.entity";
import { MembershipPeriodState } from "../enum/membership-period-state.enum";

export class MembershipPeriodDto {
    id: number;
    uuid: string;
    membership: number;
    start?: string;
    end?: string;
    state?: MembershipPeriodState;

    constructor(membershipPeriod: MembershipPeriod | any) {
        this.id = membershipPeriod.id;
        this.uuid = membershipPeriod.uuid;
        this.state = membershipPeriod.state;
        this.membership = membershipPeriod.membership;
        this.end = new Date(membershipPeriod.end).toISOString().split('T')[0];
        this.start = new Date(membershipPeriod.start).toISOString().split('T')[0];

    }
}