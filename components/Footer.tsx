import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className='container flex justify-between py-5 text-sm'>
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
      </div>
    </footer>
  )
}
