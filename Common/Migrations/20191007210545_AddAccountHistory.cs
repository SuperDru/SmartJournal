using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Common.Migrations
{
    public partial class AddAccountHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "account_history",
                columns: table => new
                {
                    user_id = table.Column<int>(nullable: false),
                    performed_at = table.Column<DateTime>(nullable: false),
                    type = table.Column<int>(nullable: false),
                    diff = table.Column<float>(nullable: false),
                    new_amount = table.Column<float>(nullable: false),
                    new_dept = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_account_history", x => new { x.user_id, x.performed_at });
                    table.ForeignKey(
                        name: "FK_account_history_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "account_history");
        }
    }
}
