'use client'
import Link from 'next/link'
import React from 'react'

export default function Home (props: any): React.ReactElement {
  return (
      <>
        <h1><Link href='/scan'>Scan</Link></h1>
      </>
  )
}
