import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import app from './firebase.init'
import { Button, Form } from 'react-bootstrap'
import { useState } from 'react'

const auth = getAuth(app)

function App() {
  const [registered, setRegistered] = useState(false)
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleNameBlur = event => {
    setName(event.target.value)
  }

  const handleEmailBlur = event => {
    setEmail(event.target.value)
  }

  const handlePasswordBlur = event => {
    setPassword(event.target.value)
  }

  const handleRegisteredChanged = event => {
    setRegistered(event.target.checked)
  }

  const handleFormSubmit = event => {

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      setError('You Must Be Use An Uppercase Word')
      return
    }
    setValidated(true)
    setError('')

    if (registered) {
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user
          console.log(user)
        })
        .catch(error => {
          console.error(error)
          setError(error.message)
        })
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user
          console.log(user)
          setEmail('')
          setPassword('')
          verifyEmail()
          setUserName()
        })
        .catch(error => {
          console.error(error)
          setError(error.message)
        })
    }
    event.preventDefault()
  }

  const passwordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('rest email send')
      })
  }

  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        console.log('updating name')
      })
      .catch((error) => {
        setError(error.message)
      })
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email Verification sent')
      })
  }
  return (
    <div>
      <div className="registration w-50 mx-auto">
        <h2 className='text-primary mt-5'>Please {registered ? 'Login' : 'Register'}!!</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>

          {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name</Form.Label>
            <Form.Control onBlur={handleNameBlur} type="text" placeholder="Your Name" required />
            <Form.Control.Feedback type="invalid">
              Please provide your name.
            </Form.Control.Feedback>
          </Form.Group>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChanged} type="checkbox" label="Already Registered?" />
          </Form.Group>
          <Button onClick={passwordReset} variant="link">Forget Password?</Button>
          <br />
          <p className='text-danger'> {error}</p>
          <Button variant="primary" type="submit">
            {registered ? 'Login' : ' Register'}
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default App
