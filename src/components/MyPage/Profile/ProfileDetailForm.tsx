import FindAddressButton from '../FindAddressButton';
import './ProfileDetailForm.css';
import { useAuthStore } from '@/store/useAuthStore';
// interface Props<T extends FieldValues> {
//   item: IUserInfo;
//   register: UseFormRegister<T>;
//   setValue: UseFormSetValue<T>;
//   isEditMode: boolean;
//   isCompletedProfile: boolean;
// }

const caregiverEditableKeys = [
  'address.addr',
  'address.addrDetail',
  'address.zipCode',
  'experienceYears',
  'age',
  'specialization',
  'caregiverSignificant',
  'wantCareStartDate',
  'wantCareEndDate',
];

const patientEditableKeys = [
  'address.addr',
  'address.addrDetail',
  'address.zipCode',
  'nokName',
  'age',
  'nokContact',
  'realCarePlace',
  'careRequirements',
  'patientSignificant',
  'wantCareStartDate',
  'wantCareEndDate',
];

function ProfileDetailForm({
  item,
  register,
  setValue,
  isCompletedProfile,
  isEditMode,
}: any) {
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (item.key === 'residentRegistrationNumber') {
      let value = e.target.value.replace(/[^0-9]/g, '');
      if (value.length > 6) {
        value = `${value.slice(0, 6)}-${value.slice(6, 7)}******`;
      }
      setValue(item.key, value);
    } else {
      setValue(item.key, e.target.value);
    }

    if (item.key === 'contact' || item.key === 'nokContact') {
      let value = e.target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/-{1,2}$/g, '');
      setValue(item.key, value);
    } else {
      setValue(item.key, e.target.value);
    }
  };
  const { user } = useAuthStore();
  let isEditable;
  const isCaregiverEditable =
    !isCompletedProfile ||
    (isCompletedProfile && caregiverEditableKeys.includes(item.key));
  const isPatientEditable =
    !isCompletedProfile ||
    (isCompletedProfile && patientEditableKeys.includes(item.key));
  if (user?.role === 'USER') {
    isEditable = isPatientEditable;
  } else if (user?.role === 'CAREGIVER') {
    isEditable = isCaregiverEditable;
  }
  switch (item.type) {
    case 'text':
      return (
        <input
          placeholder={item.placeholder}
          {...register(item.key)}
          onChange={handleFormChange}
          type="text"
          id={item.key}
          disabled={!isEditable || !isEditMode}
          maxLength={13}
          className={`relative h-[48px] w-full rounded-[7px] border-2 bg-gray-light outline-none ${
            isEditable ? '' : 'border-transparent'
          } pl-2`}
        />
      );
    case 'select':
      return (
        <select
          {...register(item.key)}
          disabled={!isEditable || !isEditMode}
          className={`relative h-[48px] rounded-[7px] border-2 bg-gray-light outline-none ${
            isEditable ? '' : 'border-transparent'
          } w-full pl-2`}
        >
          {item.options &&
            item.options.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
      );
    case 'address':
      return (
        <div className="flex items-center">
          <input
            placeholder={item.placeholder}
            {...register(item.key)}
            type="text"
            id={item.key}
            disabled
            className={`relative h-[48px] rounded-[7px] border-2 bg-gray-light outline-none ${
              isEditable ? '' : 'border-transparent'
            } w-full pl-2`}
          />
          {isEditable && (
            <FindAddressButton
              isEditable={!isEditable || isEditMode}
              onCompleted={(data) => {
                setValue('address.addr', data.address);
                setValue('address.zipCode', data.zonecode);
              }}
            />
          )}
        </div>
      );
    case 'zipCode':
      return (
        <div className="flex items-center">
          <input
            placeholder={item.placeholder}
            {...register(item.key)}
            type="text"
            id={item.key}
            disabled
            className={`relative h-[48px] rounded-[7px] border-2 bg-gray-light outline-none ${
              isEditable ? '' : 'border-transparent'
            } w-full pl-2`}
          />
        </div>
      );
    case 'date':
      return (
        <div className="flex items-center">
          <input
            {...register(item.key, { required: true })}
            type="date"
            id={item.key}
            disabled={!isEditable || !isEditMode}
            className={`h-[48px] rounded-[7px] border-2 bg-gray-light outline-none ${
              isEditable ? '' : 'border-transparent'
            } w-full pl-2`}
          />
        </div>
      );
    default:
      return null;
  }
}

export default ProfileDetailForm;
