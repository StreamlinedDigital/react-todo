import React from 'react';
import { shallow } from 'enzyme';
import Test from './Test';

test('Test component will render', () => {
  const component = shallow(<Test />);
  expect(component.contains('Just testing out routes')).toBe(true)
})
