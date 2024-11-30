export interface Installment {
    id: number;
    installment_number: number;
    amount: number;
    expiration_date: string;
    paid: boolean;
    order_id: number;
}