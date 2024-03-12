# https://fluentuipr.z22.web.core.windows.net/heads/master/theming-designer/index.html
# Use the project primaryColor, textColor and whiteColor to generate the palette.

$adminSiteUrl = "https://inparlabsdev-admin.sharepoint.com"
$themeName = "Safra Theme"
$Credential = Get-Credential

Connect-SPOService $adminSiteUrl -Credential $Credential

# Uncomment if you want to update an existing theme
# Remove-SPOTheme -name $themeName

$palette = @{
    "themePrimary" = "#00003c";
    "themeLighterAlt" = "#ffffff";
    "themeLighter" = "#F7F5F5";
    "themeLight" = "#7d7dbd";
    "themeTertiary" = "#C0964D";
    "themeSecondary" = "#404092";
    "themeDarkAlt" = "#29297d";
    "themeDark" = "#171768";
    "themeDarker" = "#090953";
    "neutralLighterAlt" = "#faf9f8";
    "neutralLighter" = "#f3f2f1";
    "neutralLight" = "#edebe9";
    "neutralQuaternaryAlt" = "#e1dfdd";
    "neutralQuaternary" = "#d0d0d0";
    "neutralTertiaryAlt" = "#c8c6c4";
    "neutralTertiary" = "#cacaca";
    "neutralSecondary" = "#959595";
    "neutralPrimaryAlt" = "#646464";
    "neutralPrimary" = "#4f4f4f";
    "neutralDark" = "#3c3c3c";
    "black" = "#2c2c2c";
    "white" = "#ffffff";

    # Project variables:
    "dwTertiary"           = "#D4AD68"; # Optional
    "dwGradient1"          = "#00001E";
    "dwGradient2"          = "#00003C";
    "dwBorder"             = "#E9E9E9";
    "dwError"              = "#E6173E";
    "dwSuccess"            = "#44A45F";
    "dwWarning"            = "#F0E57A";
    "dwText"               = "#4F4F4F";
    "dwShadow"             = "rgba(0,0,0,.10)";
}

Add-SPOTheme -Name $themeName -Palette $palette -IsInverted:$false -Overwrite