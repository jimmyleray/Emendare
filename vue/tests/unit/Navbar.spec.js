import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Navbar from '@/components/Navbar.vue'

describe('Navbar.vue', () => {
  it('should display application title', () => {
    const localVue = createLocalVue()
    localVue.use(Vuetify)
    const wrapper = mount(Navbar, { localVue })
    expect(wrapper.text()).toContain('Emendare')
  })
})
