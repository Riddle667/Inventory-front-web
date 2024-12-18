export interface Installment {
    id: number;
    installment_number: number;
    amount: number;
    due_date: Date;
    paid: boolean;
    order_id: number;
}