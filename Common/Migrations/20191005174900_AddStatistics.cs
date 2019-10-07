using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Common.Migrations
{
    public partial class AddStatistics : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Statistics",
                columns: table => new
                {
                    group_id = table.Column<int>(nullable: false),
                    date = table.Column<DateTime>(nullable: false),
                    people_amount = table.Column<int>(nullable: false),
                    attendance_percentage = table.Column<int>(nullable: false),
                    visits_amount = table.Column<int>(nullable: false),
                    expected_income = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statistics", x => new { x.group_id, x.date });
                    table.ForeignKey(
                        name: "FK_Statistics_groups_group_id",
                        column: x => x.group_id,
                        principalTable: "groups",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Statistics");
        }
    }
}
