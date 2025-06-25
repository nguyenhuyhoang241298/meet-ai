import { cn } from '@/lib/utils'
import { botttsNeutral, initials } from '@dicebear/collection'
import { createAvatar } from '@dicebear/core'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'

type GeneratedAvatarProps = {
  seed: string
  className?: string
  variant?: 'initials' | 'botttsNeutral'
}

const GeneratedAvatar = ({
  seed,
  className,
  variant,
}: GeneratedAvatarProps) => {
  let avatar

  if (variant === 'botttsNeutral') {
    avatar = createAvatar(botttsNeutral, {
      seed,
    })
  } else {
    avatar = createAvatar(initials, {
      seed,
      fontWeight: 500,
      fontSize: 36,
    })
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar?.toDataUri()} alt="Avatar" />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  )
}

export default GeneratedAvatar
