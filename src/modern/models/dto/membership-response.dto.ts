import { MembershipPeriodDto } from "./membership-period.dto";
import { MembershipDto } from "./membership.dto";

export class MembershipResponseDto {
    membership: MembershipDto;
    periods: MembershipPeriodDto[];

    constructor(membership: MembershipDto, periods: MembershipPeriodDto[]) {
        this.membership = membership;
        this.periods = periods;
    }
}