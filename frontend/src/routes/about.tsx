import { Separator } from '@/components/ui/separator'
import { createFileRoute } from '@tanstack/react-router'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  const techStackBenefits = [
    {
      name: "React",
      use: "React is a popular JavaScript library for building user interfaces, known for its component-based architecture and efficient rendering with the Virtual DOM."
    },
    {
      name: "React",
      use: "React's reusable components allow for more maintainable and scalable code, making it easier to manage complex UIs."
    },
    {
      name: "Bun",
      use: "Bun is an all-in-one JavaScript runtime that is fast and efficient, with built-in support for TypeScript, JSX, and ESM."
    },
    {
      name: "Bun",
      use: "Bun significantly improves the performance of JavaScript applications by optimizing the execution of scripts and packages."
    },
    {
      name: "Hono",
      use: "Hono is a small, fast, and highly flexible web framework for building web applications and APIs in JavaScript."
    },
    {
      name: "Hono",
      use: "Hono's lightweight architecture makes it ideal for building high-performance applications with minimal overhead."
    },
    {
      name: "Drizzle",
      use: "Drizzle is a state management library specifically designed for Ethereum and blockchain applications, making it easier to manage and synchronize application state with smart contracts."
    },
    {
      name: "Drizzle",
      use: "It provides a reactive data layer, simplifying the development of decentralized applications (dApps)."
    },
    {
      name: "Kinde",
      use: "Kinde is an authentication and user management platform that simplifies the integration of secure authentication and authorization into web applications."
    },
    {
      name: "Kinde",
      use: "It provides robust user management features, including role-based access control, user analytics, and social login integrations."
    },
    {
      name: "Tanstack",
      use: "Tanstack includes powerful libraries like React Query for data fetching, caching, synchronization, and more, improving the way data is managed in React applications."
    },
    {
      name: "Tanstack",
      use: "It offers high-performance utilities for state and side-effect management, enhancing the development experience and application performance."
    },
    {
      name: "Tailwind",
      use: "Tailwind CSS is a utility-first CSS framework that allows for rapid UI development with its highly composable classes."
    },
    {
      name: "Tailwind",
      use: "It encourages a consistent design system and makes it easy to maintain and scale styles across large projects."
    },
    {
      name: "TypeScript",
      use: "TypeScript is a strongly-typed superset of JavaScript that adds static typing, which helps catch errors early in the development process."
    },
    {
      name: "TypeScript",
      use: "It improves code quality and maintainability by providing robust type-checking and advanced IDE support."
    },
    {
      name: "RPC (Remote Procedure Call)",
      use: "RPC allows for efficient communication between different parts of an application or different systems, enabling function calls to be executed remotely."
    },
    {
      name: "RPC (Remote Procedure Call)",
      use: "It simplifies the development of distributed systems by abstracting the details of network communication."
    }
  ];

  return (
    <>
      <h1 className='font-bold text-4xl my-6 text-center'>Tech Used</h1>
      <div className='m-auto flex justify-center items-center mt-8'>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-sm"
        >
          <CarouselContent>
            {techStackBenefits.map((data, index) => (
              <CarouselItem key={index} className="">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center px-6">
                      <div>
                        <p className="text-3xl font-semibold">{data.name}</p>
                        <p>{data.use}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className='mx-12 my-12'>
        <div className="space-y-1">
          <h4 className="text-lg font-medium leading-none">Full stack Project</h4>
          <p className="text-md text-muted-foreground">
            The React, Bun & Hono - Drizzle, Kinde, Tanstack, Tailwind, TypeScript, RPC, & more....
          </p>
        </div>
        <Separator className="my-4" />
        <div className="flex h-5 items-center space-x-4 text-sm">
          <div>
            <a href="https://hono.dev" target="_blank">Hono</a>
          </div>
          <Separator orientation="vertical" />
          <div>
            <a href="https://hono.dev/guides" target="_blank">Docs</a>
          </div>
          <Separator orientation="vertical" />
          <div>
            <a href="https://github.com/0PrashantYadav0/Expense-Tracking-App" target="_blank">Source</a>
          </div>
        </div>
      </div>
      <div className='mx-12 mb-24'>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How does Bun improve the performance of the application?</AccordionTrigger>
            <AccordionContent>
              Bun is an all-in-one JavaScript runtime that optimizes the execution of scripts and packages, resulting in faster load times and better performance. It includes a built-in bundler, transpiler, and package manager, which streamline the development workflow.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What role does Hono play in the project?</AccordionTrigger>
            <AccordionContent>
              Hono is a lightweight and flexible web framework used for building the project's backend APIs. It provides a minimalistic approach with low overhead, making it ideal for creating high-performance web applications and APIs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What about database ?</AccordionTrigger>
            <AccordionContent>
              I use Relational database for this project. I use Neon postgresql database along side with Drizzle ORM.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>I have more question ??</AccordionTrigger>
            <AccordionContent>
              Contact on github link is about in soucre.
            </AccordionContent>
          </AccordionItem>
          
        </Accordion>
      </div>
    </>
  )
}
