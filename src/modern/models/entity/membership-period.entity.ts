import { MembershipPeriodState } from "../enum/membership-period-state.enum";
import { Membership } from "./membership.entity";
const membershipPeriods: any[] = require('../../../data/membership-periods.json');

import { v4 as uuidv4 } from 'uuid';

export class MembershipPeriod {
    id: number;
    uuid: string;
    membership: number;
    start!: Date;
    end!: Date;
    state: MembershipPeriodState;

    constructor(membership: Membership) {
        this.id = membershipPeriods.length + 1;
        this.uuid = uuidv4();
        this.membership = membership.id;
        this.state = MembershipPeriodState.NOT_ISSUED;
    }
}