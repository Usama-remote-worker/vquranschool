export interface Teacher {
    id: string;
    name: string;
    email?: string;
    role: 'teacher';
    experience: string | number;
    specialization: string;
    available_days?: string;
    profile_photo?: string;
    qualification?: string;
    status: 'pending' | 'approved' | 'rejected';
}

export interface Student {
    id: string;
    name: string;
    email: string;
    role: 'student';
    age?: number | string;
    country?: string;
    course?: string;
    status: 'pending' | 'approved' | 'rejected';
    plan_frequency?: string;
    payment_status?: 'unpaid' | 'active' | 'pending';
    access_expires_at?: string;
    assigned_teacher?: string;
}
