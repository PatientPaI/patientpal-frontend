export interface ProfileRequestBody {
  caregiver: {
    name: string;
    residentRegistrationNumber: string;
    contact: string;
    gender: string;
    address: {
      addr: string;
      addrDetail: string;
      zipCode: string;
    };
    rating: number;
    experienceYears: number;
    specialization: string;
    caregiverSignificant: string;
    wantCareStartDate: Date;
    wantCareEndDate: Date;
  };

  patient: {
    name: string;
    residentRegistrationNumber: string;
    gender: string;
    contact: string;
    address: {
      addr: string;
      addrDetail: string;
      zipCode: string;
    };
    patientSignificant: string;
    careRequirements: string;
    realCarePlace: string;
    isNok: true;
    nokName: string;
    nokContact: string;
    wantCareStartDate: Date;
    wantCareEndDate: Date;
  };
}

export type ProfileResponse = {
  caregiver: {
    memberId: number;
    name: string;
    residentRegistrationNumber: string;
    age: number;
    contact: string;
    gender: string;
    address: {
      addr: string;
      addrDetail: string;
      zipCode: string;
    };
    experienceYears: number;
    specialization: string;
    caregiverSignificant: string;
    isInMatchList: true;
    image: string;
  };

  patient: {
    memberId: number;
    name: string;
    residentRegistrationNumber: string;
    age: number;
    contact: string;
    gender: string;
    address: {
      addr: string;
      addrDetail: string;
      zipCode: string;
    };
    nokName: string;
    nokContact: string;
    patientSignificant: string;
    careRequirements: string;
    realCarePlace: string;
    isNok: boolean;
    wantCareStartDate: Date;
    wantCareEndDate: Date;
  };
};

export type ModifiedPatientData = Partial<ProfileRequestBody['patient']>;

export type ModifiedCaregiverData = Partial<ProfileResponse['caregiver']>;

//유저가 입력한 data type
export interface IAddress {
  addr: string;
  addrDetail: string;
  zipCode: string;
}

export interface ICommonData {
  name: string;
  residentRegistrationNumber: string;
  contact: string;
  gender: 'MALE' | 'FEMALE';
  address: IAddress;
  wantCareStartDate: string;
  wantCareEndDate: string;
}

export interface ICaregiverData extends ICommonData {
  experienceYears: number;
  specialization: string;
  caregiverSignificant: string;
}

export interface IPatientData extends ICommonData {
  patientSignificant: string;
  careRequirements: string;
  realCarePlace: string;
  isNok: boolean;
  nokName: string;
  nokContact: string;
}

export type IPatientEditData = Pick<
  IPatientData,
  | 'address'
  | 'patientSignificant'
  | 'careRequirements'
  | 'realCarePlace'
  | 'nokContact'
  | 'nokName'
  | 'isNok'
  | 'wantCareEndDate'
  | 'wantCareStartDate'
>;

export type ICaregiverEditData = Pick<
  ICaregiverData,
  | 'address'
  | 'experienceYears'
  | 'specialization'
  | 'caregiverSignificant'
  | 'wantCareEndDate'
  | 'wantCareStartDate'
>;
