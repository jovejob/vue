import { createPinia, setActivePinia } from 'pinia'
import { mount } from '@vue/test-utils'
import FilterSection from '../FilterSection.vue'

describe('FilterSection', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('disables the button when inputs are invalid', async () => {
    const wrapper = mount(FilterSection, {
      global: {
        plugins: [createPinia()],
      },
    })

    console.log(wrapper.html())

    // Find the input element and verify its existence
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)

    // Set the input to an empty string
    await input.setValue('')

    // Find and check the button’s disabled state
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)

    // Check if the button is disabled
    expect(button.element.disabled).toBe(true)
  })
})
