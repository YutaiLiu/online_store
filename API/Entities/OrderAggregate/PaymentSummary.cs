using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregate;

[Owned]
public class PaymentSummary
{
    public required int Last4Digits { get; set; }
    public required string CardBrand { get; set; }
    public required int ExpMonth { get; set; }
    public required int ExpYear { get; set; }
}
