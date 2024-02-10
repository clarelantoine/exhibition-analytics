'use client'

import { signout } from '../actions'

export default function LogoutButton() {
  return <button onClick={() => signout()}>Logout</button>
}
