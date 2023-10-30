using AutoMapper;

namespace service.Mapping
{
    // This class defines the AutoMapper mapping profiles for mapping between different object types.
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Map from the 'User' entity in the database to the 'User' model in the service layer.
            CreateMap<database.Models.User, service.Models.User>();

            // Map from the 'Job' model in the service layer to the 'Job' entity in the database.
            CreateMap<service.Models.Job, database.Models.Job>();

            // Map from the 'Job' entity in the database to the 'Job' model in the service layer.
            CreateMap<database.Models.Job, service.Models.Job>();
        }
    }
}
