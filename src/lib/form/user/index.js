import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker'

// declare global variable
const FIRST_NAME = 'firstname';
const LAST_NAME = 'lastname';
const EMAIL = 'email';
const PASSWORD = 'password';
const CONFIRM_PASSWORD = 'confirmPassword';
const EXPIRED_DATE = 'expiredDate';
const GROUP_ACCESS = 'groupAccess';

// declare dummy group access
const groupAccess = [
  {
    label: 'Bandung',
    value: 'Bandung',
  },
  {
    label: 'Jakarta',
    value: 'Jakarta',
  },
  {
    label: 'Surabaya',
    value: 'Surabaya',
  },
  {
    label: 'Palembang',
    value: 'Palembang',
  },
  {
    label: 'Bogor',
    value: 'Bogor',
  },
  {
    label: 'Pangkal Pinang',
    value: 'Pangkal Pinang',
  },
];

function parsingDefaultValues(selectedUser) {
  if (selectedUser) {
    let defaultValues = { ...selectedUser }

    defaultValues[GROUP_ACCESS] = {
      label: selectedUser[GROUP_ACCESS],
      value: selectedUser[GROUP_ACCESS],
    };

    defaultValues[EXPIRED_DATE] = new Date(defaultValues[EXPIRED_DATE]);

    return defaultValues;
  }

  return {
    [FIRST_NAME]: '',
    [LAST_NAME]: '',
    [EMAIL]: '',
    [PASSWORD]: '',
    [CONFIRM_PASSWORD]: '',
    [EXPIRED_DATE]: new Date(),
    [GROUP_ACCESS]: ''
  };
}

export default function FormUser({ selectedUser, cbSubmit }) {
  const navigate = useNavigate();

  // using react hook form. React hook form is uncontrolled form based on useRef()
  // useRef() will direct to V-DOM. So its not always rerender component when form's field was onChange
	const { register, control, handleSubmit, watch, formState: { errors }  } = useForm({
    // mode onBlur will rerender component when form's field is onBlur 
    mode: 'onBlur',
  });
	
  // declare register options react hook form for all form's fields
  const registerOptions = {
    [FIRST_NAME]: {
      required: `${FIRST_NAME} is required`,
    },
    [LAST_NAME]: {
      required: `${LAST_NAME} is required`,
    },
    [EMAIL]: {
      required: `${EMAIL} is required`,
    },
    [PASSWORD]: {
      required: `${PASSWORD} is required`,
      minLength: {
        value: 6,
        message:`${PASSWORD} must have at least 6 characters`,
      },
    },
    [CONFIRM_PASSWORD]: {
      required: `${CONFIRM_PASSWORD} is required`,
      validate: (value => {
        if (watch(PASSWORD) !== value) {
          return 'Your password do not match';
        }
      })
    },
    [EXPIRED_DATE]: {
      required: `${EXPIRED_DATE} is required`,
    },
    [GROUP_ACCESS]: {
      required: `${GROUP_ACCESS} is required`,
    },
  }

  const handleCancel = e => {
    e.preventDefault();
    navigate(-1);
  }

	const onSubmit = user => {
    user[GROUP_ACCESS] = user[GROUP_ACCESS].value
    user[EXPIRED_DATE] = user[EXPIRED_DATE].toString()

		cbSubmit(user);
	}

  const onErrors = errors => {
    console.log('errors');
    console.log(errors);
  }

  // get current time
  const today = new Date();

  const defaultValues = parsingDefaultValues(selectedUser);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onErrors)}>
        <label htmlFor={FIRST_NAME}>
          First Name
        </label>
        <input
          id={FIRST_NAME}
          type='text'
          defaultValue={defaultValues[FIRST_NAME]}
          {...register(FIRST_NAME, registerOptions[FIRST_NAME])} />
          <span>{errors[FIRST_NAME] && errors[FIRST_NAME].message}</span>

        <label htmlFor={LAST_NAME}>
          Last Name
        </label>
        <input
          id={LAST_NAME}
          type='text'
          defaultValue={defaultValues[LAST_NAME]}
          {...register(LAST_NAME, registerOptions[LAST_NAME])} />
          <span>{errors[LAST_NAME] && errors[LAST_NAME].message}</span>
        
        <label htmlFor={EMAIL}>
          Email
        </label>
        <input 
          id={EMAIL}
          type='email'
          defaultValue={defaultValues[EMAIL]}
          {...register(EMAIL, registerOptions[EMAIL])} />
          <span>{errors[EMAIL] && errors[EMAIL].message}</span>

        <label htmlFor={PASSWORD}>
          Password
        </label>
        <input 
          id={PASSWORD}
          type='password'
          defaultValue={defaultValues[PASSWORD]}
          {...register(PASSWORD, registerOptions[PASSWORD])} />
          <span>{errors[PASSWORD] && errors[PASSWORD].message}</span>
        
        <label htmlFor={CONFIRM_PASSWORD}>
          Confirm Password
        </label>
        <input 
          id={CONFIRM_PASSWORD}
          type='password'
          defaultValue={defaultValues[CONFIRM_PASSWORD]}
          {...register(CONFIRM_PASSWORD, registerOptions[CONFIRM_PASSWORD])} />
          <span>{errors[CONFIRM_PASSWORD] && errors[CONFIRM_PASSWORD].message}</span>

        <label htmlFor={EXPIRED_DATE}>
          Expired Date
        </label>
        {/* If component doesn't expose input ref, 
        then use Controller to take care of the registration process */}
        <Controller
          name={EXPIRED_DATE}
          control={control}
          rules={registerOptions[EXPIRED_DATE]}
          defaultValue={defaultValues[EXPIRED_DATE]}
          render={({ field }) => {
            return (
              <DateTimePicker
                {...field}
                minDate={today} />
            )}
          }
        />
        <span>{errors[EXPIRED_DATE] && errors[EXPIRED_DATE].message}</span>

        {/* If component doesn't expose input ref, 
        then use Controller to take care of the registration process */}
        <Controller
          name={GROUP_ACCESS}
          control={control}
          rules={registerOptions[GROUP_ACCESS]}
          defaultValue={defaultValues[GROUP_ACCESS]}
          render={({ field }) => {
            return (
              <Select 
                {...field} 
                options={groupAccess} />
            )}
          }
        />
        <span>{errors[GROUP_ACCESS] && errors[GROUP_ACCESS].message}</span>

        <button onClick={handleCancel}> Cancel </button>
        <input type='submit' />        
      </form>
    </div>
  );
}