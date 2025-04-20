import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href={'/'} className='flex items-center gap-2'>
        <Image src={'/image1.jpg'} alt='logo'
        width={60} height={70} className='rounded-full' />
    </Link>
  )
}

export default Logo