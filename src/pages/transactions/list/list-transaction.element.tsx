import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TableElement } from '~components/app/table/app-table.component';
import { ITransactionData } from '~types/app/transaction-types';
import { UserType } from '~types/app/user-types';
import { TABLE_HEADER } from './constants';

export const ListTransactionElement = () => {
  const [transactions, setTransactions] = useState<ITransactionData>();
  const dataUser = localStorage.getItem('user') || '';

  const { user, token } = JSON.parse(dataUser) as UserType;

  const { id } = user || {};

  const getTransactions = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3000/transactions/${id}`, {
        method: 'GET',
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

      const jsonResponse: ITransactionData = await response.json();
      setTransactions(jsonResponse);
    } catch (error) {
      alert('Something went wrong!');
      console.error(error);
    }
  }, [id, token]);

  useEffect(() => {
    if (transactions) return;
    getTransactions();
  }, [getTransactions, transactions]);

  const generateHead = () => TABLE_HEADER.map((header) => <th key={header}>{header}</th>);
  const generateRows = () =>
    transactions?.transaction.map((trans) => (
      <tr key={trans.id}>
        <th>{trans.bankAccount}</th>
        <th>{trans.operationType}</th>
        <th>{trans.amount}</th>
        <th>{trans.concept}</th>
      </tr>
    ));

  return (
    <div className='min-h-screen w-full bg-gray-50 !pl-0 text-center sm:!pl-60' id='content'>
      <div className='p-12'>
        <div className='flex flex-row justify-between'>
          <h3 className='my-6 text-[1.75rem] font-medium leading-[1.2] flex justify-self-start text-gray-500'>
            My Transactions
          </h3>
          <Link className='flex' to='/transactions/create' replace>
            <button className='self-center h-fit rounded-md bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
              Create
            </button>
          </Link>
        </div>
        <div className='rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700'>
          <TableElement head={generateHead()} rows={generateRows() || []} />
        </div>
      </div>
    </div>
  );
};
