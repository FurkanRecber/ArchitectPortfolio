using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArchiPortfolio.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePhilosophyToItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PhilosophyTitleTr",
                table: "SiteSettings",
                newName: "PhilosophySectionTitleTr");

            migrationBuilder.RenameColumn(
                name: "PhilosophyTitle",
                table: "SiteSettings",
                newName: "PhilosophySectionTitle");

            migrationBuilder.RenameColumn(
                name: "PhilosophyIconUrl",
                table: "SiteSettings",
                newName: "Philo3TitleTr");

            migrationBuilder.RenameColumn(
                name: "PhilosophyDescriptionTr",
                table: "SiteSettings",
                newName: "Philo3Title");

            migrationBuilder.RenameColumn(
                name: "PhilosophyDescription",
                table: "SiteSettings",
                newName: "Philo3IconUrl");

            migrationBuilder.AddColumn<string>(
                name: "Philo1Desc",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Philo1DescTr",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Philo1IconUrl",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Philo1Title",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Philo1TitleTr",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Philo2Desc",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Philo2DescTr",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Philo2IconUrl",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Philo2Title",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Philo2TitleTr",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Philo3Desc",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Philo3DescTr",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Philo1Desc",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Philo1DescTr",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Philo1IconUrl",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Philo1Title",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Philo1TitleTr",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Philo2Desc",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Philo2DescTr",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Philo2IconUrl",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Philo2Title",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Philo2TitleTr",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Philo3Desc",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Philo3DescTr",
                table: "SiteSettings");

            migrationBuilder.RenameColumn(
                name: "PhilosophySectionTitleTr",
                table: "SiteSettings",
                newName: "PhilosophyTitleTr");

            migrationBuilder.RenameColumn(
                name: "PhilosophySectionTitle",
                table: "SiteSettings",
                newName: "PhilosophyTitle");

            migrationBuilder.RenameColumn(
                name: "Philo3TitleTr",
                table: "SiteSettings",
                newName: "PhilosophyIconUrl");

            migrationBuilder.RenameColumn(
                name: "Philo3Title",
                table: "SiteSettings",
                newName: "PhilosophyDescriptionTr");

            migrationBuilder.RenameColumn(
                name: "Philo3IconUrl",
                table: "SiteSettings",
                newName: "PhilosophyDescription");
        }
    }
}
