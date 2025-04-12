namespace API.DTOs;

public class ShoppingCartItemDto
{
    public required int ProductId { get; set; }

    public required string Name { get; set; }

    public long Price { get; set; }

    public required string Description { get; set; }

    public required string Type { get; set; }

    public required string PictureURL { get; set; }

    public required string Brand { get; set; }

    public required int Quantity { get; set; }
}
