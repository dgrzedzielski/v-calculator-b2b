interface BaseExpense {
    name: string;
    isCarExpense: boolean;
}

export interface Expense extends BaseExpense {
    id: string;
    grossValue: number;
}

export interface ExpenseFormModel extends BaseExpense {
    id?: string;
    grossValue: number | null;
}
