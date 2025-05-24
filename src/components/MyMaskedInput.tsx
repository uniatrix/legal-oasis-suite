import React, { forwardRef, useState, useEffect } from 'react';

interface MyMaskedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'ref'> {
    mask: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyMaskedInput = forwardRef<HTMLInputElement, MyMaskedInputProps>(({ mask, value = '', onChange, ...props }, ref) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value.replace(/\D/g, ''); // Remove non-digits

        // Format the phone number
        if (newValue.length > 0) {
            // Add opening parenthesis as soon as first digit is typed
            newValue = `(${newValue}`;

            if (newValue.length > 3) {
                // Add closing parenthesis after DDD
                newValue = `${newValue.slice(0, 3)}) ${newValue.slice(3)}`;

                if (newValue.length > 10) {
                    // Add hyphen after 5 digits of the phone number
                    newValue = `${newValue.slice(0, 10)}-${newValue.slice(10)}`;
                }
            }
        }

        // Limit the total length (including formatting characters)
        if (newValue.replace(/\D/g, '').length <= 11) {
            setInputValue(newValue);

            // Create a synthetic event to maintain compatibility with react-hook-form
            const syntheticEvent = {
                ...e,
                target: {
                    ...e.target,
                    value: newValue
                }
            };

            onChange?.(syntheticEvent);
        }
    };

    return (
        <input
            {...props}
            ref={ref}
            value={inputValue}
            onChange={handleChange}
            maxLength={15} // (XX) XXXXX-XXXX format has 15 characters
        />
    );
});

MyMaskedInput.displayName = 'MyMaskedInput';

export default MyMaskedInput; 