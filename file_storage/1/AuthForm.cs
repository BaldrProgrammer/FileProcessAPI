using System.Text;
using System.Text.Json;
using FileGUI.DTO.Auth;

namespace FileGUI;

public partial class AuthForm : Form
{
    const string Url = "http://155.212.223.69:8000";

    public AuthForm()
    {
        InitializeComponent();
    }

    private void LogIn(object sender, EventArgs e)
    {
        string username = usernameTxt.Text;
        string password = passwordTxt.Text;

        var body = new
        {
            username,
            password,
            is_admin = false
        };
        string json = JsonSerializer.Serialize(body);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Add("Accept", "application/json");

            var response = client
                .PostAsync(Url + "/auth/log", content)
                .GetAwaiter()
                .GetResult();

            string responseBody = response.Content
                .ReadAsStringAsync()
                .GetAwaiter()
                .GetResult();

            LoginResponseDto? dto = JsonSerializer.Deserialize<LoginResponseDto>(responseBody);
            MainForm form2 = new MainForm(dto.access_token);
            form2.Show();
            Hide();
        }
    }

    private void Register(object sender, EventArgs e)
    {
        string username = regUsernameTxt.Text;
        string password = regPasswordTxt.Text;

        var body = new
        {
            username,
            hashed_password = password,
            is_admin = false
        };

        string json = JsonSerializer.Serialize(body);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Add("Accept", "application/json");

            var response = client
                .PostAsync(Url + "/auth/register", content)
                .GetAwaiter()
                .GetResult();

            string responseBody = response.Content
                .ReadAsStringAsync()
                .GetAwaiter()
                .GetResult();
        }
    }

    private void ChangePanel(object sender, EventArgs e)
    {
        Label? senderr = sender as Label;
        if (senderr != null)
        {
            if (senderr.Text == "Есть аккаунт?")
            {
                regPnl.Hide();
                loginPnl.Show();
            }
            else if (senderr.Text == "Нет аккаунта?")
            {
                loginPnl.Hide();
                regPnl.Show();
            }
        }
    }
}