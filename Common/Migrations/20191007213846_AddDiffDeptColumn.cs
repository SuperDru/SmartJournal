using Microsoft.EntityFrameworkCore.Migrations;

namespace Common.Migrations
{
    public partial class AddDiffDeptColumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "diff",
                table: "account_history",
                newName: "diff_dept");

            migrationBuilder.AddColumn<float>(
                name: "diff_amount",
                table: "account_history",
                nullable: false,
                defaultValue: 0f);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "diff_amount",
                table: "account_history");

            migrationBuilder.RenameColumn(
                name: "diff_dept",
                table: "account_history",
                newName: "diff");
        }
    }
}
