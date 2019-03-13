import React from "react"

// TODO: get these from json
const PHONE_NO = "+49 (0)172 1008 431"
const EMAIL = "sacha@sachahoechstetter.com"



export const Phone = () => {
	return PHONE_NO
}

export const Email = () => {
	return (
    <a href = { `mailto:${ EMAIL }` }>{ EMAIL }</a>
  )
}
