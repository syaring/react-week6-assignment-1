import React from 'react';

import { render } from '@testing-library/react';

import given from 'given2';

import { useSelector, useDispatch } from 'react-redux';

import { MemoryRouter, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import RestaurantDetailContainer from './RestaurantDetailContainer';
import restaurantDetail from '../fixtures/restaurantDetail';

describe('RestaurantDetailContainer', () => {
  const dispatch = jest.fn();

  given('restaurantDetail', () => restaurantDetail);
  const {
    name, address, menuItems, reviews, information,
  } = restaurantDetail;

  function renderRestaurantDetail(path) {
    const history = createMemoryHistory();
    return render((
      <MemoryRouter initialEntries={[path]}>
        <Route
          exact
          history={history}
          path="/restaurants/:restaurantId"
          component={RestaurantDetailContainer}
        />
      </MemoryRouter>
    ));
  }

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      restaurantDetail: given.restaurantDetail,
    }));
  });

  context('with restaurantDetail', () => {
    it('renders RestaurantDetail', () => {
      const {
        getByRole, getByText, getAllByRole,
      } = renderRestaurantDetail('/restaurants/4');

      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(getByRole('heading', { name })).toBeInTheDocument();
      expect(getByText(address)).toBeInTheDocument();
      expect(getByText(information)).toBeInTheDocument();

      expect(getByRole('heading', { name: '메뉴' })).toBeInTheDocument();
      menuItems.forEach((menuItem) => {
        expect(getAllByRole('list')[0]).toHaveTextContent(menuItem.name);
      });

      expect(getByRole('heading', { name: '리뷰' })).toBeInTheDocument();
      reviews.forEach((review) => {
        expect(getAllByRole('list')[1]).toHaveTextContent(review.name);
      });
    });
  });

  context('without restaurantDetail', () => {
    it('renders "텅~!"', () => {
      given('restaurantDetail', () => null);
      const {
        getByRole,
      } = renderRestaurantDetail('/restaurants/4');

      expect(getByRole('heading', { name: '텅~!' })).toBeInTheDocument();
    });
  });
});
