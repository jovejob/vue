import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import FilterSection from '@/components/FilterSection.vue'
import NewsView from '@/views/NewsView.vue'
import NewsList from '../NewsList.vue'

describe('NewsView', () => {
  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)
  })

  it('renders FilterSection and NewsList components', () => {
    const wrapper = mount(NewsView)

    // Check if FilterSection is rendered
    expect(wrapper.findComponent(FilterSection).exists()).toBe(true)

    // Check if NewsList is rendered
    expect(wrapper.findComponent(NewsList).exists()).toBe(true)
  })
})
