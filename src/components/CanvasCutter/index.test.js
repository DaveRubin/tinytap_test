import React from 'react';
import CanvasCutter from './index';
import { shallow } from 'enzyme';

describe('Main App wrapper', () => {
  it('should initialize correctly', () => {
    const wrapper = shallow(<CanvasCutter />);
    expect(wrapper.length).toBe(1);
    expect(wrapper.state().loadedImage).toBe(null);
    expect(wrapper.find('.imageSelector').exists()).toBe(true);
    expect(wrapper.find('.resetSceneButton').exists()).toBe(false);
    expect(wrapper.find('.baseImage').exists()).toBe(false);
    expect(wrapper.find('.imageParts').exists()).toBe(false);
    expect(wrapper.find('.guiLayer').exists()).toBe(false);
  });
  it('should show the image once loaded', () => {
    const wrapper = shallow(<CanvasCutter />);
    const imageSelector = wrapper.find('.imageSelector');
    imageSelector.simulate('imageLoad', { image: 'SOME IMAGE' });
    expect(wrapper.state().loadedImage).toBe('SOME IMAGE');
    expect(wrapper.state().parts).toEqual([]);
    expect(wrapper.find('.imageSelector').exists()).toBe(false);
    expect(wrapper.find('.resetSceneButton').exists()).toBe(true);
    expect(wrapper.find('.baseImage').exists()).toBe(true);
    expect(wrapper.find('.imageParts').exists()).toBe(true);
    expect(wrapper.find('.guiLayer').exists()).toBe(true);
  });
  it('should reset all when clicking reset', () => {
    const wrapper = shallow(<CanvasCutter />);
    wrapper
      .find('.imageSelector')
      .simulate('imageLoad', { image: 'SOME IMAGE' });
    wrapper.find('.resetSceneButton').simulate('click');
    expect(wrapper.state().loadedImage).toBe(null);
    expect(wrapper.find('.imageSelector').exists()).toBe(true);
    expect(wrapper.find('.resetSceneButton').exists()).toBe(false);
    expect(wrapper.find('.baseImage').exists()).toBe(false);
    expect(wrapper.find('.imageParts').exists()).toBe(false);
    expect(wrapper.find('.guiLayer').exists()).toBe(false);
  });
});
