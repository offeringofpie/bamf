import { shallowMount } from '@vue/test-utils';
import Footer from '@/components/Footer';

describe('Footer', () => {
  const wrapper = shallowMount(Footer, {
    propsData: {
      maxStars: 6,
      grade: 3
    }
  })
  // it's also easy to check for the existence of elements
  it('has a nav', () => {
    expect(wrapper.contains('nav')).toBe(true)
  })
})
