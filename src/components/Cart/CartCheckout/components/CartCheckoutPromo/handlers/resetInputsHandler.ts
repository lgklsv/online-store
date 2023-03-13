export const resetCouponInputs = () => {
  const couponBadge = document.getElementById('coupon-badge') as HTMLElement;
  const promoDataInput = document.getElementById('coupon-input') as HTMLInputElement;
  const couponBtn = document.getElementById('coupon-btn') as HTMLElement;

  couponBtn.setAttribute('disabled', 'true');
  couponBadge.innerHTML = '';
  promoDataInput.value = '';
};
