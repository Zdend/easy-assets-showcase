import throttle from 'lodash.throttle';
import { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { FieldInputProps } from 'formik';

const DEFAULT_OPTIONS = {
  delay: 1000,
  eager: false
};

export interface LazyOnChangeOptions {
  delay?: number;
  eager?: boolean;
}

function useLazyOnChange<E extends HTMLInputElement | HTMLTextAreaElement>(
  field: FieldInputProps<string>,
  options: LazyOnChangeOptions
): [string, (e: ChangeEvent<E>) => void] {
  const delay = options.delay || DEFAULT_OPTIONS.delay;

  const [inputValue, setInputValue] = useState(field.value);
  const throttledOnChange = useCallback(
    options.eager ? field.onChange : throttle(field.onChange, delay),
    []
  );

  const onChange = useCallback(
    (e: ChangeEvent<E>) => {
      e.persist();
      throttledOnChange(e);

      setInputValue(e.target.value);
    },
    [field.name]
  );

  useEffect(() => {
    if (inputValue !== field.value) {
      setInputValue(field.value);
    }
  }, [field.value]);

  return [inputValue, onChange];
}

export default useLazyOnChange;
