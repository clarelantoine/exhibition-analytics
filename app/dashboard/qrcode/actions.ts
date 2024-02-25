// HOVERCODE_WORKSPACE_ID
// HOVERCODE_API_TOKEN
'use server'

import { NextResponse } from 'next/server'

// const hoverCodeConfig = {
//     workspace: process.env.HOVERCODE_WORKSPACE_ID
// }

export const createQrCode = async () => {
  const body = {
    workspace: process.env.HOVERCODE_WORKSPACE_ID,
    qr_data: 'https://clarel-antoine.com',
    dynamic: true,
    display_name: 'test create qr code',
    frame: 'border',
    pattern: 'Original',
  }

  const res = await fetch('https://hovercode.com/api/v2/hovercode/create/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.HOVERCODE_API_TOKEN}`,
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  return data
}

export const getQrCode = async (id: string) => {
  const res = await fetch(`https://hovercode.com/api/v2/hovercode/${id}/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.HOVERCODE_API_TOKEN}`,
    },
  })

  const data = await res.json()

  return data
}
