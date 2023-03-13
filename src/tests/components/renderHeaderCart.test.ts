import { queryByText, fireEvent } from '@testing-library/dom';
import { renderHeaderCart } from '../../components/Header/components/HeaderCart/HeaderCart';
import { route } from '../../router/route';

jest.mock('../../utils/router', () => ({
  router: jest.fn(),
}));
jest.mock('../../const/store', () => ({
  productsCartData: {
    count: 2,
  },
}));

describe('Component renderHeaderCart', () => {
  it('should render Header Cart component', () => {
    const container = renderHeaderCart();

    expect(queryByText(container, '2')).toBeDefined();
  });

  it('should open cart page', () => {
    const handleOpenCart = jest.fn();
    (route as jest.Mock).mockImplementation(handleOpenCart);

    const container = renderHeaderCart();
    fireEvent.click(container);

    expect(handleOpenCart).toBeCalledTimes(1);
    expect(handleOpenCart).toBeCalledWith('/cart');
  });
});
