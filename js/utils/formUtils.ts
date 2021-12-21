import {FieldErrors} from "react-hook-form";
import {FeiloppsummeringFeil} from "nav-frontend-skjema";

export const mapErrors = (errors: FieldErrors): FeiloppsummeringFeil[] => {
    const feil: FeiloppsummeringFeil[] = [];
    const keys = Object.keys(errors)
    keys.forEach((key) => {
        if (errors[key]) {
            feil.push({
                skjemaelementId: key,
                feilmelding: errors[key].message,
            });
        }
    });

    return feil;
};