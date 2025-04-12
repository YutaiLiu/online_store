using API.Entities;

namespace API.Extensions;

public static class ProductExtension
{
    public static IQueryable<Product> ApplySort(this IQueryable<Product> query, string? orderBy)
    {
        switch (orderBy)
        {
            case "name":
                return query.OrderBy(p => p.Name);
            case "nameDesc":
                return query.OrderByDescending(p => p.Name);
            case "price":
                return query.OrderBy(p => p.Price);
            case "priceDesc":
                return query.OrderByDescending(p => p.Price);
            default:
                return query;
        }
    }

    public static IQueryable<Product> Search(this IQueryable<Product> query, string? search)
    {
        if (string.IsNullOrEmpty(search))
        {
            return query;
        }

        // c# string comparison is case sensitive by default
        return query.Where(p => p.Name.ToLower().Contains(search.Trim().ToLower()));
    }

    public static IQueryable<Product> ApplyFilter(this IQueryable<Product> query, string? brands, string? types)
    {
        var brandList = new List<string>();
        var typeList = new List<string>();

        if (!string.IsNullOrEmpty(brands))
        {
            brandList.AddRange([.. brands.ToLower().Split(',')]);
        }

        if (!string.IsNullOrEmpty(types))
        {
            typeList.AddRange([.. types.ToLower().Split(',')]);
        }

        query = query.Where(x => brandList.Count == 0 || brandList.Contains(x.Brand.ToLower()));
        query = query.Where(x => typeList.Count == 0 || typeList.Contains(x.Type.ToLower()));

        return query;
    }
}
