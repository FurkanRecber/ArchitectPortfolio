using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArchiPortfolio.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateContactMessageTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EstimatedBudget",
                table: "ContactMessages");

            migrationBuilder.RenameColumn(
                name: "SenderName",
                table: "ContactMessages",
                newName: "Subject");

            migrationBuilder.RenameColumn(
                name: "ProjectType",
                table: "ContactMessages",
                newName: "Name");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Subject",
                table: "ContactMessages",
                newName: "SenderName");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "ContactMessages",
                newName: "ProjectType");

            migrationBuilder.AddColumn<string>(
                name: "EstimatedBudget",
                table: "ContactMessages",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
