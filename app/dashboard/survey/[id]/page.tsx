// 'use client'
// import { usePathname } from 'next/navigation'

export default function SurveyDetailPage({
  params,
}: {
  params: { id: string }
}) {
  //   const path = usePathname()
  console.log(params.id)

  return <div>{`survey detail: ${params.id}`}</div>
}
