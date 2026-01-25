using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArchiPortfolio.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProjectsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PressKitUrl",
                table: "Projects");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PressKitUrl",
                table: "Projects",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
