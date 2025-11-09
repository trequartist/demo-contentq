import * as React from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "./textarea";

export interface TextareaWithCounterProps extends React.ComponentProps<"textarea"> {
  maxLength?: number;
  showCounter?: boolean;
  helperText?: string;
  error?: string;
}

const TextareaWithCounter = React.forwardRef<HTMLTextAreaElement, TextareaWithCounterProps>(
  ({ className, maxLength, showCounter = true, helperText, error, ...props }, ref) => {
    const [value, setValue] = React.useState<string>(
      (props.value as string) || (props.defaultValue as string) || ""
    );

    React.useEffect(() => {
      if (props.value !== undefined) {
        setValue(props.value as string);
      }
    }, [props.value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (!maxLength || newValue.length <= maxLength) {
        setValue(newValue);
        props.onChange?.(e);
      }
    };

    const currentLength = value.length;
    const isNearLimit = maxLength && currentLength >= maxLength * 0.8;
    const isAtLimit = maxLength && currentLength >= maxLength;

    return (
      <div className="w-full space-y-1.5">
        <Textarea
          ref={ref}
          className={cn(
            "focus-visible:animate-focus-pulse",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          {...props}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
        />
        
        {(showCounter || helperText || error) && (
          <div className="flex items-center justify-between gap-2 px-1">
            {error ? (
              <p className="text-xs font-medium text-destructive">{error}</p>
            ) : helperText ? (
              <p className="text-xs text-muted-foreground">{helperText}</p>
            ) : (
              <span />
            )}
            
            {showCounter && maxLength && (
              <span
                className={cn(
                  "text-xs transition-colors duration-200",
                  isAtLimit && "font-medium text-destructive",
                  isNearLimit && !isAtLimit && "font-medium text-warning",
                  !isNearLimit && "text-muted-foreground"
                )}
              >
                {currentLength}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

TextareaWithCounter.displayName = "TextareaWithCounter";

export { TextareaWithCounter };
