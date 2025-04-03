using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

[Table("ShoppingCarts")]
public class ShoppingCart
{
    public int Id { get; set; }

    // Shopping cart identifier
    public required string CartId { get; set; }

    public List<ShoppingCartItem> Items { get; set; } = new List<ShoppingCartItem>();

    // Stripe issued identifier for the payment intent
    // got updated every time the cart is updated
    public string? PaymentIntentId { get; set; }
    // Stripe issued client secret, used to confirm the payment
    public string? ClientSecret { get; set; }

    public void AddItem(Product product, int quantity)
    {
        if (quantity <= 0) throw new ArgumentException("Quantity must be greater than zero");

        var existingItem = FindItem(product.Id);

        if (existingItem == null)
        {
            Items.Add(new ShoppingCartItem
            {
                ProductId = product.Id,
                Product = product,
                Quantity = quantity,
                ShoppingCartId = Id,
                ShoppingCart = this
            });
        }
        else
        {
            existingItem.Quantity += quantity;
        }
    }

    public void RemoveItem(Product product, int quantity)
    {
        if (quantity <= 0) throw new ArgumentException("Quantity must be greater than zero");

        var existingItem = FindItem(product.Id);

        if (existingItem == null)
        {
            throw new InvalidOperationException("Item not found in cart");
        }
        else
        {
            existingItem.Quantity -= quantity;

            if (existingItem.Quantity <= 0)
            {
                Items.Remove(existingItem);
            }
        }
    }

    public ShoppingCartItem? FindItem(int productId)
    {
        return Items.FirstOrDefault(item => item.ProductId == productId);
    }
}
