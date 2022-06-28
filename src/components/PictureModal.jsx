import React, { useState } from 'react'
import axios from 'axios'

export default function PictureModal({
  picture,
  setModalToggle,
  modalToggle,
  name,
  currentUser,
  userId,
  setUserProfile,
}) {
  const [commentFormData, setCommentFormData] = useState({
    user: currentUser.name,
    content: '',
    picture,
  })

  //   console.log(currentUser)

  const serverUrl = process.env.REACT_APP_SERVER_URL

  const allComments = picture.comments.map(comment => {
    const { user, content } = comment
    return (
      <div key={comment._id}>
        <h2>{user}</h2>
        <p>{content}</p>
      </div>
    )
  })

  const handleCommentSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post(
        `${serverUrl}/api-v1/pictures/${picture._id}/comment`,
        commentFormData
      )
      const userRes = await axios.get(`${serverUrl}/api-v1/users/${userId}`)
      setUserProfile(userRes.data)

      setCommentFormData({ ...commentFormData, content: '' })
      //   console.log(res)
    } catch (err) {
      console.warn(err)
    }
  }
  return (
    <div
      id='medium-modal'
      tabIndex='-1'
      className='text-center flex mx-auto items-center justify-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full'
    >
      <div className='relative p-4 w-full max-w-lg h-full md:h-auto'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
          <div className='flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600'>
            <h3 className='text-xl font-medium text-gray-900 dark:text-white'>
              {name}
            </h3>
            {/* Modal close btn */}
            <button
              onClick={() => setModalToggle(!modalToggle)}
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
              data-modal-toggle='medium-modal'
            >
              <svg
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </button>
            {/* modal close btn end */}
          </div>

          <div className='p-6 space-y-6'>
            <img src='http://placekitten.com/200/300' alt='placeholder' />
            {/* make all comments in its own scrolling containter */}
            {allComments}
            <form onSubmit={handleCommentSubmit}>
              <label htmlFor='comment'>Make a comment: </label>
              <input
                type='text'
                id='comment'
                value={commentFormData.content}
                onChange={e =>
                  setCommentFormData({
                    ...commentFormData,
                    content: e.target.value,
                  })
                }
              />

              <button>Submit</button>
            </form>
          </div>

          <div className='flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600'>
            <button
              data-modal-toggle='medium-modal'
              type='button'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              I accept
            </button>
            <button
              onClick={() => setModalToggle(!modalToggle)}
              data-modal-toggle='medium-modal'
              type='button'
              className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}