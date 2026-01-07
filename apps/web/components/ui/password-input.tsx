import * as React from 'react'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { cn } from '../../lib/utils'
import { Button } from './button'
import { Input } from './input'

type PasswordInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
>

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    return (
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn(
            // MARK: Space for toggle button
            "pr-10",
            className
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        <Button
          type='button'
          size='icon'
          variant='outline'
          disabled={disabled}
          className='text-foreground-secondary-secondary/70 hover:text-brand absolute right-1.5 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg hover:bg-brand/10 transition-colors'
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <IconEye size={18} /> : <IconEyeOff size={18} />}
        </Button>
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
