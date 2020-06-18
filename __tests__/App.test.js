import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import App from '../src/App';

describe('App', () => {
  const wrapper = shallow(<App apiUrl="http://localhost:4000/promo" />);

  it('renders App component', () => {
    expect(wrapper).toHaveLength(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
