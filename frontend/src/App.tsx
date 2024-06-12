import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react";

function App() {
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    function fetchTotalSpend() {
      try {
        fetch("/api/expenses/total-spend")
        .then(res => res.json())
        .then(data => {
          setTotalSpend(data.totalSpend)
          console.log(data)
        })
      } catch (error) {
        setTotalSpend(0);
        console.error(error)
      }
    }
    fetchTotalSpend()
  } , [])

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spend</CardTitle>
        <CardDescription>Total amount you spend daily</CardDescription>
      </CardHeader>
      <CardContent>
        {totalSpend}
      </CardContent>
    </Card>
  )
}

export default App;
