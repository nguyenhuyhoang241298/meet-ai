'use client'

import { Button } from '@/components/ui/button'
import { signIn } from '@/lib/auth/auth-client'
import Image from 'next/image'

const SocialLogin = () => {
  const signInWithGoogle = async () => {
    await signIn.social({
      provider: 'google',
    })
  }

  const signInWithGithub = async () => {
    await signIn.social({
      provider: 'github',
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Button onClick={signInWithGoogle} className="flex-1" variant={'outline'}>
        <Image src="/google.svg" alt="Google" width={20} height={20} /> Google
      </Button>
      <Button onClick={signInWithGithub} className="flex-1" variant={'outline'}>
        <Image src="/github.svg" alt="Github" width={20} height={20} /> Github
      </Button>
    </div>
  )
}

export default SocialLogin
