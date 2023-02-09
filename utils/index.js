import * as React from 'react';

export const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  
export const validateName = (name) => {
  return name.match(
    /^[a-zA-Zà-ùÀ-Ú\s+]+$/g
  );
};

export const escape = (str) => {
  return str.replace(`'`, `''`)
}

export const captFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = React.useRef(true);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}