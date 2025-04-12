using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregate;

public class OrderedItem
{
    public int Id { get; set; }
    public required OrderedProduct OrderedProduct { get; set; }
    public long Price { get; set; }
    public int Quantity { get; set; }
}
