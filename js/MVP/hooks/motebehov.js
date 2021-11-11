import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getMotebehov } from '../services/motebehov';

const MOTEBEHOV = 'motebehov';

export const useMotebehov = () => {
  return useQuery(MOTEBEHOV, getMotebehov);
};

export const useFeiloppsumeringList = (formState) => {
  const [errorList, setErrorList] = useState([]);

  const { errors } = formState;

  useEffect(() => {
    const keys = Object.keys(errors);
    const list = keys.map((key) => {
      return { skjemaelementId: key, feilmelding: errors[key].message };
    });
    setErrorList(list);
  }, [errors, formState]);

  return errorList;
};
