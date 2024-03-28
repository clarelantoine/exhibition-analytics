// 'use client'

import { CreateSurveyForm } from './components/CreateSurveyForm'
import SurveyList from './components/SurveyList'

// import { useEffect, useState } from 'react'
// import { DbQrData, QrDetails } from '@/utils/interface/qrInterface'
// import { createClient } from '@/utils/supabase/client'

export default async function SurveyPage() {
  return (
    <div className=' h-full grid items-start gap-8'>
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-3xl font-semibold tracking-tight'>Survey</h1>
          <p className='text-lg text-muted-foreground'>
            Create and manage survey.
          </p>
        </div>
        <CreateSurveyForm />
      </div>
      {/* <QRList items={data} /> */}
      <SurveyList />
    </div>
  )
}
