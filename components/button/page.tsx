'use client'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()
  return (
     <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f6f8',
      }}
    >
      



        <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: '#0070f3',
              color: '#ffffff',
            }}

            onClick={()=>router.push('/signin')}
          >
            Log out
          </button>
    </div>
  )
}

export default page
