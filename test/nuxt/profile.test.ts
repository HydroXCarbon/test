import { describe, it, expect } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import Profile from '../../app/pages/profile.vue';

describe('ProfilePage', () => {
  it('should render the user name', async () => {
    const wrapper = await mountSuspended(Profile);
    expect(wrapper.find('h1.profile-name').text()).toBe('Purin Pongpanich');
  });

  it('should render the user handle', async () => {
    const wrapper = await mountSuspended(Profile);
    expect(wrapper.find('.profile-handle').text()).toBe('@purin');
  });

  it('should render the user bio', async () => {
    const wrapper = await mountSuspended(Profile);
    expect(wrapper.find('.profile-bio').text()).toContain('Marmite evangelist');
  });

  it('should render the avatar with correct initials', async () => {
    const wrapper = await mountSuspended(Profile);
    expect(wrapper.find('.avatar').text()).toBe('PP');
  });v

  it('should render the location in the meta row', async () => {
    const wrapper = await mountSuspended(Profile);
    const metaItems = wrapper.findAll('.meta-item');
    expect(metaItems[0].text()).toContain('Bangkok, Thailand');
  });

  it('should render the joined date in the meta row', async () => {
    const wrapper = await mountSuspended(Profile);
    const metaItems = wrapper.findAll('.meta-item');
    expect(metaItems[1].text()).toContain('Joined May 2026');
  });

  it('should render the Edit profile button', async () => {
    const wrapper = await mountSuspended(Profile);
    const buttons = wrapper.findAll('button');
    const editButton = buttons.find(b => b.text().includes('Edit profile'));
    expect(editButton).toBeDefined();
  });

  it('should render the Share button', async () => {
    const wrapper = await mountSuspended(Profile);
    const buttons = wrapper.findAll('button');
    const shareButton = buttons.find(b => b.text() === 'Share');
    expect(shareButton).toBeDefined();
  });

  it('should render all four stat cards with correct labels', async () => {
    const wrapper = await mountSuspended(Profile);
    const statLabels = wrapper.findAll('.stat-label').map(el => el.text());
    expect(statLabels).toEqual(['Combos', 'Likes', 'Followers', 'Following']);
  });

  it('should render all four stat cards with correct values', async () => {
    const wrapper = await mountSuspended(Profile);
    const statValues = wrapper.findAll('.stat-value').map(el => el.text());
    expect(statValues).toEqual(['24', '312', '128', '64']);
  });

  it('should render the "My combos" section title', async () => {
    const wrapper = await mountSuspended(Profile);
    expect(wrapper.find('h2.section-title').text()).toBe('My combos');
  });

  it('should render four ComboCard instances', async () => {
    const wrapper = await mountSuspended(Profile);
    expect(wrapper.findAll('.combo-card')).toHaveLength(4);
  });

  it('should render each combo card with the correct title', async () => {
    const wrapper = await mountSuspended(Profile);
    const titles = wrapper.findAll('.combo-title').map(el => el.text());
    expect(titles).toEqual([
      'Marmite & Cheese',
      'Maltesers & Crisps',
      'Strawberries & Pepper',
      'Peanut Butter & Pickle',
    ]);
  });
});
