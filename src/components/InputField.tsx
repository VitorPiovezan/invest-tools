import { useState, useRef, useEffect } from 'react';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  helpText?: string;
}

export default function InputField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
  max,
  step = 1,
  helpText,
}: InputFieldProps) {
  const [displayValue, setDisplayValue] = useState(String(value));
  const isFocused = useRef(false);

  useEffect(() => {
    if (!isFocused.current) {
      setDisplayValue(String(value));
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDisplayValue(val);
    const num = Number(val);
    if (val !== '' && !isNaN(num)) {
      onChange(num);
    }
  };

  const handleBlur = () => {
    isFocused.current = false;
    if (displayValue === '' || isNaN(Number(displayValue))) {
      setDisplayValue(String(min));
      onChange(min);
    } else {
      setDisplayValue(String(Number(displayValue)));
    }
  };

  const handleFocus = () => {
    isFocused.current = true;
    if (Number(displayValue) === 0) {
      setDisplayValue('');
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-secondary">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          min={min}
          max={max}
          step={step}
          className={`w-full bg-surface-light border border-border rounded-xl py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all ${
            prefix ? 'pl-10' : 'pl-4'
          } ${suffix ? 'pr-14' : 'pr-4'}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
            {suffix}
          </span>
        )}
      </div>
      {helpText && <p className="text-xs text-text-muted">{helpText}</p>}
    </div>
  );
}
