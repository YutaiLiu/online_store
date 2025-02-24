namespace API.Entities;
// Note:
// namespace is a scope of a class and a way to organize your code
// out of this scope, you can't access the class
// and you can define a class with the same name in different namespaces

// long type is easier to work with in C# than decimal type
// because you do not need to define the scale and precision
// and it is more efficient in terms of memory and performance

public class Product
{
    /// <summary>
    /// Unique identifier for the product
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Name of the product
    /// </summary>
    public required string Name { get; set; }

    /// <summary>
    /// Price in cents
    /// </summary>
    public required long Price { get; set; }

    /// <summary>
    /// Description of the product
    /// </summary>
    public required string Description { get; set; }

    /// <summary>
    /// Type of the product
    /// </summary>
    public string Type { get; set; }

    /// <summary>
    /// Picture URL of the product
    /// </summary>
    public string PictureURL { get; set; }

    /// <summary>  
    /// Brand of the product
    /// </summary>
    public required string Brand { get; set; }

    /// <summary>
    /// Quantity in stock
    /// </summary>
    public int StockQuantity { get; set; }
}
