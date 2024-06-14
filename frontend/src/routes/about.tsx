import { Separator } from '@/components/ui/separator'
import { createFileRoute } from '@tanstack/react-router'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <>
      <div className='mx-12 my-12'>
        <div className="space-y-1">
          <h4 className="text-lg font-medium leading-none">Full stack Project</h4>
          <p className="text-md text-muted-foreground">
            The React, Bun & Hono - Drizzle, Kinde, Tanstack, Tailwind, TypeScript, RPC, & more....
          </p>
        </div>
        <Separator className="my-4" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>Blog</div>
          <Separator orientation="vertical" />
          <div>Docs</div>
          <Separator orientation="vertical" />
          <div>
            <a href="https://github.com/0PrashantYadav0/Expense-Tracking-App" target="_blank">Source</a>
          </div>
        </div>
      </div>
      <div className='mx-12'>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}
