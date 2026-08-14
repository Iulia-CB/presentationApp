import { render } from '@testing-library/react';

import NextjsTemplateUtils from './utils';

describe('NextjsTemplateUtils', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NextjsTemplateUtils />);
    expect(baseElement).toBeTruthy();
  });
});
