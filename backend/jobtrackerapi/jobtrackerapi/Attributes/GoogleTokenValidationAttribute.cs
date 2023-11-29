using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net.Http;
using System.Threading.Tasks;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class GoogleTokenValidationAttribute : Attribute, IAsyncAuthorizationFilter
{
    public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
    {
        string? accessToken = GetAccessToken(context.HttpContext.Request);

        if (string.IsNullOrEmpty(accessToken))
        {
            context.Result = new UnauthorizedResult();
            return;
        }

        bool isTokenValid;

        // Check if the token is already verified in the session
        if (context.HttpContext.Session.TryGetValue($"VerifiedToken_{accessToken}", out _))
        {
            // Token is already verified, skip verification
            isTokenValid = true;
        }
        else
        {
            // Verify the Google Access Token
            isTokenValid = await VerifyGoogleToken(accessToken);

            // Cache the verification result in the session
            context.HttpContext.Session.Set($"VerifiedToken_{accessToken}", new byte[1]);
        }

        if (!isTokenValid)
        {
            context.Result = new UnauthorizedResult();
        }
    }

    private string? GetAccessToken(HttpRequest request)
    {
        return request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
    }

    private async Task<bool> VerifyGoogleToken(string accessToken)
    {
        var client = new HttpClient();
        var response = await client.GetAsync($"https://www.googleapis.com/oauth2/v3/tokeninfo?access_token={accessToken}");

        return response.IsSuccessStatusCode;
    }
}
