using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace database.Models
{
    public class SingleSignOn
    {
        public Guid Id { get; set; } // Consider adding a primary key
        public string? Uid { get; set; }
        public string? Email { get; set; }
        public bool EmailVerified { get; set; }
        public bool IsAnonymous { get; set; }
        public string? PhotoURL { get; set; }

        public List<ProviderData> ProviderData { get; set; }

        public string? RefreshToken { get; set; }
        public string? AccessToken { get; set; }
        public int OauthExpireIn { get; set; }
        public int ExpiresIn { get; set; }

        public string? RawUserInfo { get; set; }
        public string? Kind { get; set; }
        public string? OperationType { get; set; }

        public Guid UserId { get; set; } // Foreign key
        public User User { get; set; }
    }

    public class ProviderData
    {
        public Guid Id { get; set; } // Consider adding a primary key
        public string? ProviderId { get; set; }
        public string? Uid { get; set; }
        public string? DisplayName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? PhotoURL { get; set; }

        public Guid SingleSignOnId { get; set; } // Foreign key
        public SingleSignOn SingleSignOn { get; set; } // Navigation property
    }
}
