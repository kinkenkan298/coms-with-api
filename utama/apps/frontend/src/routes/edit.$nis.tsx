import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/edit/$nis')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/edit/$nis"!</div>
}
