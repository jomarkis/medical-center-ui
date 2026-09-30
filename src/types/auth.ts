export interface LoginRequest {
  role: "ADMIN" | "DOCTOR" | "PATIENT";
}

export interface AdminLoginRequest extends LoginRequest {
  role: "ADMIN";
  pin: string;
}

export interface DoctorLoginRequest extends LoginRequest {
  role: "DOCTOR";
  doctorID: number;
}

export interface PatientLoginRequest extends LoginRequest {
  role: "PATIENT";
  patientID: number;
}

export interface LoginResponse {
  token: string;
  role: "ROLE_ADMIN" | "ROLE_DOCTOR" | "ROLE_PATIENT" | string;
  identifier: number;
}