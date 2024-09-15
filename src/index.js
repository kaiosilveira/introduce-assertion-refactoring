export class Customer {
  applyDiscount(aNumber) {
    if (!this.discountRate) return aNumber;
    else return aNumber - this.discountRate * aNumber;
  }

  set discountRate(aNumber) {
    this._discountRate = aNumber;
  }

  get discountRate() {
    return this._discountRate;
  }
}
