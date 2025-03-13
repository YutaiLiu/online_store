using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

[Table("ShoppingCartItems")]
public class ShoppingCartItem
{
    public int Id { get; set; }

    public required int ProductId { get; set; }

    public required Product Product { get; set; }

    public required int Quantity { get; set; }

    public required int ShoppingCartId { get; set; }

    public required ShoppingCart ShoppingCart { get; set; }
}