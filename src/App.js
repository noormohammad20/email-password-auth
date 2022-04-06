import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { getAuth } from "firebase/auth"
import app from './firebase.init'
import { Button, Form } from 'react-bootstrap'

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
    <div>
      <div className="registration w-50 mx-auto">
        <h2 className='text-primary mt-5'>Please Register!!</h2>
        <Form>
          <Form.Group onBlur={handlePasswordBlur} className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button onSubmit={handleFormSubmit} variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default App
