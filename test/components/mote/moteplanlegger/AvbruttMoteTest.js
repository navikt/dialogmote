import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import AvbruttMote from '../../../../js/components/moter/moteplanlegger/AvbruttMote';
import { moteAvbrutt } from '../../../mock/mockMote';

describe('AvbruttMote', () => {
    beforeEach(() => {
        window.APP_SETTINGS = {
            REST_ROOT: 'http://tjenester.nav.no/moterest/api',
        };
    });

    it('Skal vise alternativene', () => {
        const kvittering = shallow(<AvbruttMote
            mote={moteAvbrutt}
        />);
        expect(kvittering.find('.avbrutt__mote__svar')).to.have.length(2);
    });
});
