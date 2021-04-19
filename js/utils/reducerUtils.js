export const forsoktHentetMote = (moteReducer) => {
  return moteReducer.hentet || moteReducer.hentingFeilet;
};
