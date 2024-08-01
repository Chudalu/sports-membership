import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { BillingInterval } from "../enum/billing-interval.enum";
import { PaymentMethod } from "../enum/payment-method.enum";

export class CreateMembershipDto {

    @IsString({ message: "missingMandatoryFields" })
    name!: string;

    @IsOptional()
    @IsNumber()
    userId?: number;

    @Min(0, { message: "negativeRecurringPrice" })
    @IsNumber({}, { message: "missingMandatoryFields" })
    recurringPrice!: number;

    @IsDateString()
    validFrom!: string;

    @IsDateString()
    validUntil!: string;

    @IsEnum(PaymentMethod)
    paymentMethod!: PaymentMethod;

    @IsEnum(BillingInterval)
    billingInterval!: BillingInterval;

    @Min(1)
    @IsNumber()
    billingPeriods!: number;
}