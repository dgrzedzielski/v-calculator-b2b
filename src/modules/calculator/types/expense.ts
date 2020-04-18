export interface Expense {
    id: string;
    name: string;
    grossValue: number;
    isCarExpense: boolean;
}

export interface ExpenseFormModel {
    id?: string;
    name: string;
    grossValue: number | null;
    isCarExpense: boolean;
}
