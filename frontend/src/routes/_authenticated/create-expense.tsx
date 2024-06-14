import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { cn } from "@/lib/utils"
import { useForm } from "@tanstack/react-form"
import { api } from "@/lib/api";
import { expenseSchema } from "@server/types/sharedType";
import { Calendar } from "@/components/ui/calendar";

export const Route = createFileRoute('/_authenticated/create-expense')({
  component: CreateExpense,
})


function CreateExpense() {
  const naviage = useNavigate();
  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      title: "",
      description: "",
      amount: "",
      date: new Date().toISOString(),
    },
    onSubmit: async ({ value }) => {
      const res = await api.expenses.$post({ json: value })
      if (!res) {
        throw new Error('Failed to create expense')
      }
      naviage({ to: '/expenses' })
    }
  })
  return (
    <Card className="sm:w-[500px] p-2 mx-4 my-6 sm:m-auto sm:mt-12">
      <CardHeader>
        <CardTitle className="text-center">Create Expense</CardTitle>
        <CardDescription className="text-center">Add you new Expenses.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <form.Field
                name="title"
                validators={{onChange: expenseSchema.shape.title}}
                children={(field) => (
                  <>
                    <Label htmlFor={field.name}>Title</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder="Title of the expense"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.touchedErrors ?
                      <em>
                        {field.state.meta.touchedErrors}
                      </em>
                      : null}
                  </>
                )}
              >

              </form.Field>
            </div>
            <div className="flex flex-col space-y-1.5">
              <form.Field
                name="description"
                validators={{onChange: expenseSchema.shape.description}}
                children={(field) => (
                  <>
                    <Label htmlFor={field.name}>Description</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder="Description of the expense"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.touchedErrors ?
                      <em>
                        {field.state.meta.touchedErrors}
                      </em>
                      : null}
                  </>
                )}
              >

              </form.Field>
            </div>
            <div className="flex flex-col space-y-1.5">
              <form.Field
                name="amount"
                validators={{onChange: expenseSchema.shape.amount}}
                children={(field) => (
                  <>
                    <Label htmlFor={field.name}>Amount</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      placeholder="Amount of the expense"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.touchedErrors ?
                      <em>
                        {field.state.meta.touchedErrors}
                      </em>
                      : null}
                  </>
                )}
              >
              </form.Field>
            </div>
            <div className="flex flex-col space-y-1.5">
              <form.Field
                name="date"
                validators={{onChange: expenseSchema.shape.date}}
                children={(field) => (
                  <>
                    <Label htmlFor={field.name}>Date</Label>
                    <Calendar
                      mode="single"
                      selected={new Date(field.state.value)}
                      onSelect={(date) => field.handleChange((date ?? new Date()).toISOString())}
                      className="rounded-md border shadow m-auto my-2"
                    />
                    {field.state.meta.touchedErrors ?
                      <em>
                        {field.state.meta.touchedErrors}
                      </em>
                      : null}
                  </>
                )}
              >
              </form.Field>
            </div>
          </div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit || isSubmitting}
                className={cn("w-full mt-4", !canSubmit && "cursor-not-allowed")}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            )}
          ></form.Subscribe>
        </form>
      </CardContent>
    </Card>
  )
}