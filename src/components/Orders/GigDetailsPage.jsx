import React from 'react'
import { useParams } from 'react-router-dom'

const GigDetailsPage = () => {
    const {gigId} = useParams()
  return (
    <div>GigDetailsPage</div>
  )
}

export default GigDetailsPage