using System;
namespace service.Models
{
    public class Job
    {

        public Guid Id { get; set; }
        public string? title { get; set; }
        public string? companyName { get; set; }
        public string? location { get; set; }
        public string? salary { get; set; }
        public string? jobKeywords { get; set; }
        public Guid userId { get; set; }
        public StatusEnum status { get; set; }
        public string? url { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

    }
}
