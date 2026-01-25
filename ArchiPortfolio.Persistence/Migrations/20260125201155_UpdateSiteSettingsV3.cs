using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArchiPortfolio.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSiteSettingsV3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "YearsActive",
                table: "SiteSettings",
                newName: "PhilosophyTitleTr");

            migrationBuilder.RenameColumn(
                name: "ProjectsCompleted",
                table: "SiteSettings",
                newName: "PhilosophyTitle");

            migrationBuilder.RenameColumn(
                name: "AwardsWon",
                table: "SiteSettings",
                newName: "PhilosophyIconUrl");

            migrationBuilder.AddColumn<string>(
                name: "AboutDescription",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AboutDescriptionTr",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AboutImageUrl",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AboutTitle",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AboutTitleTr",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Metric1Title",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Metric1TitleTr",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Metric1Value",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Metric2Title",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Metric2TitleTr",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Metric2Value",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Metric3Title",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Metric3TitleTr",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Metric3Value",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhilosophyDescription",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhilosophyDescriptionTr",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AboutDescription",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "AboutDescriptionTr",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "AboutImageUrl",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "AboutTitle",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "AboutTitleTr",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Metric1Title",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Metric1TitleTr",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Metric1Value",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Metric2Title",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Metric2TitleTr",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Metric2Value",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Metric3Title",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Metric3TitleTr",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "Metric3Value",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "PhilosophyDescription",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "PhilosophyDescriptionTr",
                table: "SiteSettings");

            migrationBuilder.RenameColumn(
                name: "PhilosophyTitleTr",
                table: "SiteSettings",
                newName: "YearsActive");

            migrationBuilder.RenameColumn(
                name: "PhilosophyTitle",
                table: "SiteSettings",
                newName: "ProjectsCompleted");

            migrationBuilder.RenameColumn(
                name: "PhilosophyIconUrl",
                table: "SiteSettings",
                newName: "AwardsWon");
        }
    }
}
