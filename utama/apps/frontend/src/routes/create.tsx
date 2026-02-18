import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeftCircleIcon } from 'lucide-react'

export const Route = createFileRoute('/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen max-w-full flex items-center justify-center">
      <Card className="w-200">
        <CardHeader>
          <CardTitle>Tambah Guru Baru</CardTitle>
          <CardAction>
            <Button variant="outline" className="mr-2" size="sm" asChild>
              <Link to="/">
                <ArrowLeftCircleIcon />
                Kembali
              </Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <FieldSet>
              <Field>
                <FieldLabel htmlFor='nis'>NIS</FieldLabel>
                <Input type='number' id="nis" name='nis' placeholder='Masukan nis ..' />
              </Field>
              <Field>
                <FieldLabel htmlFor='nama'>Nama</FieldLabel>
                <Input type='text' id="nama" name='nama' placeholder='Masukan nama ..' />
              </Field>
            </FieldSet>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  )
}
