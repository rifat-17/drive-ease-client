
type DashboardPageHeaderProps = {
  title: string;
  description: string;
};

export function DashboardPageHeader({
  title,
  description,
}: DashboardPageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
