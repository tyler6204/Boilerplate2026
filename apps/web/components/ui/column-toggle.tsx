import { Button } from "./button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu"
import { IconAdjustmentsHorizontal } from "@tabler/icons-react"

interface Column {
  id: string
  label: string
}

interface ColumnToggleProps {
  columns: Column[]
  columnVisibility: { [key: string]: boolean }
  onColumnVisibilityChange: (next: { [key: string]: boolean }) => void
  className?: string
}

export default function ColumnToggle({ columns, columnVisibility, onColumnVisibilityChange, className }: ColumnToggleProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" aria-label="Columns" className={className}>
          <IconAdjustmentsHorizontal className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56 max-h-[300px] overflow-y-auto">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((col) => {
          const checked = columnVisibility[col.id] ?? true
          return (
            <DropdownMenuCheckboxItem
              key={col.id}
              checked={checked}
              stayOpen
              onCheckedChange={(c) => onColumnVisibilityChange({ ...columnVisibility, [col.id]: Boolean(c) })}
            >
              {col.label}
            </DropdownMenuCheckboxItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
