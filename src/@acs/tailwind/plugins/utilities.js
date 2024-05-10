const plugin = require("tailwindcss/plugin");

module.exports = plugin(({ addComponents }) => {
  addComponents({
    ".mat-icon": {
      "--tw-text-opacity": "1",
      color: "rgba(var(--acs-mat-icon-rgb), var(--tw-text-opacity))",
    },
    ".text-low-pure": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--acs-text-low-pure-rgb), var(--tw-text-opacity)) !important",
    },
    ".text-low-light": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--acs-text-low-light-rgb), var(--tw-text-opacity)) !important",
    },
    ".text-low-medium": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--acs-text-low-medium-rgb), var(--tw-text-opacity)) !important",
    },
    ".text-primary-transition": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--text-primary-transition), var(--tw-text-opacity)) !important"
    },
    ".text-primary-musk": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--text-primary-musk), var(--tw-text-opacity)) !important"
    },
    ".text-primary-lighter": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--text-primary-lighter), var(--tw-text-opacity)) !important"
    },
    ".chart-light-red": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--chart-light-red), var(--tw-text-opacity)) !important"
    },
    ".chart-dark-red": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--chart-dark-red), var(--tw-text-opacity)) !important"
    },
    ".chart-orange": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--chart-orange), var(--tw-text-opacity)) !important"
    },
    ".text-primary-low": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--text-primary-low), var(--tw-text-opacity)) !important"
    },
    ".text-primary-high": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--text-primary-high), var(--tw-text-opacity)) !important"
    },
    ".chart-label-text": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--chart-label-text), var(--tw-text-opacity)) !important"
    },
    ".chart-axis-text": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--chart-axis-text), var(--tw-text-opacity)) !important"
    },
    ".text-primary-middle": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--text-primary-middle), var(--tw-text-opacity)) !important"
    },
    ".text-low-dark": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--acs-text-low-dark-rgb), var(--tw-text-opacity)) !important",
    },
    ".text-high-pure": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--acs-text-high-pure-rgb), var(--tw-text-opacity)) !important",
    },
    ".text-high-light": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--acs-text-high-light-rgb), var(--tw-text-opacity)) !important",
    },
    ".text-high-medium": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--acs-text-high-medium-rgb), var(--tw-text-opacity)) !important",
    },
    ".text-high-dark": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--acs-text-high-dark-rgb), var(--tw-text-opacity)) !important",
    },
    ".text-primary-pure": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--acs-text-primary-pure-rgb), var(--tw-text-opacity)) !important",
    },
    ".text-primary-light": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--acs-text-primary-light-rgb), var(--tw-text-opacity)) !important",
    },
    ".text-primary-medium": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--acs-text-primary-medium-rgb), var(--tw-text-opacity)) !important",
    },
    ".text-primary-dark": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--acs-text-primary-dark-rgb), var(--tw-text-opacity)) !important",
    },
    ".border-color": {
      "--tw-text-opacity": "1 !important",
      borderColor:
        "rgba(var(--acs-border-rgb), var(--tw-text-opacity)) !important",
    },
    ".text-hint": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--acs-text-hint-rgb), var(--tw-text-opacity)) !important",
    },
    ".input-border": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--acs-input-border-rgb), var(--tw-text-opacity)) !important",
    },
    ".text-disabled": {
      "--tw-text-opacity": "1 !important",
      color:
        "rgba(var(--acs-text-disabled-rgb), var(--tw-text-opacity)) !important",
    },
    ".bg-app-bar": {
      "--tw-bg-opacity": "1 !important",
      backgroundColor:
        "rgba(var(--acs-bg-app-bar-rgb), var(--tw-bg-opacity)) !important",
    },
    ".bg-card": {
      "--tw-bg-opacity": "1 !important",
      backgroundColor:
        "rgba(var(--acs-bg-card-rgb), var(--tw-bg-opacity)) !important",
    },
    ".bg-default": {
      "--tw-bg-opacity": "1 !important",
      backgroundColor:
        "rgba(var(--acs-bg-default-rgb), var(--tw-bg-opacity)) !important",
    },
    ".bg-dialog": {
      "--tw-bg-opacity": "1 !important",
      backgroundColor:
        "rgba(var(--acs-bg-dialog-rgb), var(--tw-bg-opacity)) !important",
    },
    ".bg-hover": {
      "--tw-bg-opacity": "1 !important",
      backgroundColor:
        "rgba(var(--acs-bg-hover-rgb), var(--tw-bg-opacity)) !important",
    },
    ".bg-active": {
      "--tw-bg-opacity": "1 !important",
      backgroundColor:
        "rgba(var(--acs-bg-active-rgb), var(--tw-bg-opacity)) !important",
    },
    ".ring-bg-default": {
      "--tw-ring-opacity": "1 !important",
      "--tw-ring-color":
        "rgba(var(--acs-bg-default-rgb), var(--tw-ring-opacity)) !important",
    },
    ".ring-bg-card": {
      "--tw-ring-opacity": "1 !important",
      "--tw-ring-color":
        "rgba(var(--acs-bg-card-rgb), var(--tw-ring-opacity)) !important",
    },
    ".divider": {
      color: "var(--acs-divider) !important",
    },
  });

  addComponents({
    ".bg-hover": {
      backgroundColor: "var(--acs-bg-hover) !important",
    },
  });
});
