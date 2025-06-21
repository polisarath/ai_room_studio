import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const AddittionalReq = ({additionalRequirementInput}) => {
  return (
    <div className='mt-5'>
        <label htmlFor="" className='text-gray-600'>Enter Additional Requirements (Optional)</label>
        <Textarea className='mt-2' onChange={(e)=>additionalRequirementInput(e.target.value)}/>
    </div>
  )
}

export default AddittionalReq