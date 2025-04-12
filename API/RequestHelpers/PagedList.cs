using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers;

// PageList is a generic class that inherits from List<T>
// it's a custome List data structure that will be used to store paginated data
public class PagedList<T> : List<T>
{
    public PaginationMetaData metaData { get; set; }

    public PagedList(List<T> items, int count, int pageNumber, int pageSize)
    {
        metaData = new PaginationMetaData
        {
            TotalCount = count,
            PageSize = pageSize,
            CurrentPage = pageNumber,
            TotalPages = (int)Math.Ceiling(count / (double)pageSize)
        };

        AddRange(items);
    }

    public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber, int pageSize)
    {
        var count = await query.CountAsync();
        var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

        return new PagedList<T>(items, count, pageNumber, pageSize);
    }
}
