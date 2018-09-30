import { mount } from '@vue/test-utils';
import Footer from '@/components/Footer';

describe('Footer', () => {
  const wrapper = mount(Footer, {
    propsData: {
      index: 0,
      src: [
        [0,'image title','img.jpg'],
        [1,'image title 2','img2.jpg']
      ]
    }
  })
  // it's also easy to check for the existence of elements
  it('has a nav', () => {
    expect(wrapper.contains('nav')).toBe(true);
  });
  it('builds with mock data', () => {
    const footer = wrapper.find('footer');
    const links = wrapper.findAll('a');

    // the footer element should have class "open"
    expect(footer.classes()).toContain('open');
    // the class active is added to the first link
    expect(links.at(0).classes()).toContain('active');
    // links are populated properly
    expect(links.length).toBe(2);
  });
})
