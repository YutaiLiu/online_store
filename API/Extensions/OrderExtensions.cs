using System;
using API.DTOs;
using API.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class OrderExtensions
{
    public static IQueryable<OrderDto> ProjectToDto(this IQueryable<Order> query)
    {
        return query.Select(order => new OrderDto
        {
            Id = order.Id,
            BuyerEmail = order.BuyerEmail,
            OrderDate = order.OrderDate,
            ShippingAddress = order.ShippingAddress,
            PaymentSummary = order.PaymentSummary,
            Subtotal = order.Subtotal,
            DeliveryFee = order.DeliveryFee,
            Total = order.GetTotal(),
            OrderStatus = order.OrderStatus.ToString(),
            OrderedItems = order.OrderedItems.Select(item => new OrderedItemDto
            {
                ProductId = item.OrderedProduct.ProductId,
                Name = item.OrderedProduct.Name,
                PictureUrl = item.OrderedProduct.PictureUrl,
                Price = item.Price,
                Quantity = item.Quantity,
            }).ToList(),
        }).AsNoTracking();
    }

    public static OrderDto ToDto(this Order order)
    {
        return new OrderDto
        {
            Id = order.Id,
            BuyerEmail = order.BuyerEmail,
            OrderDate = order.OrderDate,
            ShippingAddress = order.ShippingAddress,
            PaymentSummary = order.PaymentSummary,
            Subtotal = order.Subtotal,
            DeliveryFee = order.DeliveryFee,
            Total = order.GetTotal(),
            OrderStatus = order.OrderStatus.ToString(),
            OrderedItems = order.OrderedItems.Select(item => new OrderedItemDto
            {
                ProductId = item.OrderedProduct.ProductId,
                Name = item.OrderedProduct.Name,
                PictureUrl = item.OrderedProduct.PictureUrl,
                Price = item.Price,
                Quantity = item.Quantity,
            }).ToList(),
        };
    }
}
