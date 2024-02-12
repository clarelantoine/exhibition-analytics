import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='flex justify-between mt-auto container px-5 py-7 text-sm'>
      <p>Copyright © 2024</p>
      <p>
        Developed by{' '}
        <Link
          className='font-medium'
          target='_blank'
          href='https://clarelantoine.com'
        >
          CA.
        </Link>
      </p>
    </footer>
  )
}
