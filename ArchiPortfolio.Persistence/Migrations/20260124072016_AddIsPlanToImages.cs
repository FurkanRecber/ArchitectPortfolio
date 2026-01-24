using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArchiPortfolio.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddIsPlanToImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Subject",
                table: "ContactMessages",
                newName: "ProjectType");

            migrationBuilder.AddColumn<bool>(
                name: "IsPlan",
                table: "ProjectImages",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "EstimatedBudget",
                table: "ContactMessages",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPlan",
                table: "ProjectImages");

            migrationBuilder.DropColumn(
                name: "EstimatedBudget",
                table: "ContactMessages");

            migrationBuilder.RenameColumn(
                name: "ProjectType",
                table: "ContactMessages",
                newName: "Subject");
        }
    }
}
