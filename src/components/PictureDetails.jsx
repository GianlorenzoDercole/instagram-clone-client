// *user looking at the picture that isnt the current user*

// display the details of a single picture (picture, caption)
// edit inline caption of picture // MAKE SURE THAT THE PICTURE BELONGS TO CURRENTUSER

// display all of the comments on the picture

// needs a comment form
// inline edit input for editing the comment

import React from 'react'

export default function PictureDetails({
  picture: { cloudId, caption },
  modalToggle,
  setModalToggle,
}) {
  return (
    <div onClick={() => setModalToggle(!modalToggle)}>
      <img
        src={`https://res.cloudinary.com/dshcawt4j/image/upload/w_310,h_200,c_scale/${cloudId}.png`}
        alt='cloudId'
      />
      <p>{caption}</p>
    </div>
  )
}
