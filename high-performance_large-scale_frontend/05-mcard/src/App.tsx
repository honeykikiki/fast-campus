import Button from '@shared/Button'
import Text from '@shared/Text'
import TextFiled from '@shared/TextField'

function App() {
  return (
    <div>
      <Text typography={'t1'} display="block">
        t1
      </Text>
      <Text typography={'t2'}>t2</Text>
      <Text typography={'t3'}>t3</Text>
      <Text typography={'t4'}>t4</Text>
      <Text typography={'t5'}>t5</Text>
      <Text typography={'t6'}>t6</Text>
      <Text typography={'t7'}>t7</Text>
      <br />
      <br />
      <br />
      <Button size="small">클릭해주세요</Button>
      <Button size="medium" color="success">
        클릭해주세요
      </Button>
      <Button size="large" color="error">
        클릭해주세요
      </Button>
      <br />
      <Button size="small" weak={true}>
        클릭해주세요
      </Button>
      <Button size="medium" color="success" weak={true}>
        클릭해주세요
      </Button>
      <Button size="large" color="error" weak={true}>
        클릭해주세요
      </Button>

      <Button size="medium" full={true}>
        클릭해주세요
      </Button>
      <Button size="medium" full={true} disabled={true}>
        클릭해주세요
      </Button>
      <br />
      {/* <Input aria-invalid={true} />
      <Input /> */}
      <TextFiled label="아이디" />
      <TextFiled
        label="패스워드"
        hasError={true}
        helpMessage="비밀번호를 입력하세요."
      />
    </div>
  )
}

export default App
