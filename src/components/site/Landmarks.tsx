import { cn } from "@/lib/utils";

function Frame({
  label,
  className,
  children,
  viewBox = "0 0 160 260",
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
  viewBox?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      aria-hidden="true"
      focusable="false"
      className={cn("text-leaf-800", className)}
    >
      <title>{label}</title>
      {children}
    </svg>
  );
}

export function StabroekTower({ className }: { className?: string }) {
  return (
    <Frame label="Stabroek Market" className={className}>
      <path
        fill="currentColor"
        d="M48 250V92h64v158h-18V118H66v132H48Zm-10-166h84l-8-18H46l-8 18Zm8-22h68L80 28 46 62Zm28-42h12v16h-12V20Zm-8 18h28v6H66v-6Z"
      />
      <rect x="70" y="78" width="20" height="16" rx="10" fill="white" opacity="0.55" />
    </Frame>
  );
}

export function CathedralSpire({ className }: { className?: string }) {
  return (
    <Frame label="St. George's Cathedral" className={className}>
      <path
        fill="currentColor"
        d="M28 250V168h104v82H28Zm22-90h60v82H50v-82Zm8-18h44v14H58v-14Zm6-16h32L80 36 64 126Zm12-98h8v22h-8V28Zm-10 18h28v5H66v-5Z"
      />
    </Frame>
  );
}

export function ParliamentDome({ className }: { className?: string }) {
  return (
    <Frame label="Parliament Building" className={className} viewBox="0 0 200 180">
      <path
        fill="currentColor"
        d="M18 170V112h164v58H18Zm8-66h148v10H26v-10Zm22-8a52 36 0 0 1 104 0H48Zm46-46h12v28H94V50Zm2-14a8 8 0 1 1 8 0v6h-8v-6Z"
      />
    </Frame>
  );
}

export function CityHall({ className }: { className?: string }) {
  return (
    <Frame label="Georgetown City Hall" className={className} viewBox="0 0 180 220">
      <path
        fill="currentColor"
        d="M18 210V78l18-28V40l10-18 10 18v10l18 28v132H18Zm128 0V78l18-28V40l10-18 10 18v10l-18 28v132h-20ZM46 210V96l44-52 44 52v114H46Z"
      />
    </Frame>
  );
}

export function UmanaYana({ className }: { className?: string }) {
  return (
    <Frame label="Umana Yana" className={className} viewBox="0 0 180 200">
      <path
        fill="currentColor"
        d="M90 18l8 22c28 8 62 48 70 120H12C20 88 54 48 82 40l8-22h0Zm-46 142h8v28h-8v-28Zm28 0h8v28h-8v-28Zm28 0h8v28h-8v-28Zm28 0h8v28h-8v-28Z"
      />
    </Frame>
  );
}

export function IndependenceArch({ className }: { className?: string }) {
  return (
    <Frame label="Independence Arch" className={className} viewBox="0 0 180 160">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M16 150V78c24-48 124-48 148 0v72h-22V86c-18-28-86-28-104 0v64H16Zm22-78h104c-14-22-90-22-104 0Z"
      />
    </Frame>
  );
}
