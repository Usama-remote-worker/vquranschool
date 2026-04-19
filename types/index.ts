export interface Teacher {
    id: string;
    name: string;
    experience: string | number;
    specialization: string;
    available_days?: string;
    profile_photo?: string;
    qualification?: string;
    status?: 'pending' | 'approved' | 'rejected';
}

export interface Student {
    id: string;
    name: string;
    email: string;
    plan_frequency?: string;
    payment_status?: 'unpaid' | 'paid' | 'pending';
}
