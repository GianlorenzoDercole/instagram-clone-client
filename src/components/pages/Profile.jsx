import { useState, useEffect } from 'react'
import axios from 'axios'
import FileUploadForm from '../FileUploadForm'
import { MailIcon, PhotographIcon } from '@heroicons/react/outline'

export default function Profile({
  currentUser: { name, email },
  handleLogout,
}) {
  // state for the secret message for user priv data
  const [msg, setMsg] = useState('')

  // useEffect for getting the user data and checking auth
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get the token from local storage
        const token = localStorage.getItem('jwt')
        // make the auth headers
        const options = {
          headers: {
            Authorization: token,
          },
        }
        // hit the auth locked endpoint
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`,
          options
        )
        // set the secret user message in state
        setMsg(res.data.msg)
      } catch (err) {
        console.warn(err)
        // if the error is 401 -- that means the auth failed
        if (err.res) {
          if (err.res.status === 401) {
            handleLogout()
          }
        }
      }
    }
    fetchData()
  })

  return (
    <div>
      <div className="h-fit mt-10 bg-white flex flex-col justify-center items-center">
        <div className="bg-gray-100 rounded-xl mb-20 border-gray-300 w-200 p-10 flex flex-col items-center shadow-lg">
          <h1 className='font-bold' >Hello, {name}</h1>
          
          <form class="flex items-center space-x-8">
            <div className="shrink-0">
              <img class="h-40 w-40 object-cover rounded-full" src="avataricon.png" alt="profileplacholder" />
            </div>
            <label class="block">
              <span class="sr-only">Choose profile photo</span>
              <input type="file" class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                                        file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-300" />
              </label>
          </form>
          
  
            <table class="border-gray-300">
              <tbody>
                <tr>
                  <td class="p-2 border-gray-300"><MailIcon className='h-6 w-6 text-purple-500' /></td>
                  <td class="p-2 border-grey-300 font-bold">{email}</td>
                </tr>
              </tbody>
            </table>

          <div class='mt-10 flex flex-col justify-center items-center'>
                <h2>
                  Here is the secret message that is only available to users of User App:{' '}
                </h2>
              <h3>{msg}</h3>
          </div>

          <FileUploadForm />
        </div>
      </div>

      <h1 class='font-bold text-center underline underline-offset-8 mb-8' > Your Posts </h1>
        <div class='grid grid-cols-3'>
          <PhotographIcon className="m-auto rounded-lg hover:ring ring-purple-400 object-left-top w-44 h-44" />
          <PhotographIcon className="m-auto rounded-lg hover:ring ring-purple-400 object-top w-44 h-44" />
          <PhotographIcon className="m-auto rounded-lg hover:ring ring-purple-400 object-right-top w-44 h-44" />
          <PhotographIcon className="m-auto rounded-lg hover:ring ring-purple-400 object-left w-44 h-44" />
          <PhotographIcon className="m-auto rounded-lg hover:ring ring-purple-400 object-center w-44 h-44" />
          <PhotographIcon className="m-auto rounded-lg hover:ring ring-purple-400 object-right w-44 h-44" />
          <PhotographIcon className="m-auto rounded-lg hover:ring ring-purple-400 object-left-bottom w-44 h-44" />
          <PhotographIcon className="m-auto rounded-lg hover:ring ring-purple-400 object-bottom w-44 h-44" />
          <PhotographIcon className="m-auto rounded-lg hover:ring ring-purple-400 object-right-bottom w-44 h-44" />
      </div>
      
    </div>
  )
}
