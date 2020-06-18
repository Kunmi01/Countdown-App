import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Countdown from '../src/components/Countdown';

describe('Countdown', () => {
  const wrapper = mount(<Countdown duration={43685000} />);

  it('renders Countdown component', () => {
    expect(wrapper).toHaveLength(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('displays duration in correct format', () => {
    const hourContainer = wrapper.find('.countdown__unit--hours h1');
    const minuteContainer = wrapper.find('.countdown__unit--minutes h1');
    const secondContainer = wrapper.find('.countdown__unit--seconds h1');

    expect(hourContainer.text()).toEqual('12');
    expect(minuteContainer.text()).toEqual('08');
    expect(secondContainer.text()).toEqual('05');
  });
});
