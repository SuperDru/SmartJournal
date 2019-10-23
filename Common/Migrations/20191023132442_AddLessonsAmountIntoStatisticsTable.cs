using Microsoft.EntityFrameworkCore.Migrations;

namespace Common.Migrations
{
    public partial class AddLessonsAmountIntoStatisticsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "lessons_amount",
                table: "Statistics",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "lessons_amount",
                table: "Statistics");
        }
    }
}
