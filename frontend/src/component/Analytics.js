import React from 'react'
import { Progress } from 'antd'

const Analytics = ({allTransection}) => {
    // category
    const categories = [
        'salary', 
        'tip',
        'project',
        'food',
        'movie',
        'bills',
        'medical',
        'fees',
        'tax', 
         ];
    // total transaction
    const totalTransaction = allTransection.lenght
    const totalIncomeTransactions = allTransection.filter(transaction => transaction.type === 'income')
    const totalExpenceTransactions = allTransection.filter(transaction => transaction.type === 'expense')
    const totalIncomePercent = (totalIncomeTransactions.lenght/totalTransaction) * 100
    const totalExpensePercent = (totalExpenceTransactions.lenght/totalTransaction) * 100

    // total turnover
    const totalTurnover = allTransection.reduce((acc, transaction) =>acc + transaction.amount, 0)
    const totalIncomeTurnover = allTransection.filter(transaction => transaction.type === 'income'
    ).reduce((acc,transaction) => acc + transaction.amount,0)

    const totalExpenseTurnOver = allTransection.filter(transaction => transaction.type === 'expense' 
    ).reduce((acc + transaction.amount, 0))

    const totalIncomeTurnoverPercent = (totalIncomeTurnover/totalTurnover) * 100 
    const totalExpenseTurnoverPercent = (totalExpenseTurnOver/totalTurnover) * 100
  return (
    <>
        <div className='row m-3'>
        <div className='col-md-4'>
            <div className='card'>
            <div className='card-header'>
                Total Transactions : {totalTransaction}
            </div>
            <div className='card-body'>
                <h5 className='text-success'>Income : {totalIncomeTransactions.lenght}</h5>
                <h5 className='text-danger'>Expense : {totalExpenceTransactions.lenght}</h5>
                <Progress type='circle' 
                strokeColor={'green'}
                className='mx-2'
                percent={totalIncomePercent.toFixed(0)}
                />
                <Progress type='circle' 
                strokeColor={'red'}
                className='mx-2'
                percent={totalExpensePercent.toFixed(0)}
                />
            </div>
            </div>
        </div>
        <div className='col-md-4'>
            <div className='card'>
            <div className='card-header'>
                Total totalTurnover : {totalTurnover}
            </div>
            <div className='card-body'>
                <h5 className='text-success'>Income : {totalIncomeTurnover}</h5>
                <h5 className='text-danger'>Expense : {totalExpenseTurnOver}</h5>
                <Progress type='circle' 
                strokeColor={'green'}
                className='mx-2'
                percent={totalIncomeTurnoverPercent.toFixed(0)}
                />
                <Progress type='circle' 
                strokeColor={'red'}
                className='mx-2'
                percent={totalExpenseTurnoverPercent.toFixed(0)}
                />
            </div>
            </div>
        </div>
        </div>
        <div className='row mt-3'>
        <div className='col-md-5'>
            <h4>Categorywise Income</h4>
            {
                categories.map(category => {
                    const amount = allTransection
                    .filter(
                    (transaction) => 
                    transaction.type === 'income' && 
                    transaction.category === category
                )
                .reduce((acc, transaction) =>acc + transaction.amount, 0);
                
                    
                })}
            </div>
        </div>
        

    </>
  )
}

export default Analytics