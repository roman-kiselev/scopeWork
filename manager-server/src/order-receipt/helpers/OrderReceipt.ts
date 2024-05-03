class OrderReceipt<T> {
  constructor(private dto: T) {}

  protected getDto() {
    return this.dto;
  }
}

export default OrderReceipt;
