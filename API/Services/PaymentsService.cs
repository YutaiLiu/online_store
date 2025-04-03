using API.Entities;
using Stripe;

namespace API.Services;

// Add config in order to get the key from appsettings
public class PaymentsService(IConfiguration config)
{
    public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(ShoppingCart shoppingCart)
    {
        StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];

        var service = new PaymentIntentService();
        var intent = new PaymentIntent();
        var subtotal = shoppingCart.Items.Sum(item => item.Quantity * item.Product.Price);
        var deliveryFee = subtotal > 10000 ? 0 : 1000;

        if (string.IsNullOrEmpty(shoppingCart.PaymentIntentId))
        {
            // Create a new payment intent
            var options = new PaymentIntentCreateOptions
            {
                Amount = subtotal == 0 ? 0 : subtotal + deliveryFee,
                Currency = "usd",
                PaymentMethodTypes = new List<string> { "card" },
                
            };

            intent = await service.CreateAsync(options);
        }
        else
        {
            // Update the existing payment intent
            var options = new PaymentIntentUpdateOptions
            {
                Amount = subtotal == 0 ? 0 : subtotal + deliveryFee,
            };

            await service.UpdateAsync(shoppingCart.PaymentIntentId, options);
        }
        return intent;
    }
}
