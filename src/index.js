export class Customer {
  applyDiscount(aNumber) {
    return this.discountRate ? aNumber - this.discountRate * aNumber : aNumber;
  }

  set discountRate(aNumber) {
    this._discountRate = aNumber;
  }

  get discountRate() {
    return this._discountRate;
  }
}
