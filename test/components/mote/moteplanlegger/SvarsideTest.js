import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Svarside from '../../../../js/components/moter/moteplanlegger/Svarside';
import Svarskjema from '../../../../js/components/moter/moteplanlegger/Svarskjema';
import { moteIkkeBesvart } from '../../../mock/mockMote';

describe('Svarside', () => {
  it('Skal inneholde et Svarskjema', () => {
    const component = shallow(<Svarside mote={moteIkkeBesvart} />);
    expect(component.find(Svarskjema)).to.have.length(1);
  });
});
