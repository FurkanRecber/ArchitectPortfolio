using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArchiPortfolio.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSiteSettingsFull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AboutTitleTr",
                table: "SiteSettings",
                newName: "YearsActive");

            migrationBuilder.RenameColumn(
                name: "AboutTitle",
                table: "SiteSettings",
                newName: "SiteTitle");

            migrationBuilder.RenameColumn(
                name: "AboutTextTr",
                table: "SiteSettings",
                newName: "ShowreelUrl");

            migrationBuilder.RenameColumn(
                name: "AboutText",
                table: "SiteSettings",
                newName: "RobotsTxt");

            migrationBuilder.AddColumn<string>(
                name: "AwardsWon",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BehanceUrl",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CopyrightText",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CopyrightTextTr",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CtaButtonText",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CtaButtonTextTr",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CtaDescription",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CtaDescriptionTr",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CtaTitle",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CtaTitleTr",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FooterDescription",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FooterDescriptionTr",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "GoogleAnalyticsId",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "GoogleTagManagerId",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "HeadScripts",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "HeroButtonText",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "HeroButtonTextTr",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "HeroImageUrl",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "HeroSubtitle",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "HeroSubtitleTr",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "LogoUrl",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MetaKeywords",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MetaKeywordsTr",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ProjectsCompleted",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ResumePdfUrl",
                table: "SiteSettings",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AwardsWon",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "BehanceUrl",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "CopyrightText",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "CopyrightTextTr",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "CtaButtonText",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "CtaButtonTextTr",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "CtaDescription",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "CtaDescriptionTr",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "CtaTitle",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "CtaTitleTr",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "FooterDescription",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "FooterDescriptionTr",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "GoogleAnalyticsId",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "GoogleTagManagerId",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "HeadScripts",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "HeroButtonText",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "HeroButtonTextTr",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "HeroImageUrl",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "HeroSubtitle",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "HeroSubtitleTr",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "LogoUrl",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "MetaKeywords",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "MetaKeywordsTr",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "ProjectsCompleted",
                table: "SiteSettings");

            migrationBuilder.DropColumn(
                name: "ResumePdfUrl",
                table: "SiteSettings");

            migrationBuilder.RenameColumn(
                name: "YearsActive",
                table: "SiteSettings",
                newName: "AboutTitleTr");

            migrationBuilder.RenameColumn(
                name: "SiteTitle",
                table: "SiteSettings",
                newName: "AboutTitle");

            migrationBuilder.RenameColumn(
                name: "ShowreelUrl",
                table: "SiteSettings",
                newName: "AboutTextTr");

            migrationBuilder.RenameColumn(
                name: "RobotsTxt",
                table: "SiteSettings",
                newName: "AboutText");
        }
    }
}
