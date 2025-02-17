import { useParams } from 'react-router-dom';

import RestaurantContainer from '../Container/RestaurantContainer';

export default function RestaurantPage({
  params,
}) {
  const { id } = params || useParams();

  return (
    <RestaurantContainer
      restaurantId={id}
    />
  );
}
