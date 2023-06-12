import { useCallback, useEffect, useState } from 'react';
import { StatsElement } from '~components/app/stats/stats-element.component';
import { ITransactionData } from '~types/app/transaction-types';
import { UserType } from '~types/app/user-types';

export const BankElement = () => {
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

  const { totalDeposits = 0, totalTransfers = 0, totalPayments = 0 } = transactions || {};

  return (
    <div
      data-testid='bank-element'
      className='gradient-form h-full bg-neutral-200 dark:bg-neutral-700'
    >
      <div className='min-h-screen w-full bg-gray-50 !pl-0 text-center sm:!pl-60' id='content'>
        <div className='p-12'>
          <h3 className='my-6 text-[1.75rem] font-medium leading-[1.2] flex justify-self-start text-gray-500'>
            Bank
          </h3>
          <div className='flex'>
            <StatsElement
              totalDeposits={totalDeposits}
              totalPaymens={totalPayments}
              totalTransfers={totalTransfers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
