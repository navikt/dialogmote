import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getMotebehov } from '../services/motebehov';

const MOTEBEHOV = 'motebehov';

export const useMotebehov = () => {
  return useQuery(MOTEBEHOV, getMotebehov);
};

export const useFeiloppsumeringList = (errors) => {
  const [errorList, setErrorList] = useState([]);

  useEffect(() => {
    const keys = Object.keys(errors);
    const list = keys.map((key) => {
      return { skjemaelementId: key, feilmelding: errors[key].message };
    });
    setErrorList(list);
  }, [errors]);

  return errorList;
};
