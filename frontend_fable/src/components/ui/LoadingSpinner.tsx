export default function LoadingSpinner({ label = 'Načítavam…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16" role="status">
      <span className="w-10 h-10 rounded-full border-4 border-primary-light border-t-primary animate-spin motion-reduce:animate-none" />
      <span className="text-muted text-sm">{label}</span>
    </div>
  )
}
