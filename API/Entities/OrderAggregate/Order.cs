namespace API.Entities.OrderAggregate;

public class Order
{
    public int Id { get; set; }
    public required string BuyerEmail { get; set; }
    public required ShippingAddress ShippingAddress { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public required List<OrderedItem> OrderedItems { get; set; } = [];
    public long Subtotal { get; set; }
    public long DeliveryFee { get; set; }
    public required string PaymentIntentId { get; set; }
    public OrderStatus OrderStatus { get; set; } = OrderStatus.Pending;
    public required PaymentSummary PaymentSummary { get; set; }

    public long GetTotal()
    {
        return Subtotal + DeliveryFee;
    }
}
