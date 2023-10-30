using AutoMapper;
using database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace service.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<database.Models.User, service.Models.User>();
            CreateMap<service.Models.Job, database.Models.Job>();
            CreateMap<database.Models.Job, service.Models.Job>();
        }
    }
}
