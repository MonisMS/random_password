import { useState,useCallback,useEffect,useRef} from 'react'



function App() {
const [length,setLength]=useState(5)
const [numberAllowed,setNumberAllowed]=useState(false)
const [charAllowed,setCharAllowed]=useState(false)
const [password,setPassword]=useState("")
//use ref hook
const passwordRef=useRef(null)
const passGenerator=useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if (numberAllowed) {
    str+="0123456789"
  }
  if (charAllowed) {
    str+="!@#$%^&*(){}[]`><:;_-=+"
  }
  for (let i = 1; i <=length; i++){
    let char=Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char)
  }
  setPassword(pass)
},[length,numberAllowed,charAllowed,setPassword])

const copyPasswordToClipboard=useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange()
window.navigator.clipboard.writeText(password)
},[password])
useEffect(()=>{
  passGenerator()},[length,numberAllowed,charAllowed,passGenerator])
  


  return (
    <>
    
      <div className=' w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-400 bg-gray-700 justify-items-center'>
        <h1 className='text-white text-center'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
          type='text'
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}/>
          <button 
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>

        </div>
        <div className='flex text-sm gap-x-2'>
        <div className='flex items-centre gap-x-1'>
          <input type='range'
          min={5}
          max={50}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}/>
          
          <label>Length:{length}</label>
        </div>
        <div className='flex items-centre gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={()=>{
            setNumberAllowed((prev)=>!prev)    //jo previous value hogi uko change kar dega agar true to false and vice versa

          }}
          />
          <label htmlFor='numberInput'>Numbers</label>




        </div>
        <div className='flex items-centre gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={charAllowed}
          id='charInput'
          onChange={()=>{
            setCharAllowed((prev)=>!prev)
          }}
          />
          <label htmlFor='charInput'>Characters</label>

        </div>
      </div>
      </div>
    </>
  )
}

export default App
