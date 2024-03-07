// HOVERCODE_WORKSPACE_ID
// HOVERCODE_API_TOKEN
// 'use server'

// import { NextResponse } from 'next/server'

// import { revalidatePath } from 'next/cache'
// import { z } from 'zod'
// import { cookies } from 'next/headers'
// import { createClient } from '@/utils/supabase/server'

// export async function creatQrAction(
//   prevState: { message: string },
//   formData: FormData,
// ) {
//   //  create supabase client
//   const cookieStore = cookies()
//   const supabase = createClient(cookieStore)

//   //   get auth user id
//   const { data } = await supabase.auth.getUser()
//   const authUserID = data.user.id

//   //   validate qr form data
//   const schema = z.object({
//     name: z.string().min(1),
//     url: z.string().min(1),
//   })
//   const parse = schema.safeParse({
//     name: formData.get('name'),
//     url: formData.get('url'),
//   })

//   if (!parse.success) {
//     return { message: 'Failed to create qr code' }
//   }

//   const qrFormData = parse.data

//   // qr code config
//   const body = {
//     workspace: process.env.NEXT_PUBLIC_HOVERCODE_WORKSPACE_ID!,
//     qr_data: qrFormData.url,
//     dynamic: true,
//     display_name: qrFormData.name,
//     frame: 'border',
//     pattern: 'Original',
//   }

//   //   create qr code
//   const res = await fetch('https://hovercode.com/api/v2/hovercode/create/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Token ${process.env.NEXT_PUBLIC_HOVERCODE_API_TOKEN!}`,
//     },
//     body: JSON.stringify(body),
//   })

//   const qrData = await res.json()

//   // store created qr code detail in db
//   const { error } = await supabase.from('qrcode').insert({
//     user_id: authUserID,
//     qr_id: qrData.id,
//     display_name: qrData.display_name,
//   })

//   if (error) {
//     return { message: 'Failed to create qr code' }
//   }

//   revalidatePath('/dashboard/qrcode')
//   return { message: 'qr code created' }
// }

// export async function getQrAction() {
//   const cookieStore = cookies()
//   const supabase = createClient(cookieStore)

//   const { data, error } = await supabase.from('qrcode').select()

//   let qrArray = []

//   for (let item of data) {
//     try {
//       const res = await fetch(
//         `https://hovercode.com/api/v2/hovercode/${item.qr_id}/`,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//             Authorization: `Token ${process.env
//               .NEXT_PUBLIC_HOVERCODE_API_TOKEN!}`,
//           },
//         },
//       )

//       const data = await res.json()

//       qrArray.push(data.svg)
//     } catch (error) {}
//   }

//   if (error) {
//     console.log('error in fetching:', error)
//   } else {
//     // console.log('fetch data:', data)
//     return qrArray
//   }
// }
