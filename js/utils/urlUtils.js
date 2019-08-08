export const erPaaHeroku = () => {
    const url = window.location.href;
    return url.indexOf('heroku') > -1;
};

export const getSykefravaerUrl = (sti) => {
    return erPaaHeroku()
        ? `https://sykefravaer.herokuapp.com${sti}`
        : sti;
};
