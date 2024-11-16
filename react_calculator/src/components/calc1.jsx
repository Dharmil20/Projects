import { useState } from 'react'

function Calculator1() {
  const [ans, setAns] = useState("")
  const [operator, setoperator] = useState()

  function handleEqual() {
    const cpy_arr = [...ans].join('').split(operator) // ["12","21","30"]
    console.log(cpy_arr)
    switch (operator) {
      case '+':
        const sum = parseFloat(cpy_arr[0]) + parseFloat(cpy_arr[1])
        setAns(`${sum}`)
        break;
      case '-':
        const diff = parseFloat(cpy_arr[0]) - parseFloat(cpy_arr[1])
        setAns(`${diff}`)
        break;
      case '*':
        const prod = parseFloat(cpy_arr[0]) * parseFloat(cpy_arr[1])
        setAns(`${prod}`)
        break;
      case '/':
        if (parseFloat(cpy_arr[1]) !== 0) {
          var cal = parseFloat(cpy_arr[0]) / parseFloat(cpy_arr[1])
          setAns(`${cal}`)
          break;
        } else {
          setAns('Undef')
          break;
        }
    }
  }

  return (
    <>
      <h2>{ans||0}</h2>
      <button onClick={() => {
        setAns([...ans, 1])
      }}>1</button>
      <button onClick={() => {
        setAns([...ans, 2])
      }}>2</button>
      <button onClick={() => {
        setAns([...ans, 3])
      }}>3</button>
      <button onClick={() => {
        setAns([...ans, 0])
      }}>0</button>
      <button onClick={() => {
        setAns([...ans, '.'])
      }}>.</button>
      <button onClick={() => {
        setAns([...ans, '+'])
        setoperator('+')
      }}>+</button>
      <button onClick={() => {
        setAns([...ans, '-'])
        setoperator('-')
      }}>-</button>
      <button onClick={() => {
        setAns([...ans, '*'])
        setoperator('*')
      }}>*</button>
      <button onClick={() => {
        setAns([...ans, '/'])
        setoperator('/')
      }}>/</button>
      <button onClick={handleEqual}>=</button>
      <button onClick={() => { setAns('') }}>Res</button>
    </>
  )
}

export default Calculator1;