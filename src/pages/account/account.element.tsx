import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserType } from '~types/app/user-types';

export const AccountElement = () => {
  const [address, setAddress] = useState<string>();
  const [phone, setPhone] = useState<number>();
  const [password, setPassword] = useState<string>();

  const dataUser = localStorage.getItem('user') || '';

  const { user, token } = JSON.parse(dataUser) as UserType;

  const {
    id,
    account,
    name,
    roles,
    lastName,
    address: defaultAddres,
    phone: defaultPhone,
    password: defaultPassword,
  } = user || {};

  const isAdmin = Boolean(roles.find((role) => role === 'admin'));

  const handleAddress = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;
    setAddress(value);
  };
  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;
    setPhone(Number(value));
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;
    setPassword(value);
  };

  const handleSubmit = async () => {
    const data = {
      address: address ?? defaultAddres,
      phone: phone ?? defaultPhone,
      password: password ?? defaultPassword,
    };

    try {
      const response = await fetch(`http://localhost:3000/auth/${id}`, {
        body: JSON.stringify(data),
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        alert('Something went wrong!');
        return;
      }

      const jsonResponse = await response.json();
      localStorage.setItem('user', JSON.stringify(jsonResponse));
      window.location.reload();
    } catch (error) {
      alert('Something went wrong!');
      console.error(error);
    }
  };

  return (
    <div data-testid='account-element'>
      <div className='min-h-screen w-full bg-gray-50 px-40 pt-12 pb-12 pl-80' id='content'>
        <h3 className='my-6 pl-12 mt-0 text-[1.75rem] font-medium leading-[1.2] flex justify-self-start text-gray-500'>
          Account
        </h3>
        <div className='max-h-fit p-12 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
          <div className='space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3'>
                <div className='sm:col-span-1'>
                  <label
                    htmlFor='username'
                    className='block text-lg font-medium leading-8 text-gray-900'
                  >
                    Username
                  </label>
                  <div className='mt-2'>
                    <span id='username' className='block text-gray-500 leading-6'>
                      {account}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='border-b border-gray-900/10 pb-12'>
              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3'>
                <div className='sm:col-span-1'>
                  <label
                    htmlFor='first-name'
                    className='block text-lg font-medium leading-6 text-gray-900'
                  >
                    First name
                  </label>
                  <div className='mt-2'>
                    <span id='first-name' className='block text-base text-gray-500 leading-6'>
                      {name}
                    </span>
                  </div>
                </div>
                <div className='sm:col-span-1'>
                  <label
                    htmlFor='last-name'
                    className='block text-lg font-medium leading-6 text-gray-900'
                  >
                    Last name
                  </label>
                  <div className='mt-2'>
                    <span id='last-name' className='block w-full text-gray-500 text-base leading-6'>
                      {lastName}
                    </span>
                  </div>
                </div>
                <div className='col-span-1'>
                  <label
                    htmlFor='street-address'
                    className='block text-lg font-medium leading-6 text-gray-900'
                  >
                    Address
                  </label>
                  <div className='mt-2'>
                    <input
                      type='text'
                      name='street-address'
                      defaultValue={defaultAddres}
                      id='street-address'
                      maxLength={32}
                      autoComplete='street-address'
                      placeholder='Streen 123'
                      onChange={handleAddress}
                      className='block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
                <div className='col-span-1'>
                  <label
                    htmlFor='phone'
                    className='block text-lg font-medium leading-6 text-gray-900'
                  >
                    Phone
                  </label>
                  <div className='mt-2'>
                    <input
                      type='text'
                      name='phone'
                      id='phone'
                      defaultValue={defaultPhone}
                      maxLength={32}
                      placeholder='4433221100'
                      autoComplete='tel'
                      onChange={handlePhone}
                      className='block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>
                <div className=''>
                  <label
                    htmlFor='password'
                    className='block text-lg font-medium leading-6 text-gray-900'
                  >
                    Password
                  </label>
                  <div className='mt-2'>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      maxLength={32}
                      autoComplete='new-password'
                      placeholder='password'
                      onChange={handlePassword}
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:sm-lg sm:leading-6'
                    />
                  </div>
                </div>
                <div>
                  <h2 className='text-lg font-semibold leading-7 text-gray-900'>User Type</h2>
                  <div className='flex flex-row'>
                    <legend className='text-base basis-1/2 font-semibold leading-6 text-gray-900 flex h-6 mt-2'>
                      Is an Admnistrator?
                    </legend>
                    <div className='mt-2 space-y-6 basis-1/8'>
                      <div className='relative flex gap-x-3'>
                        <div className='flex h-6 items-center'>
                          <input
                            id='comments'
                            name='comments'
                            type='checkbox'
                            disabled
                            checked={isAdmin}
                            className='h-4 w-4 rounded ml-2 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <button type='button' className='text-lg font-semibold leading-6 text-gray-900'>
              <Link to='/bank'>Cancel</Link>
            </button>
            <button
              className='rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
