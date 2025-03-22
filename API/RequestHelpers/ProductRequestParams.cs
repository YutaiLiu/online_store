using System;

namespace API.RequestHelpers;

public class ProductRequestParams : PaginationParams
{
    public string? OrderBy { get; set; }
    public string? Search { get; set; }
    public string? Brands { get; set; }
    public string? Types { get; set; }
}
