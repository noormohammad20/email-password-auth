import './App.css'
import { getAuth } from "firebase/auth"
import app from './firebase.init'

const auth = getAuth(app)

function App() {
  const handleEmailBlur = e => {
    console.log(e.target.value)
  }
  const handlePasswordBlur = e => {
    console.log(e.target.value)
  }
  const handleFormSubmit = e => {
    e.preventDefault()
    console.log('form submited')
  }

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit} action="">
        <input onBlur={handleEmailBlur} type="email" name="" id="" />
        <br />
        <input onBlur={handlePasswordBlur} type="password" name="" id="" />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default App
