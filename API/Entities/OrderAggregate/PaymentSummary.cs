using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace API.Entities.OrderAggregate;

[Owned]
public class PaymentSummary
{
    [JsonPropertyName("last4")]
    public required int Last4Digits { get; set; }
    [JsonPropertyName("brand")]
    public required string CardBrand { get; set; }
    [JsonPropertyName("exp_month")]
    public required int ExpMonth { get; set; }
    [JsonPropertyName("exp_year")]
    public required int ExpYear { get; set; }
}
