namespace API.DTOs;

public class ShoppingCartDto
{
    public int Id { get; set; }

    public required string CartId { get; set; }

    public string? PaymentIntentId { get; set; }
    
    public string? ClientSecret { get; set; }

    public List<ShoppingCartItemDto> Items { get; set; } = [];
}
