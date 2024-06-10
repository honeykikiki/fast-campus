import { ChangeEvent, useState } from 'react'
import Spacing from '../shared/Spacing'
import Select from '../shared/Select'
import Button from '@shared/Button'
import Flex from '@shared/Flex'
import TextFiled from '@shared/TextField'
import { createTransaction } from '@/remote/transaction'
import { getAccount, updateAccountBalance } from '@/remote/account'
import { Transaction } from '@/models/transaction'

function TransactionForm() {
  const [formValues, setFormValues] = useState({
    userId: '',
    type: 'deposit',
    amount: '',
    displayText: '',
  })

  const handleFormValues = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async () => {
    const account = await getAccount(formValues.userId)
    if (account == null) {
      alert('계좌먼저 만들어주세요.')
      return
    }

    if (
      formValues.type === 'withdraw' &&
      account.balance - Number(formValues.amount) < 0
    ) {
      alert(`지금 유저의 잔액은 ${account.balance} 입니다.`)

      return
    }

    const balance =
      formValues.type === 'withdraw'
        ? account.balance - Number(formValues.amount)
        : account.balance + Number(formValues.amount)

    const newTransaction = {
      ...formValues,
      amount: Number(formValues.amount),
      date: new Date().toISOString(),
      balance,
    } as Transaction

    // 1. 거래 기록
    // 2. 잔고 업데이트
    Promise.all([
      createTransaction(newTransaction),
      updateAccountBalance(formValues.userId, balance),
    ])

    alert('완료')
  }

  return (
    <Flex direction="column">
      <TextFiled
        value={formValues.userId}
        label="userId"
        name="userId"
        onChange={handleFormValues}
      />
      <Spacing size={16} />
      <Select
        value={formValues.type}
        onChange={handleFormValues}
        name="type"
        options={[
          { label: '입금', value: 'deposit' },
          { label: '출금', value: 'withdraw' },
        ]}
      />
      <Spacing size={8} />
      <TextFiled
        value={formValues.amount}
        label="입출금 급액"
        name="amount"
        onChange={handleFormValues}
      />
      <Spacing size={8} />
      <TextFiled
        value={formValues.displayText}
        label="화면에 노출할 텍스트"
        name="displayText"
        onChange={handleFormValues}
      />
      <Spacing size={8} />
      <Button onClick={handleSubmit}>
        {formValues.type === 'deposit' ? '입금' : '출금'}
      </Button>
    </Flex>
  )
}

export default TransactionForm
