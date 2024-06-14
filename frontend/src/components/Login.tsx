import { BellIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export function Login() {
  return (
    <div className="flex justify-center items-center sm:m-12 m-auto">
      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle className="text-center">Welcome</CardTitle>
          <CardDescription  className="text-center">This App will provide you a place to save your expenses</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <BellIcon />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Connect With Us
              </p>
              <p className="text-sm text-muted-foreground">
                Start your journey with us.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <a href="/api/register">Register</a>
          </Button>
        </CardFooter>
        <CardFooter>
          <Button className="w-full">
            <a href="/api/login">Login</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
