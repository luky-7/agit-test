import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker'
import { v4 as uuidv4 } from 'uuid';

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
    user['id'] = uuidv4()
    user[GROUP_ACCESS] = user[GROUP_ACCESS].value
    user[EXPIRED_DATE] = user[EXPIRED_DATE].toISOString()

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
    <div className='h-screen'>
      <form className='rounded overflow shadow-md py-3 px-10 mx-auto mt-5' 
        onSubmit={handleSubmit(onSubmit, onErrors)}>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={FIRST_NAME}>
            First Name
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id={FIRST_NAME}
            type='text'
            defaultValue={defaultValues[FIRST_NAME]}
            {...register(FIRST_NAME, registerOptions[FIRST_NAME])} />
          <p className='text-red-500 text-xs italic'>
            {errors[FIRST_NAME] && errors[FIRST_NAME].message}
          </p>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={LAST_NAME}>
            Last Name
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id={LAST_NAME}
            type='text'
            defaultValue={defaultValues[LAST_NAME]}
            {...register(LAST_NAME, registerOptions[LAST_NAME])} />
          <p className='text-red-500 text-xs italic'>
            {errors[LAST_NAME] && errors[LAST_NAME].message}
          </p>
        </div>  
        
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={EMAIL}>
            Email
          </label>
          <input 
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id={EMAIL}
            type='email'
            defaultValue={defaultValues[EMAIL]}
            {...register(EMAIL, registerOptions[EMAIL])} />
          <p className='text-red-500 text-xs italic'>
            {errors[EMAIL] && errors[EMAIL].message}
          </p>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={PASSWORD}>
            Password
          </label>
          <input 
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id={PASSWORD}
            type='password'
            defaultValue={defaultValues[PASSWORD]}
            {...register(PASSWORD, registerOptions[PASSWORD])} />
          <p className='text-red-500 text-xs italic'>
            {errors[PASSWORD] && errors[PASSWORD].message}
          </p>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={CONFIRM_PASSWORD}>
            Confirm Password
          </label>
          <input 
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id={CONFIRM_PASSWORD}
            type='password'
            defaultValue={defaultValues[CONFIRM_PASSWORD]}
            {...register(CONFIRM_PASSWORD, registerOptions[CONFIRM_PASSWORD])} />
          <p className='text-red-500 text-xs italic'>
            {errors[CONFIRM_PASSWORD] && errors[CONFIRM_PASSWORD].message}
          </p>
        </div>
        
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={EXPIRED_DATE}>
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
          <p className='text-red-500 text-xs italic'>
            {errors[EXPIRED_DATE] && errors[EXPIRED_DATE].message}
          </p>
        </div>

        <div className='mb-4'>
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
          <p className='text-red-500 text-xs italic'>
            {errors[GROUP_ACCESS] && errors[GROUP_ACCESS].message}
          </p>
        </div>

        <button 
          className='bg-white hover:bg-gray-100 text-gray-800 font-normal ml-1 py-1 px-4 border border-gray-400 rounded shadow'
          onClick={handleCancel}> 
          Cancel 
        </button>
        <input 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold my-3 ml-1 py-1 px-4 rounded'
          type='submit' />        
      </form>
    </div>
  );
}