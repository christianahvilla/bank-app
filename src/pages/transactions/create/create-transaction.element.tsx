import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserType } from '~types/app/user-types';

export const CreateTransactionElement = () => {
  const navigate = useNavigate();
  const [bankAccount, setBankAccount] = useState<string>();
  const [operationType, setOperationType] = useState<string>('P');
  const [amount, setAmount] = useState<string>();
  const [concept, setConcept] = useState<string>();
  const dataUser = localStorage.getItem('user') || '';

  const { token } = JSON.parse(dataUser) as UserType;

  const handleBankAccount = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;
    setBankAccount(value);
  };

  const handleOperationType = (e: SyntheticEvent<HTMLSelectElement, Event>) => {
    const { nativeEvent } = e;
    const { target } = nativeEvent;
    const { value } = target as any;
    console.log(operationType);
    setOperationType(value);
  };

  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;
    setAmount(value);
  };

  const handleConcept = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;
    setConcept(value);
  };

  const handleSubmit = async () => {
    const data = {
      bankAccount,
      operationType,
      amount,
      concept,
    };

    try {
      const response = await fetch('http://localhost:3000/transactions', {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 201) {
        alert('Something went wrong!');
        return;
      }

      navigate('/transactions/list');
    } catch (error) {
      alert('Something went wrong!');
      console.error(error);
    }
  };

  return (
    <div data-testid='create-transaction-element'>
      <div className='min-h-screen w-full bg-gray-50 !pl-0 text-center sm:!pl-60' id='content'>
        <div className='p-12'>
          <div className='flex flex-row  flex-nowrap'>
            <button
              type='button'
              className='text-lg flex items-center pr-2 font-semibold leading-6 text-gray-900'
            >
              <Link to='/transactions/list' replace>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                  />
                </svg>
              </Link>
            </button>
            <h3 className='my-6 text-[1.75rem] font-medium leading-[1.2] flex justify-self-start text-gray-500'>
              Create Transaction
            </h3>
          </div>
          <div className='max-h-fit p-12 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
            <div className='space-y-12'>
              <div className='pb-12'>
                <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2'>
                  <div className='sm:col-span-1'>
                    <label
                      htmlFor='bankaccount'
                      className='block text-lg font-medium leading-8 text-gray-900'
                    >
                      Bank Account
                    </label>
                    <div className='mt-2'>
                      <input
                        type='number'
                        name='bankaccount'
                        id='bankaccount'
                        maxLength={32}
                        onChange={handleBankAccount}
                        className='block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                  <div className='sm:col-span-1'>
                    <label
                      htmlFor='operation-type'
                      className='block text-lg font-medium leading-6 text-gray-900'
                    >
                      Operation Type
                    </label>
                    <div className='mt-2'>
                      <select
                        id='operation-type'
                        className='select select-bordered w-full focus-within:ring-indigo-600'
                        value={operationType}
                        onChange={handleOperationType}
                      >
                        <option value='P'>Payment</option>
                        <option value='D'>Deposint</option>
                        <option value='T'>Transfer</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className='border-b border-gray-900/10 pb-12'>
                <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2'>
                  <div className='sm:col-span-1'>
                    <label
                      htmlFor='amount'
                      className='block text-lg font-medium leading-6 text-gray-900'
                    >
                      Amount
                    </label>
                    <div className='mt-2'>
                      <input
                        type='number'
                        name='amount'
                        id='amount'
                        maxLength={32}
                        onChange={handleAmount}
                        className='block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                  <div className='col-span-1'>
                    <label
                      htmlFor='concept'
                      className='block text-lg font-medium leading-6 text-gray-900'
                    >
                      Concept
                    </label>
                    <div className='mt-2'>
                      <input
                        type='text'
                        name='concept'
                        id='concept'
                        maxLength={16}
                        onChange={handleConcept}
                        className='block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-6 flex items-center justify-end gap-x-6'>
              <button type='button' className='text-lg font-semibold leading-6 text-gray-900'>
                <Link to='/transactions/list'>Cancel</Link>
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
    </div>
  );
};
