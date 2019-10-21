using Microsoft.EntityFrameworkCore.Migrations;

namespace Common.Migrations
{
    public partial class ChangeInAccountHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "diff_dept",
                table: "account_history");

            migrationBuilder.DropColumn(
                name: "new_dept",
                table: "account_history");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "diff_dept",
                table: "account_history",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "new_dept",
                table: "account_history",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
