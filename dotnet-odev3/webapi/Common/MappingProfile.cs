using AutoMapper;
using webapi.Applications.BookOperations.Commands;
using webapi.Applications.BookOperations.Queries;
using webapi.Applications.GenreOperations.Commands;
using webapi.Applications.GenreOperations.Queries;
using webapi.Entities;

namespace webapi.Common;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CreateBookModel, Book>();
        CreateMap<Book, BookViewModel>().
            ForMember(dest => dest.Genre, opt => opt.MapFrom(src => (((GenreEnum) src.GenreID)).ToString()))
            .ForMember(dest => dest.PublishDate, opt=> opt.MapFrom(src => src.PublishDate.ToString("d")));
        CreateMap<Genre, GetGenresViewModel>();
        CreateMap<Genre, GetGenreDetailViewModel>()
            .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => src.IsActive == true ? "active" : "not active"));
        CreateMap<AddGenreCommandViewModel, Genre>();
        
    }
}