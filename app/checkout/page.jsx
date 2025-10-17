import { Suspense } from 'react';
import CheckoutPage from './CheckoutClient';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <CheckoutPage />
    </Suspense>
  );
}