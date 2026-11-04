import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Context as ResponsiveContext } from 'react-responsive';
import { MemoryRouter } from 'react-router';

import { initializeMockApp } from '@edx/frontend-platform';
import { AppProvider } from '@edx/frontend-platform/react';

import { initializeStore } from '../../store';
import EmptyPosts from '../empty-posts/EmptyPosts';
import messages from '../messages';

let store;
const courseId = 'course-v1:edX+DemoX+Demo_Course';

function renderComponent(location = `/${courseId}/`) {
  return render(
    <IntlProvider locale="en">
      <ResponsiveContext.Provider value={{ width: 1280 }}>
        <AppProvider store={store} wrapWithRouter={false}>
          <MemoryRouter initialEntries={[location]}>
            <EmptyPosts subTitleMessage={messages.emptyMyPosts} />
          </MemoryRouter>
        </AppProvider>
      </ResponsiveContext.Provider>
    </IntlProvider>,
  );
}

describe('EmptyPage', () => {
  beforeEach(async () => {
    initializeMockApp({
      authenticatedUser: {
        userId: 3,
        username: 'abc123',
        administrator: true,
        roles: [],
      },
    });

    store = initializeStore({
      config: { provider: 'openedx', onlyVerifiedUsersCanPost: true },
    });
  });

  it('does not show an add post button on the empty pane', () => {
    renderComponent(`/${courseId}/my-posts/`);

    expect(screen.queryByRole('button', { name: '+ Add a post' })).not.toBeInTheDocument();
  });
});
