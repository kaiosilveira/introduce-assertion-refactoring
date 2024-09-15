import { Customer } from '.';

describe('Customer', () => {
  describe('applyDiscount', () => {
    it('should return the same amount if discountRate is zero', () => {
      const customer = new Customer();
      customer.discountRate = 0;
      expect(customer.applyDiscount(100)).toBe(100);
    });

    it('should return the discounted amount if discountRate is not zero', () => {
      const customer = new Customer();
      customer.discountRate = 0.2;
      expect(customer.applyDiscount(100)).toBe(80);
    });

    it('should throw an error if discountRate is negative', () => {
      const customer = new Customer();
      customer.discountRate = -0.2;
      expect(() => {
        customer.applyDiscount(100);
      }).toThrow('Discount rate must be a positive number');
    });
  });

  describe('set discountRate', () => {
    it('should set the discount rate', () => {
      const customer = new Customer();
      customer.discountRate = 0.2;
      expect(customer.discountRate).toBe(0.2);
    });

    it('should set the discount rate to zero', () => {
      const customer = new Customer();
      customer.discountRate = 0;
      expect(customer.discountRate).toBe(0);
    });

    it('should set the discount rate to null', () => {
      const customer = new Customer();
      customer.discountRate = null;
      expect(customer.discountRate).toBe(null);
    });

    it('should throw an error if discountRate is negative', () => {
      const customer = new Customer();
      expect(() => {
        customer.discountRate = -0.2;
      }).toThrow('Discount rate must be a positive number');
    });
  });
});
