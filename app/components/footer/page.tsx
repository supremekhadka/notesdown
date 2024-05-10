'use client'

import { usePathname } from 'next/navigation';
import React from 'react'


export default function Footer() {
  const pathname = usePathname();

  return (
   <>
    {pathname !== '/notes' && 
      (<div className='footer h-16 w-full flex justify-center items-center'>
          <h3>© 2024 Copyright: Supreme Khadka</h3>
      </div>)
    }

   </>
    
  )
}
