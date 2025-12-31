"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { IconPlus, IconMinus } from "@tabler/icons-react";

export function Counter() {
  const count = useQuery(api.counter.get);
  const increment = useMutation(api.counter.increment);
  const decrement = useMutation(api.counter.decrement);

  return (
    <Card className="flex flex-col items-center">
      <CardContent className="flex flex-col items-center gap-4">
        <p className="font-caption text-foreground-secondary">
          Convex Counter Example
        </p>
        {count === undefined ? (
          <Skeleton className="h-10 w-12" />
        ) : (
          <div className="text-4xl font-bold text-foreground">{count}</div>
        )}
        <div className="flex items-center gap-3">
          <Button
            variant="brandOutline"
            size="icon"
            onClick={() => decrement()}
            aria-label="Decrement"
            disabled={count === undefined}
          >
            <IconMinus className="h-4 w-4" />
          </Button>
          <Button
            variant="brandAccent"
            size="icon"
            onClick={() => increment()}
            aria-label="Increment"
            disabled={count === undefined}
          >
            <IconPlus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
