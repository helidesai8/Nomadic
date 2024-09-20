// author: Smit Patel
import React from 'react'

const ErrorComponent = (props: {
    error?: Error,
}) => {
    console.log("err", JSON.stringify(props.error))
  return (
    <div>
        <h1 className="text-3xl">Something went wrong</h1>
        <p>{props.error?.message}</p>
    </div>
  )
}

export default ErrorComponent